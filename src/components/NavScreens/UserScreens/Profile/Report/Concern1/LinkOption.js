import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../../../constants/themes'

const LinkOption = ({item,setLinkOp,linkOp}) => {
  return (
    <View style={styles.option}>
      <TouchableOpacity style={styles.radio} onPress={()=>{
        setLinkOp(item?.tag)
      }}>
            <View style={(linkOp==item?.tag)?styles.redioSelect:{}}/>
      </TouchableOpacity>
      <Text style={styles.text}>{item?.text}</Text>
    </View>
  )
}

export default LinkOption

const styles = StyleSheet.create({
    option:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        width:'85%',
        marginLeft:'7.5%',
        alignItems:'center',
        marginVertical:10
    },
    radio:{
        width:25,
        height:25,
        borderRadius:20,
        borderWidth:1,
        borderColor:COLORS.mainPurple,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginRight:'5%'
    },
    redioSelect:{
        width:15,
        height:15,
        borderRadius:25,
        backgroundColor:COLORS.mainPurple
    },
    text:{
        fontWeight:SIZES.medium,
        color:COLORS.black,
        fontWeight:'500'
    }
})