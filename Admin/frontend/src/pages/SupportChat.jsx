import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'
import '../components/supportChat/supportChat.css'
import ChatList from '../components/supportChat/ChatList'
import Chat from '../components/supportChat/chat/Chat'
import Navbar from '../components/Reusables/menuNavBar/Navbar'
import { useAuth } from '../utils/useAuthClient'


const SupportChat = () => {
  const nav=useNavigate()
  const [chat,setChat]=useState("")
  const {actors}=useAuth()

  const getAllIssues=async()=>{
    console.log("executing",actors?.supportActor)
    await actors?.supportActor?.getAllUnResolvedIssue().then((res)=>{
      console.log("here")
      console.log("support chat res : ",res[0])
    }).catch((err)=>{
      console.log("err fetching chats : ",err)
    })
  }

  useEffect(()=>{
    getAllIssues()
    console.log("hello chat")
  },[])

  return (
    <div className='page'>
      <Navbar nav={nav}/>
      <Header title={'Support Chat'}/>
      <div className="chat-main-cont">
          <ChatList currChat={chat} setChat={setChat}/>
          {
            chat==""?
            <></>
            :<Chat user={chat}/>
          }
      </div>
    </div>
  )
}

export default SupportChat