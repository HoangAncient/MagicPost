import React from "react";
import Navbar from "../components/navbar/CustomerNavbar";
import "../assets/css/ServiceInfo.min.css";

function ServiceInfo() {
  return (
    <div className="ServiceInfo">
      <Navbar />
      <div className="title">
        <p>Xem chi tiết</p>
      </div>
      <div className="info">
        <div className="button">Bảng giá giao nhận</div>
        <div className="button">Khu vực phục vụ</div>
        <div className="button">Quy định vận chuyển</div>
      </div>
    </div>
  );
}

export default ServiceInfo;
