import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'
import '../components/hotels/hotels.css'
import HotelList from '../components/hotels/HotelList'
import HotelChart from '../components/hotels/hotelChart/HotelChart'
import HotelDetails from '../components/hotelDetails/HotelDetails'

const hotelsList=new Array(10).fill({
  name:"Aashiyana",
  host:"Lucy",
  country:"India" 
})


const Hotels = () => {
  const nav=useNavigate()
  const [showDetail,setShowDetail]=useState(true)
  return (
    <>
      {
        showDetail?
        <>
          <div className='page-full-width'>
            <Header title={'Registered hotels'} onClick={()=>alert('hotels page')}/>
            <HotelDetails/>
          </div>
        </>
        :
        <>
        <div className='page'>
          <Header title={'Hotels Registered'} onClick={()=>alert('hotels page')}/>
          <div className='hotel-main-cont'>
            <HotelChart/>
            <HotelList hotelsList={hotelsList} setShowDetail={setShowDetail}/>
          </div>
        </div>
        </>
        
      }
      </>
    
  )
}

export default Hotels