import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../constants/themes'
import Chat from '../ChatComponents/Chat'

const ChatCard = ({item,setOpenChat,openChat,setChat}) => {
  return (
    <>
    <TouchableOpacity style={styles.card} onPress={()=>{
      setOpenChat(true)
      setChat(item)
      }}>
      <Text style={styles.title}>{item?.name}</Text>
      <Text style={styles.time}>Mon</Text>
    </TouchableOpacity>
    
    </>
  )
}

export default ChatCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'white',
        width:'85%',
        marginLeft:'7.5%',
        elevation:5,
        height:70,
        borderRadius:12,
        marginVertical:12
    },
    title:{
        color:COLORS.black,
        fontSize:SIZES.medium,
        marginLeft:10
    },
    time:{
        color:COLORS.textLightGrey,
        opacity:0.3,
        fontWeight:'300',
        fontSize:SIZES.small,
        position:'absolute',
        right:'2%',
        top:'30%'
    }
})