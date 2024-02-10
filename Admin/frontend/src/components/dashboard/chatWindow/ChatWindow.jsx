import React from 'react'
import ChatCard from './ChatCard'
import './chatWindow.css'
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

const ChatWindow = ({nav}) => {
  return (
    <div className='chatWindow'>
        {
            (userChats.length>0)?
            <>
                <h3 className='chat-headline'><p style={{opacity:0.5}}>You have </p>&nbsp;{userChats.length} New Queries Today</h3>
                <h1 className='chat-day'>Today</h1>
                {
                    userChats.map((chat,index)=>(
                        <ChatCard chat={chat} key={index} nav={nav}/>
                    ))
                }
            </>    
                :

            <div className='no-chats'>
                <div className='no-chats-icon'>
                    <FaQuestion className='question-icon'/>
                </div>
                <p className='no-chats-text'>
                    All user’s queries will be shown here
                </p>
            </div>
        }
        
    </div>
  )
}

export default ChatWindow