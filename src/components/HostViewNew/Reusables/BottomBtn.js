import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../../../constants/themes'
import { KeyboardState } from 'react-native-reanimated';

const BottomBtn = ({setHostModal,pos,step,back,nextFunc}) => {
    const progress=(step==1)?'33%':(step==2)?'66%':'100%';
    const [bottom,setBottom]=useState(true)
    useEffect(()=>{
        Keyboard.addListener('keyboardDidShow',()=>{
            setBottom(false)
        })
        Keyboard.addListener('keyboardDidHide',()=>{
            setBottom(true)
        })
    })
    const execNext=()=>{
        let res=nextFunc()
        console.log(res)
        if(res){
            if(pos==9){
                setHostModal(pos+2)
            }else{
                setHostModal(pos+1)
            }
        }
        
    }
  return (
    <View style={(bottom)?[styles.bottomCont,{bottom:0}]:[styles.bottomCont,{bottom:-100}]}>
        <View style={styles.progressBarCont}>
        <View style={styles.progressCont}>
            <View style={[styles.progress,{width:progress}]}/>
        </View>
        </View>
        <View style={styles.btnCont}>
            <TouchableOpacity onPress={()=>{
                if(pos==4){
                    setHostModal(0)
                }
                else{
                back?setHostModal(pos-back):
                setHostModal(pos-1)
                }

            }}>
                <Text style={styles.link}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={execNext}>
                <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default BottomBtn

const styles = StyleSheet.create({
    bottomCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        backgroundColor:COLORS.mainGrey,
        position:'absolute',
    },
    progressBarCont:{
        width:'100%',
        height:6,
        backgroundColor:COLORS.mainGrey,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    progressCont:{
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
        color:'white'
    },
    link:{
        fontSize:SIZES.medium,
        fontWeight:'bold',
        color:'black',
        textDecorationLine:'underline',
        marginLeft:10
    }
})