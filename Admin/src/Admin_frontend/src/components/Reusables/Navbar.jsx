import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './nav.css'

const Navbar = () => {
    const navg=useNavigate()
  return (
    <div className='navbar'>
        <img src='logo2.svg' className='logo'/>
        <ul className='linkCont'>
              <li className='link' onClick={() => {
                  navg('/')
              }}>
                  DashBoard
              </li>
              <li className='link' onClick={() => {
                  navg('/stats')
              }}>
                  Statistics
              </li>
              <li className='link' onClick={() => {
                  navg('/hotels')
              }}>
                Registered Hotels
            </li>
              <li className='link' onClick={() => {
                  navg('/reports')
              }}>
                Reports
            </li>
              <li className='link' onClick={() => {
                  navg('/supportChat')
              }}>
                Support Chat
            </li>
        </ul>
        <button className='logoutBtn'>Logout</button>
    </div>
  )
}

export default Navbar