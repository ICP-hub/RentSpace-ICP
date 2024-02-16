import React, { useState } from 'react'
import AdminMessage from './AdminMessage'
import Message from './Message'
import './chat.css'
import { FaUser } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const Chat = ({user}) => {

  const messages=[
    {
      sender:"admin",
      receiver:"Vikas",
      text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, nihil?"
    },
    {
      sender:"Vikas",
      receiver:"admin",
      text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere animi atque vero!" 
    },
    {
      sender:"admin",
      receiver:"Vikas",
      text:" 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, nihil?"
    },
    {
      sender:"Vikas",
      receiver:"admin",
      text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere animi atque vero!" 
    },
    {
      sender:"Raghav",
      receiver:"admin",
      text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere animi atque vero!" 
    },
    {
      sender:"admin",
      receiver:"Raghav",
      text:"3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, nihil?"
    },
    {
      sender:"Raghav",
      receiver:"admin",
      text:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore?"
    },
    {
      sender:"admin",
      receiver:"Raghav",
      text:"4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, nihil?"
    }
  ]

  const [currentMessage,setCurrentMessage]=useState("")

  return (
    <div className='chat'>
      <div className="chat-header">
        <div className="chat-user-icon-cont">
          <FaUser className='chat-user-icon'/>
        </div>
        <div className="chat-user-status">
          <h3 className="chat-header-name">Vikas</h3>
          <p className="chat-header-status">Active Now</p>
        </div>
        <div></div>
      </div>
      <div className="chat-message-cont">
        {
            messages.map((message,index)=>{
              console.log(message)
              console.log(user)
              if(message?.sender=="admin" && message?.receiver==user){
                console.log("sender is admin")
                return(
                  <AdminMessage text={message?.text} key={index}/>
                )
              }else{
                if(message?.sender==user){
                  console.log("sender is "+message?.sender)
                  return(
                    <Message text={message?.text} key={index}/>
                  )
                } 
              }
            })
        }
      </div>
      <div className="chat-type-field-cont">
        <input 
          type='text' 
          className='chat-type-field' 
          placeholder='Type a message' 
          value={currentMessage}
          onChange={(e)=>setCurrentMessage(e.target.value)}
        />
        <div className='chat-type-field-btn'>
          <FiSend className='chat-type-field-btn-icon'/>
        </div>
      </div>
    </div>
  )
}

export default Chat