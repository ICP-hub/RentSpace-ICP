import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'
import { FaQuestion } from "react-icons/fa6";
import '../components/reports/reports.css'
import ReportList from '../components/reports/ReportList';
import ReportDetail from '../components/reports/reportDetail/ReportDetail';
import Navbar from '../components/Reusables/menuNavBar/Navbar';

const Reports = () => {

  
  const reports=[
    {
      name:"Vikas"
    },
    {
      name:"Raghav"
    }
  ]
  const [reportDetail,showReportDetail]=useState({})

  useEffect(()=>{
    console.log(reportDetail?.name,reportDetail?.name!=undefined)
  },[reportDetail])

  const nav=useNavigate()
  return (
    <div className='page'>
      <Navbar nav={nav}/>
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
      <div className="reports-main">
        <ReportList reports={reports} showReportDetail={showReportDetail} reportDetail={reportDetail}/>
        {
            
            reportDetail?.name!=undefined?
            <ReportDetail report={reportDetail}/>
            :
            <></>
        }
      </div>
      }
      
    </div>
  )
}

export default Reports