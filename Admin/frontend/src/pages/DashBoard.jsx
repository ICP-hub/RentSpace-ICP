import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'
import '../components/dashboard/dashboard.css'
import InfoCards from '../components/dashboard/InfoCards'
import ChatWindow from '../components/dashboard/chatWindow/ChatWindow'
import BookingChart from '../components/dashboard/bookingChart/BookingChart'
import Navbar from '../components/Reusables/menuNavBar/Navbar'

const DashBoard = () => {
  const nav=useNavigate()
  const [chat,showChat]=useState(true)
  return (
    <div className='page'>
      <Navbar nav={nav}/>
      <Header title={'Dashboard Overview'} onClick={()=>showChat(!chat)}/>
      <div className='dashboard-main'>
        <div className='dashboard-main-info'>
            <div className='dashboard-infoCards-cont'>
              <InfoCards label={"Users"} count={45}/>
              <InfoCards label={"Hotels"} count={345}/>
            </div>
            <BookingChart/>
        </div>
        {
          chat?
          <ChatWindow nav={nav}/>
          :
          <></>
        }
      </div>
    </div>
  )
}

export default DashBoard