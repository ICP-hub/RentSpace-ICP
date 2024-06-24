import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS,SIZES } from '../../../constants/themes'
import { useSelector } from 'react-redux'

const UploadTemp = ({setHostModal,pos}) => {

  const {files}=useSelector(state=>state.filesReducer)

    useEffect(()=>{
        setTimeout(()=>{setHostModal(pos+1)},500)
    },[])
    
  return (
    <View style={styles.view}>
      <Text style={styles.title}>
      Magically arranging your photos to show off your space
      </Text>
      <Text style={styles.text}>0 of {files.length-1} Arranged</Text>
    </View>
  )
}

export default UploadTemp

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        height:'100%',
        backgroundColor:COLORS.mainGrey
    },
    title:{
        width:'88%',
        color:COLORS.black,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:30,
        marginTop:'50%',
        textAlign:'center'
    },
    text:{
        color:COLORS.black,
        fontSize:SIZES.preMedium,
        fontWeight:'bold'
    }
})