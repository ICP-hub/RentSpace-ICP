import React, { useState } from 'react'
import Piechart from '../../charts/Piechart'

const PiechartStats = ({year,setYear,label,data,count}) => {

  return (
    <div className='stats-pie-chart-sec'>
        <div className='stats-pie-chart-header'>
            <div className='stats-pie-chart-text-cont'>
                <h4 className='stats-pie-chart-count-label'>
                    Registered {label}
                </h4>
                <h4 className='stats-pie-chart-year'>Year - {year}</h4>
                <select className='stats-pie-chart-year-select' onChange={(e)=>setYear(e.target.value)}>
                    <option className='stats-pie-chart-year-option' value={2024}>2024</option>
                    <option className='stats-pie-chart-year-option' value={2025}>2025</option>
                    <option className='stats-pie-chart-year-option' value={2026}>2026</option>
                    <option className='stats-pie-chart-year-option' value={2027}>2027</option>
                    <option className='stats-pie-chart-year-option' value={2028}>2028</option>
                </select>
            </div>
        </div>
        <div className='stats-pie-chart'>
            {/* <Barchart label={"Bookings"} data={dataComplete[0]?.bookings}/> */}
            <Piechart data={data}/>
        </div>
    </div>
  )
}

export default PiechartStats