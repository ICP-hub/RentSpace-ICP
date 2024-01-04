import { StyleSheet, Text, View,TouchableOpacity, FlatList,Modal } from 'react-native'
import React,{useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { COLORS,SIZES } from '../../../../../constants/themes'
import ChatCard from './ChatCard'
import BottomNavHost from '../../../../Navigation/BottomNavHost'
import Chat from '../ChatComponents/Chat'
import BottomNav from '../../../../Navigation/BottomNav'
import axios from 'axios'
import { useSelector } from 'react-redux'

const sampleChats=require('../../../HostScreens/ChatPage/AllChats/SampleChat.json')

const ChatContainer = ({navigation}) => {

    const [openChat,setOpenChat]=useState(false)
    const [chatItem,setChatItem]=useState({})
    const {authData}=useSelector(state=>state.authDataReducer)
    const baseUrl="https://rentspace.kaifoundry.com"
    const chatLogin=async()=>{
        console.log(`authData : ${authData}\n principal : ${authData.principal}\n publicKey : ${authData.publicKey}`)
        console.log({
            principal:authData.principal,
            publicKey:authData.publicKey
         })
         await axios.post(`${baseUrl}/api/v1/login/user`,{
            principal:authData.principal,
            publicKey:authData.publicKey
         }).then((res)=>{
            console.log("chat login resp : ",res)
         }).catch((err)=>{console.log("chat login error : ",err.response.data)})
    }
    useEffect(()=>{
        chatLogin()
    },[])
  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Chats</Text>
        <View style={styles.iconCont}>
            <TouchableOpacity style={styles.icon}>
                <Icon name='collage' size={30} color={COLORS.textLightGrey}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
                <Icon2 name='plus' size={30} color={COLORS.textLightGrey}/>
            </TouchableOpacity>
        </View>
      </View>
      <FlatList style={styles.list} data={sampleChats} renderItem={(item)=>(
        <ChatCard item={item.item} setOpenChat={setOpenChat} openChat={openChat} setChat={setChatItem}/>
  )}/>
    <BottomNav navigation={navigation}/>
    <Modal animationType='slide' visible={openChat}>
        <Chat item={chatItem} setOpenChat={setOpenChat}/>
    </Modal>
    </View>
  )
}

export default ChatContainer

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%',
        backgroundColor:'white'
    },
    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'90%',
        marginLeft:'2%',
        marginVertical:20
    },
    iconCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:75,
        marginTop:8
    },
    icon:{
        width:30
    },
    title:{
        fontSize:SIZES.medxLarge,
        color:'black',
        fontWeight:'500',
    },
    list:{
        paddingBottom:500,
        width:'100%',
        display:'flex',
        flexDirection:'column',
    }
})