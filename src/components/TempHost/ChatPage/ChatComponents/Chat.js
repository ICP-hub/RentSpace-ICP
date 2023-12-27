import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import TypingField from './TypingField'
import ChatMessage from './ChatMessage'

const Chat = ({item,setOpenChat}) => {
  const [messages,setMessages]=useState(item?.messages)
  return (
    <View style={styles.view}>
      <ChatHeader name={item?.name} status={true} setOpenChat={setOpenChat}/>
      <FlatList contentContainerStyle={styles.list} data={messages} renderItem={(item)=>(
        <ChatMessage item={item.item}/>
      )}/>
      <TypingField setMessages={setMessages} messages={messages}/>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        height:'100%'
    },
    list:{
      paddingBottom:90,
      marginTop:30,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      width:'90%'
    }
})