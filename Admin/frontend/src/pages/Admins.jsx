import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/useAuthClient';
import Navbar from '../components/Reusables/menuNavBar/Navbar'
import Header from '../components/Reusables/header/Header'
import '../components/admin/admin.css'
import AddAdmin from '../components/admin/AddAdmin';

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
        <div className="admin-main">
          <AddAdmin/>
        </div>
    </div>
  )
}

export default Admins