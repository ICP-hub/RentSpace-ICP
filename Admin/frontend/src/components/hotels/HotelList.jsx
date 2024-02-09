import React from 'react'
import HotelIListItem from './HotelIListItem'

const hotelsList=new Array(10).fill({
    name:"Aashiyana",
    host:"Lucy",
    country:"India" 
})

const HotelList = () => {
    
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
                    <HotelIListItem hotel={hotel} key={index}/>
                ))
            }
        </div>
    </div>
  )
}

export default HotelList