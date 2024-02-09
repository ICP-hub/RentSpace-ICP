import React from 'react'
import { FaUser } from "react-icons/fa";

const ChatCard = ({chat}) => {
  return (
    <div className='chat-card'>
      <div className='chat-card-icon-cont'>
        <FaUser className='chat-card-user-icon'/>
      </div>
      <div className='chat-card-text-cont'>
        <h4 className='chat-card-name'>
          {chat?.name}
        </h4>
        <p className='chat-card-desc'>
          {chat?.text.substring(0,25)+"..."}
        </p>
      </div>
    </div>
  )
}

export default ChatCard