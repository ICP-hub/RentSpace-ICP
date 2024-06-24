import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../constants/themes'

const MethodOption = ({item,setMethod,method}) => {

    const putItem=()=>{
        console.log(method)
        if(method.includes(item?.label)){
          let arr=[]
          method.map((am)=>{
            if(am!=item?.label){
              arr.push(am)
            }
          })
          setMethod(arr)
        }else{
          setMethod([...method,item?.label])
        }
      }

  return (
    <TouchableOpacity 
        style={(method.includes(item?.label))?styles.selectedCard:styles.card} 
        onPress={putItem}
    >
      {
        item?.icon
      }
    </TouchableOpacity>
  )
}

export default MethodOption

const styles = StyleSheet.create({
    card:{
        width:'30%',
        backgroundColor:COLORS.newBG,
        height:50,
        borderColor:COLORS.black,
        borderWidth:1.2,
        borderRadius:8,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    selectedCard:{
        width:'30%',
        backgroundColor:COLORS.white,
        height:50,
        borderColor:COLORS.white,
        // borderWidth:1.2,
        elevation:2,
        borderRadius:8,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
    }
})