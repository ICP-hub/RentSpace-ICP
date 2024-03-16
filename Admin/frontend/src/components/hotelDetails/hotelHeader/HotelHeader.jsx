import React, { useState } from 'react'
import './hotelHeader.css'
import { FaStar } from "react-icons/fa";
import { LuCheckCircle } from "react-icons/lu";

const HotelHeader = ({hotel}) => {
  const [showGovID,setShowGovID]=useState(false)
  return (
    <div className='hotel-details-header'>
      <div className='header-video-cont'>
        <img className='video-img' src='hotelImg.png'/>
        <button className='header-video-cont-btn'>
          Contact Host@ &nbsp; 
          <p className="header-host-email">{hotel?.userData?.userEmail}</p>
        </button>
      </div>
      <div className="header-hotel-data-cont">
        <div className="header-title-cont">
          <h2 className="header-hotel-name">
            {hotel?.hotelData?.hotelTitle}
          </h2>
          <h1 className="header-hotel-price">${hotel?.hotelData?.hotelPrice}</h1>
        </div>
        <div className="header-rating-cont">
          <FaStar className="header-star-icon"/>
          <p className="header-rating-text">
            4.92 • 432 reviews • {hotel?.hotelData?.hotelLocation}
          </p>
        </div>
        <div className="header-host-data-cont">
          <img className='host-img' src='host.png'/>
          <div className="host-further-detail">
            <div className="host-img-head-cont">
              <p className='host-img-head'>Hosted by {hotel?.userData?.firstName} &nbsp;</p>
              <p className="host-join-date">Joined in August 2018</p>
              </div>
            <p className="hotel-rooms">8 guests · 2 bedrooms · 3 beds · 2 bathrooms</p>
            <div className="co-host-data-cont">
              <h5 className="co-host-label">
              Co Hosts
              </h5>
              <div className="co-host-card-cont">
                <div className="co-host-card">
                  <img src="host.png" className="co-host-img" />
                  <p className="co-host-name">Vijay</p>
                </div>
                <div className="co-host-card">
                  <img src="host.png" className="co-host-img" />
                  <p className="co-host-name">Reena</p>
                </div>
              </div>
            </div>
          </div>
          

        </div>
        <div className="header-host-gov-id-cont">
          <p className="host-id-label">
            Id Proof
          </p>
          <div className="host-id-cont">
            <p className="host-id" style={(showGovID)?{color:"black"}:{}}>{hotel?.userData?.userGovId}</p>
            <button className="host-id-view" onClick={()=>setShowGovID(!showGovID)}>
              {showGovID?"Hide":"View"}
            </button>
          </div>
          <div className="verify-cont">
            <LuCheckCircle className='host-verify-icon'/>
            <p className="host-verify-text">Identity verified</p>
          </div>
        </div>
        <p className="header-host-about">
          Hi i am {hotel?.userData?.firstName}! Peace and calm gateway for a day or two. Nice, clean and tidy place to stay.The pool was cleaned twice as requested. all amenities were...
        </p>
      </div>
    </div>
  )
}

export default HotelHeader