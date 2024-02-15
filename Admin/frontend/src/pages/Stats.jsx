import React from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'
import '../components/statistics/stats.css'
import PiechartStats from '../components/statistics/PiechartStats'
import Navbar from '../components/Reusables/menuNavBar/Navbar'

const dataComplete=require('../charts/data.json')

const Stats = () => {
  const nav=useNavigate()
  return (
    <div className='page'>
      <Navbar nav={nav}/>
      <Header title={'Statistics'}/>
      <div className="stats-main-cont">
        <div className="pie-chart-cont">
          <PiechartStats label={"Users"} data={dataComplete[0].users}/>
          <PiechartStats label={"Hotels"} data={dataComplete[0].hotels}/>
        </div>
      </div>
    </div>
  )
}

export default Stats