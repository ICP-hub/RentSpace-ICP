import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import Query from './Query'
import TypingField from './TypingField'
import { useSelector } from 'react-redux'
import { COLORS } from '../../../../../constants/themes'

const MainChat = ({setSupportChatPage}) => {
    const [message,setMessage]=useState("")
    const [queries,setQueries]=useState([])
    const {actors}=useSelector(state=>state.actorReducer)
    const [loading,setLoading]=useState(false)

    const sendChatMessage=async()=>{
        console.log(actors.supportActor)
        
        setLoading(true)
        await actors?.supportActor?.createIssue(message).then((res)=>{
            console.log(res)
            setLoading(false)
            setMessage("")
            getPreviousQueries()
        }).catch((err)=>{
            console.log(err)
            setLoading(false)
            setMessage("")
        })
    }
    const getPreviousQueries=async()=>{
        setLoading(true)
        await actors?.supportActor.getAllUserIssue().then((res)=>{
            console.log(res)
            res.reverse()
            setQueries(res)
            setLoading(false)
        }).catch((err)=>{
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(()=>{
        getPreviousQueries()
    },[])

  return (
    <View style={styles.view}>
      <ChatHeader setSupportChatPage={setSupportChatPage}/>
      <FlatList contentContainerStyle={styles.list} data={queries} renderItem={(item)=>(
        <Query item={item?.item}/>
      )}/>
      <TypingField setMessage={setMessage} message={message} sendMessage={sendChatMessage}/>
      <ActivityIndicator animating={loading} size={40} style={styles.loader}/>
    </View>
  )
}

export default MainChat

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        height:'100%',
        backgroundColor:COLORS.newBG
    },
    list:{
      paddingBottom:90,
      marginTop:30,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      width:'90%'
    },
    loader:{
        position:'absolute',
        top:'45%',
        left:"45%"
    }
})