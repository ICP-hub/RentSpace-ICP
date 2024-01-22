import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../../../../constants/themes'

const Option = ({item,setMethod,method}) => {
  return (
    <TouchableOpacity 
        style={(method==item?.label)?styles.selectedCard:styles.card} 
        onPress={()=>setMethod(item?.label)}
    >
      {
        item?.icon
      }
    </TouchableOpacity>
  )
}

export default Option

const styles = StyleSheet.create({
    card:{
        width:'30%',
        backgroundColor:'white',
        height:50,
        borderColor:COLORS.lighterGrey,
        borderWidth:1.2,
        borderRadius:8,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    selectedCard:{
        width:'30%',
        backgroundColor:'white',
        height:50,
        borderColor:COLORS.lighterGrey,
        // borderWidth:1.2,
        elevation:2,
        borderRadius:8,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
})