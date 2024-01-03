import React from "react";
import "../../assets/css/PopUp.min.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../pages/axios/Instance";
const PopUp = (props) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const respone = await axiosInstance.get("/api/auth/logout");
      localStorage.setItem("token", "");
      props.setTrigger(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    props.setTrigger(false);
  }

  return props.trigger ? (
    <div id="myModal" class="modall">
      <div className="modal-content">
        <div>
          <span className="modalHeader">Confirm log out </span>{" "}
          <span
            className="close-btn close" onClick={handleClose}
            style={{ float: "right", marginTop: "-10px" }}
          >
            &times;
          </span>
        </div>
        <div className="modalText">
          <p>Do you want to log out</p>
        </div>

        <div>
          <div className="abtn cancel" onClick={handleClose}>
            Cancel
          </div>
          <div className="abtn logoutConfirm" onClick={handleClick}>
            Confirm
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopUp;
