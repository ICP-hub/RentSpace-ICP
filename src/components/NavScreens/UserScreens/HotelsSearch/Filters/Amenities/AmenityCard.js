import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../../../constants/themes'

const AmenityCard = ({item,amenities,setAmenities}) => {
  const putItem=()=>{
    if(amenities.includes(item?.name)){
      let arr=[]
      amenities.map((am)=>{
        if(am!=item?.name){
          arr.push(am)
        }
      })
      setAmenities(arr)
    }else{
      setAmenities([...amenities,item?.name])
    }
  }
  return (
    <TouchableOpacity 
      style={(amenities.includes(item?.name))?[styles.card,{backgroundColor:COLORS.lighterGrey}]:styles.card}
      onPress={putItem}
    >
      {
        item?.icon
      }
    </TouchableOpacity>
  )
}

export default AmenityCard

const styles = StyleSheet.create({
  card:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    padding:2,
    borderRadius:4
  }
})