import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../../../../../../constants/themes'

const BookingCard = ({item}) => {
  const [date,setDate]=useState("date")
  const getDate=()=>{
    try{
      const dateObject=new Date(item?.date)
      const day = dateObject.getDate().toString().padStart(2, '0');
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
      const year = dateObject.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;
      console.log(formattedDate)
      setDate(formattedDate)
      
    }catch(err){console.log(err)}
    
  }
  useEffect(()=>{
    getDate()
  },[])
  return (
    
    <View style={styles.card}>
      <Text style={styles.name}>{item?.hotel?.hotelTitle}</Text>
      <Text style={styles.normalText}>
         Check-In date : {date}
      </Text>
      <Text style={styles.normalText}>
        Price per night : ${Number(item?.hotel?.hotelPrice)}
      </Text>
      <Text style={styles.normalText}>
        Duration of stay : {Number(item?.bookingDuration)} days
      </Text>
      <Text style={styles.normalText}>
        Amount paid : ${Number(item?.hotel?.hotelPrice)*Number(item?.bookingDuration)}
      </Text>
    </View>
  )
}

export default BookingCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        borderColor:COLORS.hostTitle,
        borderWidth:1,
        width:'90%',
        marginLeft:'5%',
        paddingHorizontal:20,
        paddingVertical:12,
        borderRadius:12,
        marginBottom:20
    },
    name:{
      color:COLORS.black,
      fontSize:SIZES.preMedium,
      fontWeight:'500',
      marginBottom:6
    },
    normalText:{
      fontSize:SIZES.small,
      color:COLORS.textLightGrey,
      fontWeight:'300'
    }
})