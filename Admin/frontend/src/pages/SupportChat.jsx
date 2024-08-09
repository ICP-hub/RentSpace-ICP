import React, { useEffect, useState, useCallback } from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'
import '../components/supportChat/supportChat.css'
import ChatList from '../components/supportChat/ChatList'
// import Chat from '../components/supportChat/chat/Chat'
import Navbar from '../components/Reusables/menuNavBar/Navbar'
import { useAuth } from '../utils/useAuthClient'
import { Suspense, lazy } from 'react'

const Chat = lazy(()=>import('../components/supportChat/chat/Chat'))


const SupportChat = () => {
  const nav=useNavigate()
  const [chat,setChat]=useState("")
  const [currentChat, setCurrentChat] = useState(0)
  const {actors}=useAuth()

  const getChats = useCallback(async (pageNo) => {
    const getChatsResponse = await actors?.supportActor?.getAllChats(50, pageNo);

    if (getChatsResponse.ok) {
      const chatPromises = getChatsResponse.ok.map(async ([principal, chats]) => {
        const userResponse = await actors?.userActor?.getUserByPrincipal(principal);
        if (userResponse.ok) {
          return { user: userResponse.ok, chats };
        } else {
          return { user: null, chats }; // Handle the case where user fetching fails
        }
      });
  
      const ChatList = await Promise.all(chatPromises);

      // console.log(ChatList)
      
      setChat(ChatList)
    } else {
      return setChat([])
    }
  }, [actors])

  useEffect(()=>{
    getChats(1)
    console.log("hello chat")
  },[])

  return (
    <div className='page'>
      <Navbar nav={nav}/>
      <Header title={'Support Chat'}/>
      <div className="chat-main-cont">
          <ChatList currChat={chat} setChat={setCurrentChat}/>
          {
            chat==""?
            <></>
            :<><Suspense><Chat user={chat[currentChat].user}/></Suspense></>
          }
      </div>
    </div>
  )
}

export default SupportChat