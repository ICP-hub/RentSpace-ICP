import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { COLORS, SIZES } from '../../../../../constants/themes'
import Header from '../HotelDetails/BookingForm/Header/Header'
import GuestDetails from './bookingParts/GuestDetails'
import CardDetails from './bookingParts/CardDetails'
import AdditionalGuests  from './bookingParts/AdditionalGuests'

const customHotelData={
    hotelname:"Charm Ville - Villa with Nature! FarmVilla n Hosur",
    hotelAddress:"Ubdu, Bai, Indonesia"
}

const RateHawkBookingPage = ({showSelf}) => {
  return (
    <View style={styles.page}>
        <View style={styles.backIconCont}>
            <TouchableOpacity onPress={()=>{showSelf(false)}}>
                <Icon color={COLORS.black} name='chevron-left' size={25}/>
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollPart}>
            <Header
                hotelname={customHotelData.hotelname}
                hotelAddress={customHotelData.hotelAddress}
            />
            <View style={styles.line}/>
            <View style={styles.sec}>
                <Text style={styles.priceTitle}>PriceDetails</Text>
                <View style={styles.textCont}>
                    <Text style={styles.priceHeading}>Total(USD)</Text>
                    <Text style={styles.priceHeading}>${30}</Text>
                </View>
            </View>
            <View style={styles.line}/>
            <GuestDetails/>
            <View style={styles.line}/>
            <AdditionalGuests/>
            <View style={styles.line}/>
            <CardDetails/>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Confirm and Pay</Text>
            </TouchableOpacity>
        </ScrollView>
    </View>
  )
}

export default RateHawkBookingPage

const styles = StyleSheet.create({
    page:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:COLORS.mainGrey,
        height:Dimensions.get('window').height
    },
    backIconCont:{
        position:'absolute',
        width:'100%',
        backgroundColor:COLORS.mainGrey,
        zIndex:10,
        paddingLeft:10,
        paddingVertical:5,
    },
    line:{
        width:'100%',
        backgroundColor:COLORS.black,
        height:0.5,
        opacity:0.23,
        marginVertical:15
    },
    btn:{
        width:'82%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:COLORS.mainPurple,
        borderRadius:12,
        paddingVertical:15,
        alignItems:'center',
        marginTop:30
    },
    btnText:{
        color:'white',
        fontWeight:'bold',
        fontSize:SIZES.medium
    },
    scrollView:{
      width:'100%',
      backgroundColor:COLORS.mainGrey,
      
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
    sec:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'85%'
    },
    priceTitle:{
        color:COLORS.black,
        fontWeight:'800',
        fontSize:SIZES.preMedium,
        marginBottom:15
    },
    priceHeading:{
        color:COLORS.black,
        fontWeight:'800',
        fontSize:SIZES.preMedium,
    },
    textCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    }
})