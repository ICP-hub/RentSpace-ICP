import React from 'react'
import { FaUser } from "react-icons/fa";

const ChatCard = ({chat,nav}) => {
  console.log(chat)
  return (
    <div className='chat-card' onClick={()=>nav('/supportChat')}>
      <div className='chat-card-icon-cont'>
        <FaUser className='chat-card-user-icon'/>
      </div>
      <div className='chat-card-text-cont'>
        <h4 className='chat-card-name'>
          {chat?.user?.firstName + ' ' + chat?.user?.lastName}
        </h4>
        <p className='chat-card-desc'>
          {chat?.chats[0].message.substring(0,25)+"..."}
        </p>
      </div>
    </div>
  )
}

export default ChatCard