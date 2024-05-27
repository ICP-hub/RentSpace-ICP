import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../../../../../constants/themes'
import { useSelector } from 'react-redux'

const GuestDetails = () => {
  const {user}=useSelector(state=>state.userReducer)
  const [guestDetails,setGuestDetails]=useState({
      phone:null,
      email:user.userEmail,
      firstName:user.firstName,
      lastName:user.lastName
  })

  const [add,setAdd]=useState(false)

  return (
    <View style={styles.sec}> 
      <Text style={styles.heading1}>Required for your trip</Text>
      <View style={styles.cont}>
        <View style={styles.textCont}>
          <Text style={styles.heading}>First name</Text>
            <TextInput
              value={guestDetails.firstName}
              onChangeText={value=>setGuestDetails({...guestDetails,firstName:value})}
              style={styles.phoneCont}
              placeholderTextColor={COLORS.black}
              placeholder='Enter your first name'
            />  
            <Text style={styles.heading}>Last name</Text>
            
            <TextInput
              value={guestDetails.lastName}
              onChangeText={value=>setGuestDetails({...guestDetails,lastName:value})}
              style={styles.phoneCont}
              placeholderTextColor={COLORS.black}
              placeholder='Enter your last name'
            /> 
            <Text style={styles.heading}>Email address</Text>
 
            <TextInput
              value={guestDetails.email}
              onChangeText={value=>setGuestDetails({...guestDetails,email:value})}
              style={styles.phoneCont}
              placeholderTextColor={COLORS.black}
              placeholder='Enter your email address'
              keyboardType='email-address'
            />  
            <Text style={styles.heading}>Phone number</Text>

            <TextInput
              value={guestDetails.phone}
              onChangeText={value=>setGuestDetails({...guestDetails,phone:value})}
              style={styles.phoneCont}
              placeholderTextColor={COLORS.black}
              placeholder='Enter your phone number'
              keyboardType='numeric'
            />  
        </View>
      </View>
      
    </View>
  )
}

export default GuestDetails

const styles = StyleSheet.create({
    sec:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'85%',
    },
    heading1:{
        color:COLORS.black,
        fontWeight:'800',
        fontSize:SIZES.medium
    },
    heading:{
        color:COLORS.black,
        fontWeight:'800',
        fontSize:SIZES.preMedium
    },
    cont:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
      alignItems:'flex-start',
    },
    cont2:{
        display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      width:'100%',
      alignItems:'flex-start',
    },
    textCont:{
      display:'flex',
      flexDirection:'column',
      width:'80%',
      alignItems:'flex-start',
      marginVertical:10
    },
    smallText:{
      color:COLORS.black,
      fontWeight:'400',
      fontSize:SIZES.small-1,
      width:'80%',
      marginVertical:5
    },
    addBtn:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      height:30,
      width:'25%',
      borderRadius:8,
      borderColor:COLORS.lighterGrey,
      borderWidth:1.5
    },
    addBtnText:{
      color:COLORS.textLightGrey,
      fontWeight:'500',
      fontSize:SIZES.medium-1
    },
    phoneCont:{
      color:COLORS.black,
      fontWeight:'400',
      fontSize:SIZES.small-1,
      width:'80%',
      borderRadius:4,
      borderColor:COLORS.textLightGrey,
      borderWidth:1,
      paddingVertical:5,
      paddingLeft:10,
      height:30,
      marginVertical:10
    }
})