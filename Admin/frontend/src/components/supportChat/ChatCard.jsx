import React from 'react'
import { FaUser } from "react-icons/fa";
import { setChatToken } from '../../../../../src/redux/chatToken/actions';

const ChatCard = ({chat,setChat,currChat, user,idx}) => {
  console.log("Chat : ",chat)
  return (
    <div className={(currChat==user?.name)?'chat-card-selected':'chat-card'} onClick={()=>setChat(idx)}>
      <div className='chat-card-icon-cont'>
        <FaUser className='chat-card-user-icon'/>
      </div>
      <div className='chat-card-text-cont'>
        <h4 className='chat-card-name'>
          {user?.firstName + ' ' + user?.lastName}
        </h4>
        <p className='chat-card-desc'>
          {chat[chat?.length - 1]?.message.substring(0,25)+"..."}
        </p>
      </div>
    </div>
  )
}

export default ChatCard