import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './nav.css'
import Icon from 'react-web-vector-icons'

const Navbar = () => {
    const navg=useNavigate()
  return (
    <div className='navbar'>
        <div className='logo'>
            <Icon name='user' font='FontAwesome' size={55} color='black'/>
        </div>
        <ul className='linkCont'>
              <li className='link' onClick={() => {
                  navg('/')
              }}>
                  Dashboard
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