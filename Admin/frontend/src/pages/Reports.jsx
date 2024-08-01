import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'
import { FaQuestion } from "react-icons/fa6";
import '../components/reports/reports.css'
import ReportList from '../components/reports/ReportList';
import ReportDetail from '../components/reports/reportDetail/ReportDetail';
import Navbar from '../components/Reusables/menuNavBar/Navbar';
import { useAuth } from '../utils/useAuthClient';
import { Principal } from '@dfinity/principal';

const Reports = () => {

  const [reportList,setReportList]=useState([])
  const {actors}=useAuth()

  const getAllReports=async()=>{
    let newArr=[]
    let reportRes=await actors?.supportActor?.getAllUnresolvedTickets(10,1)
    if(reportRes?.err!=undefined){
      console.log("err fetching reports : ",reportRes?.err)
      return
    }
    console.log(reportRes)
    
    await actors?.supportActor?.scanBooking(0,10).then((res)=>{
      console.log("report : ",res[0][1])
      res[0][1].map(async(r)=>{
        let userId=r[0].split("#")[0]
        await actors?.userActor?.getUserInfoByPrincipal(Principal.fromText(userId)).then((userRes)=>{
          console.log(userRes[0])
          let reportEl={
            userId:userId,
            reportId:r[0],
            userData:userRes[0],
            reportData:r[1]
          }
          if(!r[1]?.resolved){
            newArr.push(reportEl)
            setReportList([...newArr])            
            console.log(reportEl)
          }

        }).catch((err)=>{
          console.log("err fetching user data : ",err)
        })
      })
    }).catch((err)=>{
      console.log("err fetching reports : ",err)
    })
  }

  
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
    // console.log(reportDetail?.name,reportDetail?.name!=undefined)
    getAllReports()
  },[])

  const nav=useNavigate()
  return (
    <div className='page'>
      <Navbar nav={nav}/>
      <Header title={'Reports'}/>
      {
        (reportList?.length==0)?
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
        <ReportList reports={reportList} showReportDetail={showReportDetail} reportDetail={reportDetail}/>
        {
            
            reportDetail?.userData?.firstName!=undefined?
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