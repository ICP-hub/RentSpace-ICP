import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../../../../constants/themes'

const Option = ({item,setMethod,method,connect}) => {
  // console.log(item);
  return (
    <TouchableOpacity 
        style={(method==item?.label)?styles.selectedCard:styles.card} 
        onPress={()=>{
          setMethod(item?.label)
          if(item?.label=="SOL"){
            // connect()
            Alert.alert('Coming Soon','This feature is coming soon');
            
          }
        }}
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
        backgroundColor:COLORS.mainGrey,
        height:50,
        borderColor:COLORS.white,
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
        borderColor:COLORS.mainPurple,
        borderWidth:1.2,
        elevation:2,
        borderRadius:8,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
})