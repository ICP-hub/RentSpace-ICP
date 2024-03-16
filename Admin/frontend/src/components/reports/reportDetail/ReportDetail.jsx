import React from 'react'
import './reportDetail.css'
import { IoClose } from "react-icons/io5";
import { IoCheckmarkDone } from "react-icons/io5";

const ReportDetail = ({report}) => {
  return (
    <div className='report-detail-main-cont'>
      <div className="report-detail-title-cont">
        <h1 className="report-detail-title">Got a report</h1>
        <div className="report-detail-icon-round">
          {
            report?.reportData?.resolved==false?
            <IoClose className='resolve-icon-indicator' style={{color:'red'}}/>
            :
            <IoCheckmarkDone className='resolve-icon-indicator' style={{color:'green'}}/>
          }
        </div>
      </div>
      <h2 className="report-detail-heading">The address</h2>
      <div className="info-detail-card">
        <p className="detail-normal-text">Country/region</p>
        <p className="detail-normal-text">{report?.reportData?.address?.region}</p>
      </div>
      <div className="info-detail-card">
        <p className="detail-normal-text">Street address</p>
        <p className="detail-normal-text">{report?.reportData?.address?.streetAddress}</p>
      </div>
      <div className="info-detail-card">
        <p className="detail-normal-text">Apt, suite, bldg (optinal)</p>
        <p className="detail-normal-text">{report?.reportData?.address?.building}</p>
      </div>
      <div className="info-detail-card">
        <p className="detail-normal-text">City</p>
        <p className="detail-normal-text">{report?.reportData?.address?.city}</p>
      </div>
      <div className="info-detail-card">
        <p className="detail-normal-text">Country</p>
        <p className="detail-normal-text">{report?.reportData?.address?.country}</p>
      </div>
      <div className="info-detail-card">
        <p className="detail-normal-text">Postcode</p>
        <p className="detail-normal-text">{report?.reportData?.address?.postalCode}</p>
      </div>
      <div className="concern-reason-cont">
        <h2 className="concern-reason-label">The Concern</h2>
        <h2 className="concern-reason-text">{report?.reportData?.reason}</h2>
      </div>
      <h2 className="report-detail-heading">User’s suggestion</h2>
      <p className="user-suggestion-text">
        {report?.reportData?.messageToAdmin}
      </p>
      <h2 className="report-detail-heading">User contact details</h2>
      <p className="user-detail-card">{report?.userData?.firstName+" "+report?.userData?.lastName}</p>
      <p className="user-detail-card">{report?.userData?.userEmail}</p>
    </div>
  )
}

export default ReportDetail