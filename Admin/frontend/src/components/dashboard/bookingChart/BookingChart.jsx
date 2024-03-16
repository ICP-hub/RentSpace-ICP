import React, { useState } from 'react'
import './bookingChart.css'
import Barchart from '../../../charts/Barchart'
import { Chart as ChartJS } from 'chart.js/auto'
import { booking } from '../../../declarations/booking'



const dataComplete = require('../../../charts/data.json')


const BookingChart = ({ bookingData,bookingCount,year,setYear }) => {


    return (
        <div className='booking-chart-sec'>
            <div className='booking-chart-header'>
                <div className='booking-chart-text-cont'>
                    <h4 className='booking-chart-count-label'>
                        Total Bookings
                    </h4>
                    <h3 className='booking-chart-count'>{bookingCount}</h3>
                </div>
                <div className="booking-chart-timeline">
                    <h4 className='booking-chart-year'>Year - {year}</h4>
                    <select className='booking-chart-year-select' onChange={(e) => setYear(e.target.value)}>
                        <option className='booking-chart-year-option' value={2024}>2024</option>
                        <option className='booking-chart-year-option' value={2025}>2025</option>
                        <option className='booking-chart-year-option' value={2026}>2026</option>
                        <option className='booking-chart-year-option' value={2027}>2027</option>
                        <option className='booking-chart-year-option' value={2028}>2028</option>
                    </select>
                </div>
            </div>
            <div className='booking-chart'>
                <Barchart label={"Bookings"} data={bookingData} />
            </div>
        </div>
    )
}

export default BookingChart