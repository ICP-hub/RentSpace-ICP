import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import { useSelector } from 'react-redux'

const PaymentScreen = ({booking,item,self}) => {

    const [payment,setPayment]=useState(0)
    const {actors}=useSelector(state=>state.actorReducer)
    const getOwner=()=>{
        const userId=item?.id.split('#')[0]
        console.log(userId)
        setPayment(Number(booking.bookingDuration)*Number(item?.hotelPrice))
        console.log(Number(booking.bookingDuration)*Number(item?.hotelPrice))
    }
    useEffect(()=>{
        getOwner()
    },[])
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Your Current Balance : {100}</Text>
      <Text style={styles.title}>Hotel Name: {item?.hotelTitle}</Text>
      <TextInput 
        style={styles.inputs}
        value={"$"+payment.toString()}/>
        {/* // placeholder="Amount"
        // placeholderTextColor={COLORS.textLightGrey}
        // onChangeText={value=>setPayment(value.toString())}/> */}
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Confirm Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>self.current.dismiss()}>
            <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        height:'100%',
        paddingTop:20
      },
      title:{
        color:COLORS.black,
        fontWeight:'bold',
        fontSize:SIZES.medium,
        marginBottom:10,
      },
      inputs:{
        borderColor: COLORS.hostTitle,
        borderWidth: 1,
        borderRadius: 10,
        width: '80%',
        marginBottom: 40,
        height: 50,
        padding: 15,
        color: COLORS.textLightGrey,
        fontSize: SIZES.preMedium,
        marginTop:15
      },
      btn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.hostTitle,
        borderRadius:12,
        width:'80%',
        paddingVertical:15,
        marginBottom:12,
        
      },
      btnText:{
        color:'white',
        fontWeight:'bold',
        fontSize:SIZES.medium,
      }
})