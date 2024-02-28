import React, { useState } from 'react'
import './bookingChart.css'
import Barchart from '../../../charts/Barchart'
import { Chart as ChartJS } from 'chart.js/auto'
import { booking } from '../../../declarations/booking'



const dataComplete = require('../../../charts/data.json')

function createArray(bookingData) {
    let arr = [];
    arr.push(Number(bookingData.dec));
    arr.push(Number(bookingData.nov));
    arr.push(Number(bookingData.oct));
    arr.push(Number(bookingData.sep));
    arr.push(Number(bookingData.aug));
    arr.push(Number(bookingData.july));
    arr.push(Number(bookingData.june));
    arr.push(Number(bookingData.may));
    arr.push(Number(bookingData.april));
    arr.push(Number(bookingData.march));
    arr.push(Number(bookingData.feb));
    arr.push(Number(bookingData.jan));
    return arr;
}
const BookingChart = ({ bookingData }) => {

    const [year, setYear] = useState(2024)
    console.log(bookingData);
    // console.log(createArray(bookingData));
    return (
        <div className='booking-chart-sec'>
            <div className='booking-chart-header'>
                <div className='booking-chart-text-cont'>
                    <h4 className='booking-chart-count-label'>
                        Total Bookings
                    </h4>
                    <h3 className='booking-chart-count'>1135</h3>
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
                <Barchart label={"Bookings"} data={createArray(bookingData)} />
            </div>
        </div>
    )
}

export default BookingChart