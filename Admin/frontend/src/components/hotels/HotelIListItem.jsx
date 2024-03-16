import React from 'react'

const HotelIListItem = ({hotel,setShowDetail,index}) => {
  return (
    <div className='hotel-list-item'>
        <p className='hotel-list-item-text'>{hotel?.hotelData?.hotelTitle}</p>
        <p className='hotel-list-item-text'>{hotel?.userData?.firstName}</p>
        <p className='hotel-list-item-wide'>{hotel?.hotelData?.hotelLocation}</p>
        <button className='hotel-list-item-btn' onClick={()=>setShowDetail(index)}>Detail</button>
    </div>
  )
}

export default HotelIListItem