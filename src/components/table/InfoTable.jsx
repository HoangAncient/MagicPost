import React from "react";
import "../../assets/css/InfoTable.min.css";

function InfoTable(props) {
  return (
    <div className="table-row">
      <div className="title">{props.title}</div>
      <div className="data">
        <span>{props.data}</span>
      </div>
    </div>
  );
}

export default InfoTable;
