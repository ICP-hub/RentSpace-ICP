import React from 'react'

const HotelFeatureCard = ({item}) => {
  return (
    <div className='hotel-feature-cont'>
        {
            item?.icon
        }
        <div className="hotel-feature-text-cont">
            <h4 className="hotel-feature-title">{item?.title}</h4>
            <p className="hotel-feature-text">{item?.text}</p>
        </div>
    </div>
  )
}

export default HotelFeatureCard