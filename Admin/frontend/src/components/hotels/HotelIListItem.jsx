import React from 'react'

const HotelIListItem = ({hotel}) => {
  return (
    <div className='hotel-list-item'>
        <p className='hotel-list-item-text'>{hotel?.name}</p>
        <p className='hotel-list-item-text'>{hotel?.host}</p>
        <p className='hotel-list-item-wide'>{hotel?.country}</p>
        <button className='hotel-list-item-btn'>Detail</button>
    </div>
  )
}

export default HotelIListItem