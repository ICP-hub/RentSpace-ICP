import React from 'react'
import { FaUser } from "react-icons/fa";
import { RiHotelLine } from "react-icons/ri";

const InfoCards = ({label,count}) => {
  return (
    <div className='info-card'>
        <div className='info-card-icon-cont'>
            {
              label=="Users"?
              <FaUser className='info-card-icon'/>
              :
              <RiHotelLine className='info-card-icon'/>
            }
        </div>
        <div className="info-card-text-cont">
            <p className='info-card-label'>Registered {label}</p>
            <p className='info-card-number'>{count}</p>
        </div>
    </div>
  )
}

export default InfoCards