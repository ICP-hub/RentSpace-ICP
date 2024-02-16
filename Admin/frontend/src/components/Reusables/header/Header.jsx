import React from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import './header.css'

const Header = ({title,onClick}) => {
  return (
    <div className='header'>
        <div className="header-text">
            <h1 className='heading'>{title}</h1>
            <IoChatbubbleEllipses className='chat-icon' onClick={onClick}/>
        </div>
        <hr className='header-line'/>
    </div>
  )
}

export default Header