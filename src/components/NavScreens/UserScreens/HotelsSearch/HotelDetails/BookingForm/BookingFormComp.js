import { StyleSheet, Text, View,TouchableOpacity, ScrollView, ActivityIndicator, Modal, Alert, Dimensions } from 'react-native'
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
import { createTokenActor, formatTokenMetaData } from './utils'
import {Principal} from "@dfinity/principal"
import PushNotification from 'react-native-push-notification'
import { TransakWebViewIntegration } from './transakTest'
import WebView from 'react-native-webview'
import { global_transak_key, transak_key,transak_secret_phrase } from '../../../../../../../transakConfig'
import { AccountIdentifier } from '@dfinity/ledger-icp'
import BalanceScreen from './BalanceScreen'
import CheckAnim from './CheckAnim'

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
const [fiatPaymentStart,setFiatPaymentStart]=useState(false)
const [balanceScreen,setBalanceScreen]=useState(false)
const [wallet,setWallet]=useState("")
const skipable=useRef(true)
  const [total,setTotal]=useState(
    ((item?.hotelPrice*booking.bookingDuration)*0.15)+((item?.hotelPrice*booking.bookingDuration)*0.10)+(item?.hotelPrice*booking.bookingDuration)
  )
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
    
    // alert("transaction successful!")
      let response = await tokenActor.icrc1_transfer(transaction);
      console.log(parseInt(response?.Ok))
      setBooking({...booking,paymentStatus:true,paymentId:parseInt(response?.Ok).toString()})
      const newObj={
        ...booking,
        paymentId:parseInt(response?.Ok).toString(),
        paymentStatus:true
      }
      console.log(newObj)

      function notifyBookingConfirm(){
        PushNotification.localNotification({
          title:"Booking Successful!",
          message:`${user?.firstName}, your booking for ${item?.hotelTitle} is successful!`,
          channelId:"1"
        })
      }
      
        book(newObj,notifyBookingConfirm)
        setBalanceScreen(false)
    }else{
      setLoading(false)
      alert(`Insufficient balance in ${metaData?.["icrc1:symbol"]} ${await getBalance()}`)
      setBalanceScreen(false)

    //   setBooking({...booking,paymentStatus:true,paymentId:'test'})
    //   const newObj={
    //     ...booking,
    //     paymentId:'test',
    //     paymentStatus:true
    //   }
    //   console.log(newObj)

    //   function notifyBookingConfirm(){
    //     PushNotification.localNotification({
    //       title:"Booking Successful!",
    //       message:`${user?.firstName}, your booking for ${item?.hotelTitle} is successful!`,
    //       channelId:"1"
    //     })
    //   }
      
    //     book(newObj,notifyBookingConfirm)
    //     setBalanceScreen(false)
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
  useEffect(()=>{
    // getBalance()
    getOwner()
    PushNotification.createChannel({
      channelId:'1',
      channelName:'booking'
    },()=>{console.log(("booking notification channel created!"))})
  },[])
  
  useEffect(()=>{
    if(paymentMethod=="ICP" || paymentMethod=="ckBTC" || paymentMethod=="ckEth"){
      console.log(paymentMethod)
      settingToken()
      setPaymentType('crypto')
    }
    else{
      alert("For this option, if you are a first time trensak user, you may need to complete your KYC!")
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
        <PaymentMethods method={paymentMethod} setMethod={setPaymentMethod}/>
        <View style={styles.line}/>
        <RequiredPhone/>
        <View style={styles.line}/>
        <TouchableOpacity style={styles.btn} onPress={()=>{
          if(paymentType=='fiat'){
            launchTransac()
          }else{
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
                  alert("Fiat transaction interrupted!")
                }
              },
              {
                text:'No',
                onPress:()=>console.log('Transaction continued!')
              }
            ])
          }else{
            console.log(skipable.current)
            alert("Cannot cancel transaction after order creation, Please do not close the screen unitl completion!")
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