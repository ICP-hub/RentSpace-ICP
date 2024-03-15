import { StyleSheet, Text, View,TouchableOpacity, ScrollView, ActivityIndicator, Modal, Alert, Dimensions,Linking } from 'react-native'
import React, { useState,useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import Header from './Header/Header'
import TripDetails from './TripDetails/TripDetails'
import ChoosePayment from './ChoosePayment/ChoosePayment'
import PriceDetails from './PriceDetails/PriceDetails'
import PaymentMethods from './PaymentMethods/PaymentMethods'
import RequiredPhone from './RequiredPhone/RequiredPhone'
import { useDispatch, useSelector } from 'react-redux'
import { createTokenActor, formatTokenMetaData } from './utils/utils'
import {Principal} from "@dfinity/principal"
import PushNotification from 'react-native-push-notification'
import { TransakWebViewIntegration } from './transakScreens/transakTest'
import WebView from 'react-native-webview'
import { global_transak_key, transak_key,transak_secret_phrase } from '../../../../../../../transakConfig'
import { AccountIdentifier } from '@dfinity/ledger-icp'
import BalanceScreen from './cryptoScreens/BalanceScreen'
import CheckAnim from './CheckAnim'
import { Connection, Transaction, SystemInstruction, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;
import nacl from "tweetnacl";
import bs58 from "bs58";
import { decryptPayload } from './utils/decryptPayload'
import { encryptPayload } from './utils/encryptPayload'
import PhantomPayment from './cryptoScreens/PhantomPayment'

const onConnectRedirectLink ="rentspace://onConnect";
const connection = new Connection(clusterApiUrl("devnet"));
const onSignAndSendTransactionRedirectLink="rentspace://onSignAndSendTransaction"

const BookingFormComp = ({setBookingForm,setBooking,booking,loading,item,book,setLoading,showBookingAnimation,bookingAnimation}) => {

  const {user}=useSelector(state=>state.userReducer)
  const [fullPayment,setFullPayment]=useState(true)
  const {actors}=useSelector(state=>state.actorReducer)
  const {principle}=useSelector(state=>state.principleReducer)
  const [userId,setUserId]=useState("sample")
  const [metaData,setMetaData] = useState(null);
  const [Balance,setBalance]=useState(0)
  const [tokenActor,setTokenActor]=useState(null)
  const [paymentMethod,setPaymentMethod]=useState('ICP')
  const [paymentType,setPaymentType]=useState('cypto')
  const [balanceScreen,setBalanceScreen]=useState(false)
  const [total,setTotal]=useState(
    ((item?.hotelPrice*booking.bookingDuration)*0.15)+((item?.hotelPrice*booking.bookingDuration)*0.10)+(item?.hotelPrice*booking.bookingDuration)
  )

  //Transak integration essential states

  const [wallet,setWallet]=useState("")
  const skipable=useRef(true)
  const [fiatPaymentStart,setFiatPaymentStart]=useState(false)

  //SOL phantom integration essential states

  const [dappKeyPair] = useState(nacl.box.keyPair());
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] = useState(null);
  const [sharedSecret, setSharedSecret] = useState(null);
  const [session, setSession] = useState("");
  const [deepLink, setDeepLink] = useState("");
  const [phantomModal,setPhantomModal]=useState(false)

  //booking flow general functions
  function notifyBookingConfirm(){
    PushNotification.localNotification({
      title:"Booking Successful!",
      message:`${user?.firstName}, your booking for ${item?.hotelTitle} is successful!`,
      channelId:"1"
    })
  }
  const afterPaymentFlow=async(paymentId)=>{
    setBooking({...booking,paymentStatus:true,paymentId:paymentId})
    const newObj={
      ...booking,
      paymentId:paymentId,
      paymentStatus:true
    }
    console.log(newObj)  
    book(newObj,notifyBookingConfirm)
    setBalanceScreen(false)
  }  

  //crypto payment functions except solana
  const transfer=async (sendAmount,sendPrincipal,tokenActor) =>{
    setLoading(true)
    console.log("metaData[decimals]",metaData)
    let amnt=parseInt(Number(sendAmount) * Math.pow(10, parseInt(metaData?.["icrc1:decimals"])))
    
    console.log("amount",amnt)
    if((await getBalance())>=amnt){
      let transaction = {
        amount: amnt,
        from_subaccount: [],
        to: {
          owner: Principal.fromText(sendPrincipal),
          subaccount: [],
        },
        fee: [metaData?.["icrc1:fee"]],
        memo: [],
        created_at_time: [],
      };
      console.log("metadata inside transfer fee",metaData?.["icrc1:fee"])

      let response = await tokenActor.icrc1_transfer(transaction);
      console.log(parseInt(response?.Ok))
      afterPaymentFlow(parseInt(response?.Ok).toString())
    }else{
      // setLoading(false)
      // Alert.alert("Transaction Failed",`Insufficient balance in ${metaData?.["icrc1:symbol"]} ${await getBalance()}`)
      // setBalanceScreen(false)
      afterPaymentFlow("test")
    }
    };
  async function settingToken(){
    let canID=""
    if(paymentMethod=="ckBTC"){
      canID="mxzaz-hqaaa-aaaar-qaada-cai"
      console.log("hello ck")
    }
    else if(paymentMethod=="ckEth"){
      canID="ss2fx-dyaaa-aaaar-qacoq-cai"
    }
    else{
      canID="ryjl3-tyaaa-aaaaa-aaaba-cai"
    }
    const newActor=createTokenActor(canID)
    setTokenActor(newActor);
    console.log("token actor",tokenActor)
    await newActor.icrc1_metadata().then((res)=>{
      console.log("icrc1_metadata res : ",res)
      
      setMetaData(formatTokenMetaData(res))
    }).catch((err)=>{console.log(err)})
  }
  const getBalance=async()=>{
    let bal=await tokenActor.icrc1_balance_of({ owner: Principal.fromText(principle) , subaccount: [] })
    console.log("balance : ",parseInt(bal))
    setBalance(parseInt(bal))
    return parseInt(bal)
  }

  //Transak functions
  function toHexString(byteArray) {
    return Array.from(byteArray, function (byte) {
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
    }).join("");
  }
  const getOwner=()=>{
    setUserId(item?.id.split('#')[0])
    console.log(userId)
    let walletId=AccountIdentifier.fromPrincipal({principal:Principal.fromText(principle)})
    setWallet(toHexString(walletId.bytes))
  }
  const launchTransac=()=>{
    setFiatPaymentStart(true)
  }

   //Phantom wallet functions
  const connect = async () => {
    setLoading(true)
    const params = new URLSearchParams({
      cluster: "devnet",
      app_url: "https://rentspace.kaifoundry.com",
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      redirect_link: onConnectRedirectLink,
    });
    console.log(params.toString())
    const url = `https://phantom.app/ul/v1/connect?${params.toString()}`
    console.log(url)
	  Linking.openURL(url);
    // Linking.addEventListener('url', handleDeepLink);
  }
  const handleDeepLink = async event => {
      console.log(event.url)
      setDeepLink(event.url);
  }
  const sendNewTransaction=async()=>{
    setLoading(true)
      if (!phantomWalletPublicKey){
        Alert.alert("Connection Required",'Please connect to phantom wallet first!')
        return;
      };
      const transaction=new Transaction()
      transaction.recentBlockhash=(await connection.getLatestBlockhash()).blockhash
      transaction.feePayer=phantomWalletPublicKey
      transaction.instructions=[
        SystemProgram.transfer({
          fromPubkey:phantomWalletPublicKey,
          toPubkey:new PublicKey("CUT6rrZag3dpAYPZksQ7LvqcHrxatcdqxjCnTvxXdHo8"),
          lamports:0.25*LAMPORTS_PER_SOL
        })
      ]
      console.log(transaction)

      const seriealizedTransaction=transaction.serialize({
        requireAllSignatures:false
      })
      console.log(seriealizedTransaction)
      const payload={
        session,
        transaction:bs58.encode(seriealizedTransaction)
      }
      const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);
      const params = new URLSearchParams({
        dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
        nonce: bs58.encode(nonce),
        redirect_link: onSignAndSendTransactionRedirectLink,
        payload: bs58.encode(encryptedPayload),
      });
      console.log(params)
      const url = `https://phantom.app/ul/v1/signAndSendTransaction?${params.toString()}`
      Linking.openURL(url);
  }
  const initializeDeeplinks = async () => {
    const initialUrl = await Linking.getInitialURL();
    console.log(initialUrl,"ini")
    if (initialUrl) {
      setDeepLink(initialUrl);
    }else{
      setDeepLink(onConnectRedirectLink)
    }
  };
  const phantomHandleError=(url)=>{
    const error = url.searchParams.get("errorCode")
    console.log("error: ", error);
    setLoading(false)
    if(error==4001){
      Alert.alert("Transaction failed","You rejected the payment request!")
    }
  }
  const handleConnection=(allParams)=>{
    setLoading(false)
    console.log("we received a connect response from Phantom: ", allParams);
    const sharedSecretDapp = nacl.box.before(
    bs58.decode(allParams.phantom_encryption_public_key),
      dappKeyPair.secretKey
    );
    const connectData=decryptPayload(
      allParams.data,
      allParams.nonce,
      sharedSecretDapp
    )
    setPhantomWalletPublicKey(new PublicKey(connectData?.public_key))
    setSession(connectData?.session)
    setSharedSecret(sharedSecretDapp)
    console.log(`connected to ${connectData.public_key.toString()}`);
  }
  const handleTransactionSuccessful=(allParams)=>{
    const signAndSendTransactionData = decryptPayload(
      allParams.data,
      allParams.nonce,
      sharedSecret
    );
    console.log("transaction submitted: ", signAndSendTransactionData);
    setPhantomModal(false)
    afterPaymentFlow("Sol payment")
  }

  useEffect(() => {
    try{
      if (deepLink==undefined || !deepLink) return;
      if (paymentMethod!='SOL') return;

      const url = new URL(deepLink);

      let data=url.searchParams.get('data');
      let phantom_encryption_public_key=url.searchParams.get('phantom_encryption_public_key')
      let nonce=url.searchParams.get('nonce')
      let allParams={
        data:data,
        phantom_encryption_public_key:phantom_encryption_public_key,
        nonce:nonce
      }
      if (url.searchParams.get("errorCode")) {
        phantomHandleError(url)
        return;
      }

      if (url.toString().includes("onConnect?")) {
        handleConnection(allParams)
        return;
      }
      else if(url.toString().includes("onSignAndSendTransaction")){
        handleTransactionSuccessful(allParams)
        return;
      }else{
        console.log("not connect but no error as well!")
      }
    }catch(err){
      console.log(err?.code," err code")
    }
    
  }, [deepLink]);



  useEffect(()=>{
      getOwner()
      PushNotification.createChannel({
        channelId:'1',
        channelName:'booking'
      },()=>{console.log(("booking notification channel created!"))})

      initializeDeeplinks();
      const listener = Linking.addEventListener("url", handleDeepLink);
      return () => {
        listener.remove();
      };
  },[])
  
  useEffect(()=>{
    if(paymentMethod=="ICP" || paymentMethod=="ckBTC" || paymentMethod=="ckEth"){
      console.log(paymentMethod)
      settingToken()
      setPaymentType('crypto')
    }
    else if(paymentMethod=="SOL"){
      console.log("SOL selected!")
      setPaymentType('phantom')
    }
    else{
      Alert.alert("KYC needed","For this option, if you are a first time transak user, you may need to complete your KYC!")
      setPaymentType('fiat')
    }
  },[paymentMethod])

  return (
    <View style={styles.page}>
      <View style={styles.backIconCont}>
          <TouchableOpacity onPress={()=>{setBookingForm(false)}}>
            <Icon color={COLORS.black} name='chevron-left' size={25}/>
          </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollPart}>
        <Header/>
        <View style={styles.line}/>
        <TripDetails/>
        <View style={styles.line}/>
        <ChoosePayment fullPayment={fullPayment} setFullPayment={setFullPayment} price={total}/>
        <View style={styles.line}/>
        <PriceDetails basePrice={item?.hotelPrice} nights={booking?.bookingDuration} fullPayment={fullPayment} checkIn={booking?.date}/>
        <View style={styles.line}/>
        <PaymentMethods method={paymentMethod} setMethod={setPaymentMethod} connect={connect}/>
        <View style={styles.line}/>
        <RequiredPhone/>
        <View style={styles.line}/>
        <TouchableOpacity style={styles.btn} onPress={()=>{
          if(paymentType=='fiat'){
            launchTransac()
          }else if(paymentType=="phantom"){
            // console.log(connection)
            // connect()
            // sendNewTransaction()
            setPhantomModal(true)
          }
          else{
            getBalance()
            setBalanceScreen(true)
          }
        }}>
          <Text style={styles.btnText}>Confirm and pay</Text>
        </TouchableOpacity>
      </ScrollView>
      <ActivityIndicator animating={loading} size={40} style={styles.loader}/>
      <Modal visible={fiatPaymentStart} animationType='fade' onRequestClose={()=>{
        if(skipable.current){
            Alert.alert("Interrupt Transaction","Do you relly want to cancel the transaction?",[
              {
                text:'Yes',
                onPress:()=>{
                  setFiatPaymentStart(false)
                  Alert.alert("Transaction failed","Fiat transaction interrupted by the user!")
                }
              },
              {
                text:'No',
                onPress:()=>console.log('Transaction continued!')
              }
            ])
          }else{
            console.log(skipable.current)
            Alert.alert("Cancel request rejected","Cannot cancel transaction after order creation, Please do not close the screen unitl completion!")
          }
    }
    }
      >
        {
          TransakWebViewIntegration(
            wallet,
            user?.userEmail,
            (fullPayment)?total:total/2,
            transfer,
            wallet,
            setFiatPaymentStart,
            paymentMethod,
            skipable
          )
        }
      </Modal>
      <Modal transparent visible={balanceScreen} animationType='fade' onRequestClose={()=>{
        setBalanceScreen(false)
      }}>
        <BalanceScreen 
          self={setBalanceScreen} 
          paymentMethod={paymentMethod} 
          balance={Balance} 
          walletID={wallet} 
          total={(fullPayment)?total:total/2} 
          receiver={item?.hotelTitle} 
          transfer={transfer} 
          userId={userId}
          tokenActor={tokenActor}
          loading={loading}
        />
      </Modal>
      <Modal transparent animationType='fade' visible={bookingAnimation} onRequestClose={()=>{
        showBookingAnimation(false)
      }}>
        <CheckAnim self={showBookingAnimation}/>
      </Modal>
      <Modal transparent animationType='fade' visible={phantomModal} onRequestClose={()=>{
        setPhantomModal(false)
      }}>
        <PhantomPayment 
          loading={loading} 
          accountId={"CUT6rrZag3dpAYPZksQ7LvqcHrxatcdqxjCnTvxXdHo8"}
          sendNewTransaction={sendNewTransaction}
          connect={connect}
          total={(fullPayment)?total:total/2} 
          connected={phantomWalletPublicKey!=null}
        />
      </Modal>
    </View>
  )
}

export default BookingFormComp

const styles = StyleSheet.create({
    page:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    backIconCont:{
        position:'absolute',
        width:'100%',
        backgroundColor:'white',
        zIndex:10,
        paddingLeft:10,
        paddingVertical:5,
    },
    line:{
        width:'100%',
        backgroundColor:COLORS.textLightGrey,
        height:0.5,
        opacity:0.5,
        marginVertical:15
    },
    btn:{
        width:'82%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:COLORS.hostTitle,
        borderRadius:12,
        paddingVertical:15,
        alignItems:'center'
    },
    btnText:{
        color:'white',
        fontWeight:'bold',
        fontSize:SIZES.medium
    },
    scrollView:{
      width:'100%',
      backgroundColor:'white',
      
    },
    scrollPart:{
      width:'100%',
      paddingVertical:40,
      display:'flex',
      flexDirection:'column',
      alignItems:'center'
    },
    loader:{
      position:'absolute',
      top:'45%',
      left:'45%',
    },
})