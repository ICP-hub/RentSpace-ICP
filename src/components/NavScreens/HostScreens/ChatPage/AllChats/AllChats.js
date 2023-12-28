import { StyleSheet, Text, View,TouchableOpacity, FlatList,Modal } from 'react-native'
import React,{useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { COLORS,SIZES } from '../../../../../constants/themes'
import ChatCard from './ChatCard'
import BottomNavHost from '../../../../Navigation/BottomNavHost'
import ChatDrawer from '../ChatDrawer/ChatDrawer'
import Chat from '../ChatComponents/Chat'

const sampleChats=require('./SampleChat.json')

const AllChats = ({navigation}) => {

    const [showDrawer,setShowDrawer]=useState(false)
    const [openChat,setOpenChat]=useState(false)
    const [chatItem,setChatItem]=useState({})

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
    <BottomNavHost navigation={navigation} showDrawer={showDrawer} setShowDrawer={setShowDrawer}/>
    <Modal animationType='fade' visible={showDrawer} transparent>
        <ChatDrawer navigation={navigation} showDrawer={showDrawer} setShowDrawer={setShowDrawer}/>
    </Modal>
    <Modal animationType='slide' visible={openChat}>
        <Chat item={chatItem} setOpenChat={setOpenChat}/>
    </Modal>
    </View>
  )
}

export default AllChats

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