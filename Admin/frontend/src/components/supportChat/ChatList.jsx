import React, { useState } from 'react'
import ChatCard from './ChatCard'
import { FaQuestion } from "react-icons/fa6";

const userChats=[
    {
        name:"Vikas",
        text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque beatae possimus quae laborum, at dolorem."
    },
    {
        name:"Raghav",
        text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dolorem totam cupiditate. Illo quos iure quo reprehenderit consequuntur."
    }
]

const ChatList = ({currChat,setChat}) => {
    
  return (
    <div className='chatlist'>
        {
            (currChat.length>0)?
            <>
                <h3 className='chat-list-headline'><p style={{opacity:0.5}}>You have </p>&nbsp;{currChat.length} New Queries Today</h3>
                <h1 className='chat-list-day'>Today</h1>
                {
                    currChat.map((chat,index)=>(
                        <ChatCard user = {chat.user} chat={chat.chats} idx={index} key={index} setChat={setChat} currChat={currChat}/>
                    ))
                }
            </>    
                :

            <div className='no-chats'>
                <div className='no-chats-icon'>
                    <FaQuestion className='question-icon'/>
                </div>
                <p className='no-chats-text'>
                                    Sorry!<br/>
                    You don’t have any message to show 
                </p>
            </div>
        }
        
    </div>
  )
}

export default ChatList