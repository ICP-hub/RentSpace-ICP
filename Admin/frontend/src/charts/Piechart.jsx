import React from 'react'
import {Doughnut, Pie} from 'react-chartjs-2'
import './charts.css'

const colors=["#E83AF6","#0057FF","#4B1FD5","#8A65FF","#993AE3","#CD8CFF","#E83AF6","#0057FF","#4B1FD5","#8A65FF","#993AE3","#CD8CFF"]
const dataComplete=require('./data.json')

const Piechart = ({data}) => {

    const months=dataComplete[0]?.months

  return (
    <Doughnut
        data={
            {
                datasets:[{
                    data:data,
                    backgroundColor:colors
                }],
                labels:months,
                
            }
        }
        options={{
            maintainAspectRatio:false,
            plugins:{
                legend:{
                    position:"left"
                }
            }
        }}
        />
  )
}

export default Piechart