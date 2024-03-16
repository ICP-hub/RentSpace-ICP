import React from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import './header.css'

const Header = ({title,onClick}) => {
  return (
    <div className='header'>
        <div className="header-text">
            <h1 className='heading'>{title}</h1>
            {
              title=="Dashboard Overview"?
              <IoChatbubbleEllipses className='chat-icon' onClick={onClick}/>
              :
              title=="Registered hotels"?
              <FaArrowLeft className='chat-icon' onClick={onClick}/>
              :
              <></>
            }
            
        </div>
        <hr className='header-line'/>
    </div>
  )
}

export default Header