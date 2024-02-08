import React from 'react'
import {useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const nav=useNavigate()
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={()=>{nav('supportChat')}}>support</button>
      <button onClick={()=>{nav('stats')}}>stats</button>
      <button onClick={()=>{nav('reports')}}>reports</button>
      <button onClick={()=>{nav('hotels')}}>hotels</button>
    </div>
  )
}

export default DashBoard