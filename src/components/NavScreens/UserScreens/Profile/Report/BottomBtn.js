import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS,SIZES } from '../../../../../constants/themes'

const BottomBtn = ({step,onClickNext,nextText,setConcernForm}) => {
    const progress=(step==1)?"50%":"100%"
    const [bottom,setBottom]=useState(true)
    
    useEffect(()=>{
        Keyboard.addListener('keyboardDidShow',()=>{
            setBottom(false)
        })
        Keyboard.addListener('keyboardDidHide',()=>{
            setBottom(true)
        })
    },[])
  return (
    <View style={(bottom)?[styles.sec,{bottom:0}]:[styles.sec,{bottom:-100}]}>
      <View style={styles.progressBar}>
        <View style={[styles.progress,{width:progress}]} />
      </View>
      <View style={styles.btnCont}>
        <TouchableOpacity onPress={()=>setConcernForm(step-1)}>
            <Text style={styles.link}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onClickNext}>
            <Text style={styles.btnText}>{nextText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BottomBtn

const styles = StyleSheet.create({
    sec:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        backgroundColor:COLORS.mainGrey,
        position:'absolute',
    },
    progressBar:{
        width:'85%',
        height:4,
        borderRadius:10,
        backgroundColor:COLORS.mainLightGrey,
        display:'flex',
        flexDirection:'flex-start',
    },
    progress:{
        backgroundColor:COLORS.mainPurple,
        height:'100%',
        borderRadius:10
    },
    btnCont:{
        width:'85%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:15
    },
    btn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'37%',
        paddingVertical:15,
        backgroundColor:COLORS.mainPurple,
        borderRadius:10
    },
    btnText:{
        fontSize:SIZES.medium,
        fontWeight:'bold',
        color:COLORS.white
    },
    link:{
        fontSize:SIZES.medium,
        fontWeight:'bold',
        color:COLORS.black,
        textDecorationLine:'underline',
        marginLeft:10
    }
})