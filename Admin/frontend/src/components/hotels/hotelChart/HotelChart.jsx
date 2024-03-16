import React, { useState } from 'react'
import './hotelChart.css'
import Barchart from '../../../charts/Barchart'

const dataComplete=require('../../../charts/data.json')

const HotelChart = ({year,setYear,count,data}) => {
    
  return (
    <div className='hotel-chart-sec'>
        <div className='hotel-chart-header'>
            <div className='hotel-chart-text-cont'>
                <h4 className='hotel-chart-count-label'>
                    Total Hotels Registered
                </h4>
                <h3 className='hotel-chart-count'>{count}</h3>
            </div>
            <div className="hotel-chart-timeline">
                <h4 className='hotel-chart-year'>Year - {year}</h4>
                <select className='hotel-chart-year-select' onChange={(e)=>setYear(e.target.value)}>
                    <option className='hotel-chart-year-option' value={2024}>2024</option>
                    <option className='hotel-chart-year-option' value={2025}>2025</option>
                    <option className='hotel-chart-year-option' value={2026}>2026</option>
                    <option className='hotel-chart-year-option' value={2027}>2027</option>
                    <option className='hotel-chart-year-option' value={2028}>2028</option>
                </select>
            </div>
        </div>
        <div className='hotel-chart'>
            <Barchart label={"Hotels Registered"} data={data}/>
        </div>
    </div>
  )
}

export default HotelChart