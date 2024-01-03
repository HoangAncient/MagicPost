import "../../assets/css/AdminNavbar.min.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
// import { DarkModeContext } from "../../context/darkModeContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PopUp from "../logOutForm/PopUp";

const AdminNav = (props) => {
  //   const { dispatch } = useContext(DarkModeContext);
  useEffect(() => {
    const dropdown = document.querySelector(".dropdown");
    const dropdownContent = document.querySelector(".dropdown-content");
    dropdown.addEventListener("click", () => {
      dropdownContent.classList.toggle("active");
    });
  }, []);
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
  return (
    <div className="adminNavbar">
      <PopUp trigger={popup} setTrigger={setPopup} action="Log out"></PopUp>
      <div className="wrapper">
        <div class="toggle-button">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          {props.role === "employeeExchange" ? (
            <div className="item">
              <AddIcon className="icon" />
              <Link to="/addpackage">Add package</Link>
            </div>
          ) : (
            ""
          )}

          <div className="item english">
            <LanguageOutlinedIcon className="icon" />
            <p>English</p>
          </div>
          <div className="item darkmode">
            <DarkModeOutlinedIcon
              className="icon"
              //   onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item fullscreen">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item notification">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter ">1</div>
          </div>
          <div className="item message">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item dropdown">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
            <div class="dropdown-content">
              <Link>Profile</Link>
              <Link onClick={handleLogout}>Log out</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
