import React from 'react'
import HotelIListItem from './HotelIListItem'

const HotelList = ({hotelsList,setShowDetail}) => {
    
  return (
    <div className='hotel-list'>
        <div className='hotel-list-header'>
            <h3 className='hotel-list-heading'>Hotel Name</h3>
            <h3 className='hotel-list-heading'>Host Name</h3>
            <h3 className='hotel-list-heading-wide'>Country/Region</h3>
            <h3 className='hotel-list-heading'>Action</h3>
        </div>
        <div className='hotel-list-cont'>
            {
                hotelsList.map((hotel,index)=>(
                    <HotelIListItem hotel={hotel} index={index} key={index} setShowDetail={setShowDetail}/>
                ))
            }
        </div>
    </div>
  )
} 

export default HotelList