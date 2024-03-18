import React from 'react'
import {Bar} from 'react-chartjs-2'
import './charts.css'

const dataComplete=require('./data.json')

const Barchart = ({label,data}) => {
    // const grad=createGr
    const months=dataComplete[0]?.months
  return (
    <>
        
        <Bar 
            data={{
                labels:months,
                datasets:[{
                    label:label,
                    data:data,
                    backgroundColor:(context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                        gradient.addColorStop(0, "#4B1FD5");
                        gradient.addColorStop(1, "#8E0FF0");
                        return gradient;
                      },
                    borderRadius:new Array(12).fill(50) 
                }]
                
            }}
            options={{
                maintainAspectRatio:false
            }}
            className='bar-chart'
            
            />
    </>
  )
}

export default Barchart