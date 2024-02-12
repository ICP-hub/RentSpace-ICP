import React from 'react'
import './reportDetail.css'

const ReportDetail = ({report}) => {
  return (
    <div className='report-detail-main-cont'>
      <div className="report-detail-title-cont">
        <h1 className="report-detail-title">Got a report</h1>
        <div className="report-detail-icon-round"/>
      </div>
      <h2 className="report-detail-heading">The address</h2>
      <div className="info-detail-card">
        <p className="detail-normal-text">Country/region</p>
        <p className="detail-normal-text">India</p>
      </div>
      <div className="info-detail-card">
        <p className="detail-normal-text">Street address</p>
        <p className="detail-normal-text">Ring Road,sectoe6</p>
      </div>
      <div className="info-detail-card">
        <p className="detail-normal-text">Apt, suite, bldg (optinal)</p>
        <p className="detail-normal-text"></p>
      </div>
      <div className="info-detail-card">
        <p className="detail-normal-text">City</p>
        <p className="detail-normal-text">Pune</p>
      </div>
      <div className="info-detail-card">
        <p className="detail-normal-text">Country</p>
        <p className="detail-normal-text">India</p>
      </div>
      <div className="info-detail-card">
        <p className="detail-normal-text">Postcode</p>
        <p className="detail-normal-text">852110</p>
      </div>
      <div className="concern-reason-cont">
        <h2 className="concern-reason-label">The Concern</h2>
        <h2 className="concern-reason-text">Noise or party</h2>
      </div>
      <h2 className="report-detail-heading">User’s suggestion</h2>
      <p className="user-suggestion-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente expedita repellendus quisquam rem molestias, necessitatibus doloremque autem omnis facilis error mollitia. Eius veniam debitis dignissimos!
      </p>
      <h2 className="report-detail-heading">User contact details</h2>
      <p className="user-detail-card">{report?.name}</p>
      <p className="user-detail-card">Email</p>
    </div>
  )
}

export default ReportDetail