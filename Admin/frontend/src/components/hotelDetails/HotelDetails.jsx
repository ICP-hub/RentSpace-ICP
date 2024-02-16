import React from 'react'
import './hotelDetails.css'
import HotelFeatureCard from './HotelFeatureCard'
import HotelHeader from './hotelHeader/HotelHeader'
import { BsDoorOpen } from "react-icons/bs";
import { PiMedalMilitaryThin } from "react-icons/pi";
import { LuKeyRound } from "react-icons/lu";
import { HiOutlineClipboardList } from "react-icons/hi";

const features=[
    {
        title:'Self check-in',
        icon:<BsDoorOpen className='hotel-feature-icon'/>,
        text:'You can check in with the building staff.'
    },
    {
        title:'Lucy is a Superhost',
        icon:<PiMedalMilitaryThin className='hotel-feature-icon'/>,
        text:'Superhosts are experienced, highly rated Hosts.'
    },
    {
        title:'Great check-in experience',
        icon:<LuKeyRound className='hotel-feature-icon'/>,
        text:'95% of recent guests gave the check-in process a 5-star rating.'
    },
    {
        title:'Free cancellation for 48 hours',
        icon:<HiOutlineClipboardList className='hotel-feature-icon'/>,
        text:''
    }
]

const HotelDetails = () => {
  return (
    <div className='hotel-detail-main'>
        <HotelHeader/>
        <div className='hotel-detail-desc-cont'>
            <h3 className='hotel-desc-heading'>Description</h3>
            <p className='hotel-desc-text'>
                A sleepover in Villa surrounded by agricultural land, where you get to enjoy Wakeup calls from birds, Lotus breaks the surface of the water and blooms untouched by the mud with sunshine. Water in the pool is blue as the sky and clean as a crystal. Sit out the perfect spot to lounge, read, or chat with a cup of tea or other favorite beverage by your side in the garden. Also, Host your own party!!!!
            </p>
        </div>
        <div className="hotel-feature-card-cont">
            {
                features.map((item,index)=>(
                    <HotelFeatureCard item={item} key={index}/>
                ))
            }
        </div>
    </div>
  )
}

export default HotelDetails