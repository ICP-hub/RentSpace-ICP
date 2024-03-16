import React, { useEffect, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiClose } from "react-icons/tfi";
import './menu.css'
import { useAuth } from '../../../utils/useAuthClient';

const Navbar = ({nav}) => {
    const [open,setOpen]=useState(false)
    const {logout}=useAuth()

    const Logout=async()=>{
      await logout().then((res)=>{
          console.log(res)
          location.reload()
      }).catch((err)=>{
          console.log(err)
      })
  }
  return (
    <div className='menu-container'onClick={()=>setOpen(!open)} >
        {
            open==true?
            <TfiClose className='nav-menu-icon' />
            :
            <RxHamburgerMenu className='nav-menu-icon'/>
        }
        <div className="menu-item-cont" style={(open==true)?{}:{display:'none'}}>
            <p className="menu-item" onClick={()=>nav('/')}>Dashboard</p>
            <p className="menu-item" onClick={()=>nav('/hotels')}>Hotels</p>
            <p className="menu-item" onClick={()=>nav('/stats')}>Statistics</p>
            <p className="menu-item" onClick={()=>nav('/reports')}>Reports</p>
            <p className="menu-item" onClick={()=>nav('/supportChat')}>Support chat</p>
            <p className="menu-item" onClick={()=>{nav('/admin')}}>Admin Management</p>
            <button className='menu-logoutBtn' onClick={Logout}>Logout</button>
        </div>
    </div>
  ) 
}

export default Navbar