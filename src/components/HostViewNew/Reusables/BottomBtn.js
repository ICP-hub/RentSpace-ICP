import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../constants/themes'

const BottomBtn = ({setHostModal,pos,step}) => {
    const progress=(step==1)?'33%':(step==2)?'66%':'100%';
  return (
    <View style={styles.bottomCont}>
        <View style={styles.progressCont}>
            <View style={[styles.progress,{width:progress}]}/>
        </View>
        <View style={styles.btnCont}>
            <TouchableOpacity onPress={()=>setHostModal(pos-1)}>
                <Text style={styles.link}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=>setHostModal(pos+1)}>
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
        backgroundColor:'white',
        position:'absolute',
        bottom:0
    },
    progressCont:{
        width:'85%',
        height:4,
        borderRadius:10,
        backgroundColor:COLORS.hrLine,
        display:'flex',
        flexDirection:'flex-start',
        
    },
    progress:{
        backgroundColor:COLORS.hostTitle,
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
        backgroundColor:COLORS.hostTitle,
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