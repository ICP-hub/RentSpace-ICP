import React from 'react'
import {useNavigate } from 'react-router-dom'
import ReportComp from '../components/Reports/ReportComp'
import '../components/Reports/ReportComp.css';


const Reports = () => {
  const nav=useNavigate()
  return (
    <div>
      <ReportComp/>
    </div> 
      
  )
}

export default Reports