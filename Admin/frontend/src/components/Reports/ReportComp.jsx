import React from "react";
import "./ReportComp.css";
import IssuesBar from "./IssuesBar";

const ReportComp = () => {
    return (
        <div className="notifications">
        <div className="title">You have <span> Notifications Today</span></div>
        <IssuesBar />
        </div>
    );  
}
export default ReportComp;