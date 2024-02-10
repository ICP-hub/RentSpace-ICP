import React from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'
import { FaQuestion } from "react-icons/fa6";
import '../components/reports/reports.css'

const Reports = () => {
  
  const reports=[1]

  const nav=useNavigate()
  return (
    <div className='page'>
      <Header title={'Reports'}/>
      {
        (reports?.length==0)?
        <div className="no-reports-cont">
        <div className="no-reports-icon-cont">
          <FaQuestion className='no-reports-icon'/>
        </div>
        <p className="no-reports-text">
                      Sorry!<br/>
              You don’t have any report to show 
        </p>
      </div>
      :
      <></>
      }
      
    </div>
  )
}

export default Reports