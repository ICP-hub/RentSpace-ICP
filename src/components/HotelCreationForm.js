import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SIZES,COLORS } from '../constants/themes'
import { hotel } from '../declarations/hotel/index.js'

const HotelCreationForm = ({setHotels,setHotelCreateForm,user}) => {
  const [hotelData,setHotelData]=useState({})
  const createHotel=async()=>{
    console.log('create hotel')
  await hotel.createHotel(user?.userId,hotelData).then(async(res)=>{
    alert('Your hotel has been created')
    await hotel.getHotelId(user?.userId).then(async(res)=>{
      console.log(res)
      setHotels(res)
      setHotelCreateForm(false)
     
    })

  }).catch((err)=>{console.log(err)})
  }
  return (
    <View style={styles.bottomSheet}>
      <Text style={styles.title}>Create new Hotel</Text>
      <TextInput 
        style={styles.inputs} 
        value={hotelData?.hotelTitle}
        placeholder='Hotel Name'
        placeholderTextColor={COLORS.inputBorder}
        onChangeText={value=>{setHotelData({...hotelData,hotelTitle:value})}}
      />
      <TextInput 
        style={styles.inputs} 
        value={hotelData?.hotelDes}
        placeholder='Hotel description'
        placeholderTextColor={COLORS.inputBorder}
        onChangeText={value=>{setHotelData({...hotelData,hotelDes:value})}}
      />
      <TextInput 
        style={styles.inputs} 
        value={hotelData?.hotelImage}
        placeholder='Hotel Image'
        placeholderTextColor={COLORS.inputBorder}
        onChangeText={value=>{setHotelData({...hotelData,hotelImage:value})}}
      />
      <TextInput 
        style={styles.inputs} 
        value={hotelData?.hotelPrice}
        placeholder='Price per night'
        placeholderTextColor={COLORS.inputBorder}
        onChangeText={value=>{setHotelData({...hotelData,hotelPrice:value})}}
      />
      <TextInput 
        style={styles.inputs} 
        value={hotelData?.hotelLocation}
        placeholder='Location'
        placeholderTextColor={COLORS.inputBorder}
        onChangeText={value=>{setHotelData({...hotelData,hotelLocation:value})}}
      />
      <TouchableOpacity style={styles.submitBtn} onPress={()=>{createHotel()}}>
        <Text style={styles.submitText}>Create Hotel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.submitBtn,{backgroundColor:'red'}]} onPress={()=>{setHotelCreateForm(false)}}>
        <Text style={styles.submitText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HotelCreationForm

const styles = StyleSheet.create({
  bottomSheet: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    paddingVertical:40
  },
  title:{
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: 'black',
    marginBottom:40
  },
  inputs:{
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
    height: 50,
    padding: 15,
    color: COLORS.inputBorder,
    fontSize: SIZES.preMedium,
    opacity: 0.5,
  },
  submitBtn:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    backgroundColor: COLORS.inputBorder,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 80,
    marginTop: 10,
  },
  submitText:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  }
})