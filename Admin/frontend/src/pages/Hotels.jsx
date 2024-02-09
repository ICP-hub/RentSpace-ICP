import React from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'
import '../components/hotels/hotels.css'
import HotelList from '../components/hotels/HotelList'
import HotelChart from '../components/hotels/hotelChart/HotelChart'


const Hotels = () => {
  const nav=useNavigate()
  return (
    <div className='page'>
      <Header title={'Hotels Registered'} onClick={()=>alert('hotels page')}/>
      <div className='hotel-main-cont'>
        <HotelChart/>
        <HotelList/>
      </div>
    </div>
  )
}

export default Hotels