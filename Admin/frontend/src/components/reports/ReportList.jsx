import React from 'react'
import ReportListCard from './ReportListCard'

const ReportList = ({reports,showReportDetail,reportDetail}) => {
  return (
    <div className='report-list-cont'>
      <p className='report-num-text'>
          You have &nbsp; <p style={{color:"#4B1FD5"}}>2 Notifications Today</p>
      </p>
      <div className="report-card-cont">
        {
          reports.map((report,index)=>(
            <ReportListCard key={index} report={report} showReportDetail={showReportDetail} reportDetail={reportDetail}/>
          ))
        }
      </div>
    </div>
  )
}

export default ReportList