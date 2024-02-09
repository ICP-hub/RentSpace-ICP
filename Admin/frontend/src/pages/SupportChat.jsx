import React from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'


const SupportChat = () => {
  const nav=useNavigate()
  return (
    <div className='page'>
      <Header title={'Support Chat'}/>
    </div>
  )
}

export default SupportChat