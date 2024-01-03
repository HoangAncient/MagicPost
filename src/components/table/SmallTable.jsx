import React from "react";
import "../../assets/css/SmallTable.min.css";

function SmallTable() {
  return (
    <div className="smtable">
      <div className="row header">
        <div className="col">Content</div>
        <div className="col">Quantity</div>
        <div className="col">Cost</div>
        <div className="col">Attached document</div>
      </div>
      <div className="row body">
        <div className="col">Total</div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
      </div>
    </div>
  );
}

export default SmallTable;
