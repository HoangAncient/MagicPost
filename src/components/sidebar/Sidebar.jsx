import "../../assets/css/Sidebar.min.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import PopUp from "../logOutForm/PopUp";
// import { DarkModeContext } from "../../context/darkModeContext";
import axiosInstance from "../../pages/axios/Instance";
import { useEffect, useState } from "react";
import logo from "../../assets/image/magicPost.png";

const Sidebar = (props) => {
  //   const { dispatch } = useContext(DarkModeContext);

  const [popup, setPopup] = useState(false);
  const logout = async () => {
    try {
      setPopup(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    logout();
  };
  const [mainPath, setMainPath] = useState("");
  useEffect(() => {
    if (props.role === "ceo") {
      setMainPath(`/admin`);
    } else if (props.role === "manager_exchange") {
      setMainPath(`/managerExchange`);
    } else if (props.role === "manager_gather") {
      setMainPath(`/managerGather`);
    }
  }, [props, mainPath]);
  return (
    <div className="sidebar">
      <PopUp trigger={popup} setTrigger={setPopup} action="Log out"></PopUp>
      <div className="top">
        <Link to={mainPath} style={{ textDecoration: "none" }}>
          <span className="logo">
            <img src={logo} alt="" />
          </span>
        </Link>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>

          <Link to={mainPath} style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineOutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/gather" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Gather</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <Link to="/admin/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>

          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Log out</span>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
