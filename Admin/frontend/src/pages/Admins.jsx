import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/useAuthClient';
import Navbar from '../components/Reusables/menuNavBar/Navbar'
import Header from '../components/Reusables/header/Header'

const Admins = () => {

  const {actors}=useAuth()
  const nav=useNavigate()
  const [adminList,setAdminList]=useState([])

  const createNewAdmin=async()=>{
    // await actors?.supportChatActor
  }
  const getAllAdminList=async()=>{

  }

  return (
    <div className='page'>
        <Navbar nav={nav}/>
        <Header title={"Admin Management"} onClick={()=>{}}/>
        <div className="admin-main"></div>
    </div>
  )
}

export default Admins