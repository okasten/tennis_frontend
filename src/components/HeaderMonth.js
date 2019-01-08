import React from "react";
import { Link } from "react-router-dom";
import "./headerMonth.scss";

const headerMonth = props => (
  <header className="month-header">
    <div className="row">
      <Link to={"/" + props.previousMonth.slug}>
        {" "}
        LAST MONTH
        <i className="fas fa-chevron-circle-left" />
      </Link>
    </div>
    <div className="row">
      <h1>{props.currentMonth.name}</h1>
    </div>
    <div className="row">
      <Link to={"/" + props.nextMonth.slug}>
        {" "}
        NEXT MONTH
        <i className="fas fa-chevron-circle-right" />
      </Link>
    </div>
  </header>
);

export default headerMonth;
