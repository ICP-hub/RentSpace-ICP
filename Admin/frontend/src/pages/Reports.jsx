import React from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'


const Reports = () => {
  const nav=useNavigate()
  return (
    <div className='page'>
      <Header title={'Reports'}/>
    </div>
  )
}

export default Reports