import React from 'react'
import { FaUser } from "react-icons/fa";
import { setChatToken } from '../../../../../src/redux/chatToken/actions';

const ChatCard = ({chat,setChat,currChat}) => {
  return (
    <div className={(currChat==chat?.name)?'chat-card-selected':'chat-card'} onClick={()=>setChat(chat?.name)}>
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