import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../../constants/themes'

const TopicOption = ({item,setTopic,topic,setReport,report}) => {
  return (
    <View style={styles.option}>
      <TouchableOpacity style={styles.radio} onPress={()=>{
        setTopic(item?.tag)
        setReport({...report,reason:item?.text})
      }}>
            <View style={(topic==item?.tag)?styles.redioSelect:{}}/>
      </TouchableOpacity>
      <Text style={styles.text}>{item?.text}</Text>
    </View>
  )
}

export default TopicOption

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