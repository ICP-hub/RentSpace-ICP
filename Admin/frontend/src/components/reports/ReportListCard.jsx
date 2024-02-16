import React from 'react'

const ReportListCard = ({report,showReportDetail,reportDetail}) => {
  return (
    <div 
        className='report-list-card' 
        onClick={()=>showReportDetail(report)}
    >
      <div className="report-profile-circle"/>
      <p className={reportDetail?.name==report.name?"report-list-card-sender-selected":"report-list-card-sender"}>
        {report.name}&nbsp;
        <p className='report-list-card-text'>reports a problem..</p>
      </p>
    </div>
  )
}

export default ReportListCard