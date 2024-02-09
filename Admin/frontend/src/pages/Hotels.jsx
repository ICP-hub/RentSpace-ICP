import React from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'


const Hotels = () => {
  const nav=useNavigate()
  return (
    <div className='page'>
      <Header title={'Hotels Registered'} onClick={()=>alert('hello')}/>
    </div>
  )
}

export default Hotels