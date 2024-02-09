import React from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'


const Stats = () => {
  const nav=useNavigate()
  return (
    <div className='page'>
      <Header title={'Statistics'}/>
    </div>
  )
}

export default Stats