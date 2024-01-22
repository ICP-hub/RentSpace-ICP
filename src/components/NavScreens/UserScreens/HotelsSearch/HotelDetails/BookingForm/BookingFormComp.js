import { StyleSheet, Text, View,TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import Header from './Header/Header'
import TripDetails from './TripDetails/TripDetails'
import ChoosePayment from './ChoosePayment/ChoosePayment'
import PriceDetails from './PriceDetails/PriceDetails'
import PaymentMethods from './PaymentMethods/PaymentMethods'
import RequiredPhone from './RequiredPhone/RequiredPhone'

const BookingFormComp = ({setBookingForm}) => {
  const [fullPayment,setFullPayment]=useState(true)
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
        <ChoosePayment fullPayment={fullPayment} setFullPayment={setFullPayment}/>
        <View style={styles.line}/>
        <PriceDetails/>
        <View style={styles.line}/>
        <PaymentMethods/>
        <View style={styles.line}/>
        <RequiredPhone/>
        <View style={styles.line}/>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Confirm and pay</Text>
        </TouchableOpacity>
      </ScrollView>
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
  }
})