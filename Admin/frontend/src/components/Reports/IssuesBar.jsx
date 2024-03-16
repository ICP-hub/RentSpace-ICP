import React from "react";
import "./ReportComp.css"

const IssuesBar = () => {
    return (
    <>
    <div className="notification">
        <img src="pager.jpg" alt="Error"/>
         <div className="chat"> 
            <div className="message">ABCDEEF reports a problem..</div>
            <div className="time">1 Hr ago</div>
        </div>
    </div>
</>
    );  
}
export default IssuesBar;
