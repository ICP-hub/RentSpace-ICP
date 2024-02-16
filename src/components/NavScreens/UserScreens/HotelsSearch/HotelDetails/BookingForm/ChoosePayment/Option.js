import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../../../constants/themes'

const Option = ({item,fullPayment,setFullPayment}) => {
  return (
    <View style={styles.card}>
      <View style={styles.textCont}>
        <Text style={styles.bigText}>
            {item?.text}
        </Text>
        <Text style={styles.smallText}>
            {item?.subText}
        </Text>
      </View>
      <TouchableOpacity style={styles.radio} onPress={()=>setFullPayment(item?.fullPayment)}>
        <View style={(item?.fullPayment==fullPayment)?[styles.radioCheck,{backgroundColor:COLORS.hostTitle}]:styles.radioCheck}/>
      </TouchableOpacity>
    </View>
  )
}

export default Option

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        alignItems:'flex-start',
        marginTop:15
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start'
    },
    bigText:{
        color:'black',
        fontWeight:'bold',
        fontSize:SIZES.preMedium-1
    },
    smallText:{
        color:'black',
        fontWeight:'400',
        fontSize:SIZES.preMedium-1
    },
    radio:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:22,
        height:22,
        borderColor:COLORS.hostTitle,
        borderRadius:20,
        borderWidth:1
    },
    radioCheck:{
        width:'60%',
        height:'60%',
        borderRadius:100
    }
})