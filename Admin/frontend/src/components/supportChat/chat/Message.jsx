import React from 'react'
import { FaUser } from "react-icons/fa";

const Message = ({text}) => {
  return (
    <div className='normal-message-cont'>
        <div className='normal-message-icon-cont'>
            <FaUser className='normal-message-icon'/>
        </div>
        <p className='normal-message'>
            {text}
        </p>
    </div>
  )
}

export default Message