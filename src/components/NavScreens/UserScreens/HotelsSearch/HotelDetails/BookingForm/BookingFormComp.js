import { StyleSheet, Text, View,TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState,useEffect } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import Header from './Header/Header'
import TripDetails from './TripDetails/TripDetails'
import ChoosePayment from './ChoosePayment/ChoosePayment'
import PriceDetails from './PriceDetails/PriceDetails'
import PaymentMethods from './PaymentMethods/PaymentMethods'
import RequiredPhone from './RequiredPhone/RequiredPhone'
import { useSelector } from 'react-redux'
import { createTokenActor, formatTokenMetaData } from './utils'
import {Principal} from "@dfinity/principal"
import PushNotification from 'react-native-push-notification'

const BookingFormComp = ({setBookingForm,setBooking,booking,loading,item,book,setLoading}) => {
  const {user}=useSelector(state=>state.userReducer)
  const [fullPayment,setFullPayment]=useState(true)
  const {actors}=useSelector(state=>state.actorReducer)
  const {principle}=useSelector(state=>state.principleReducer)
  const [userId,setUserId]=useState("sample")
const [metaData,setMetaData] = useState(null);
const [Balance,setBalance]=useState(0)
  const [total,setTotal]=useState(
    ((item?.hotelPrice*booking.bookingDuration)*0.15)+((item?.hotelPrice*booking.bookingDuration)*0.10)+(item?.hotelPrice*booking.bookingDuration)
  )
  const transfer=async (sendAmount,sendPrincipal) =>{
    setLoading(true)
    console.log("metaData[decimals]",metaData)
    let amnt=parseInt(Number(sendAmount) * Math.pow(10, parseInt(metaData?.["icrc1:decimals"])))
    
    console.log("amount",amnt)
    if(Balance>=amnt){
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
      let response = await actors?.tokenActor.icrc1_transfer(transaction);
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
        
    
    // self.current.dismiss()s
    }else{
      // setLoading(false)
      // alert("Insufficient balance")
      setBooking({...booking,paymentStatus:true,paymentId:'test'})
      const newObj={
        ...booking,
        // paymentId:parseInt(response?.Ok).toString(),
        paymentId:'test',
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
    }
    };
  async function settingToken(){
    console.log("token actor",actors?.tokenActor)
    await actors.tokenActor.icrc1_metadata().then((res)=>{
      console.log(res)
      
      setMetaData(formatTokenMetaData(res))
    }).catch((err)=>{console.log(err)})
    console.log("metadate:",metaData);
  }
  const getBalance=async()=>{
    let bal=await actors?.tokenActor.icrc1_balance_of({ owner: Principal.fromText(principle) , subaccount: [] })
    console.log("balance : ",parseInt(bal))
    setBalance(parseInt(bal))
    return parseInt(bal)
  }
  useEffect(()=>{
    getBalance()
    PushNotification.createChannel({
      channelId:'1',
      channelName:'booking'
    },()=>{console.log(("booking notification channel created!"))})
  },[])
  const getOwner=()=>{
    setUserId(item?.id.split('#')[0])
    console.log(userId)
    
  }
  useEffect(()=>{
      getOwner()
      settingToken()
  },[])
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
        <PaymentMethods/>
        <View style={styles.line}/>
        <RequiredPhone/>
        <View style={styles.line}/>
        <TouchableOpacity style={styles.btn} onPress={()=>{
          if(fullPayment){
            transfer(total/100000000,userId)
          }else{
            transfer(total/200000000,userId)
          }
        }}>
          <Text style={styles.btnText}>Confirm and pay</Text>
        </TouchableOpacity>
      </ScrollView>
      <ActivityIndicator animating={loading} size={40} style={styles.loader}/>
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
    }
})