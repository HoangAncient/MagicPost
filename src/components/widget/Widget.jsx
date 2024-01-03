import "../../assets/css/Widget.min.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useEffect, useState } from "react";
import axiosInstance from "../../pages/axios/Instance";
const Widget = (props) => {
  const [widgetData, setWidgetData] = useState({
    totalGoodsReceived: {
      title: "QUANTITY OF GOODS RECEIVED",
      amount: 0, // Initial amount set to 0
      link: "See all delivery history",
      increase: 0.0001,
      icon: (
        <Inventory2OutlinedIcon
          className="icon"
          style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            width: "30px",
            height: "30px"
          }}
        />
      ),
    },
    totalGoodsSent: {
      title: "QUANTITY OF GOODS SENT",
      amount: 0, // Initial amount set to 0
      link: "See all delivery history",
      increase: 0.0001,
      icon: (
        <Inventory2OutlinedIcon
          className="icon"
          style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            width: "30px",
            height: "30px"
          }}
        />
      ),
    },
    totalEmployee: {
      title: "QUANTITY OF EMPLOYEE",
        isMoney: false,
        amount: 0,
        increase: 1,
        link: "View all employee info",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              width: "30px",
              height: "30px"
            }}
          />
        ),
    },
    totalGathering: {
      title: "QUANTITY OF GATHERING",
      increase: 0,
      amount: 0,
      link: "View all gather",
      icon: (
        <ShoppingCartOutlinedIcon
          className="icon"
          style={{
            backgroundColor: "rgba(218, 165, 32, 0.2)",
            color: "goldenrod",
            width: "30px",
            height: "30px"
          }}
        />
      ),
    },
    totalExchange: {
      title: "QUANTITY OF EXCHANGE",
        isMoney: false,
        amount: 0,
        increase: 0,
        link: "View all exchange",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
              width: "40px",
              height: "40px"
            }}
          />
        ),
    }
    // Add other cases as needed
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (props.role === "managerExchange" ||props.role === "managerGather" ) {
      try {
        const response = await axiosInstance.get('/api/auth/current_packages');
        const response2 = await axiosInstance.get('/api/auth/manageEmployee');
        const count= response2.data.employee_count// Replace with the sent amount from your backend
        const receivedAmount = response.data.incomingCount; // Replace with the received amount from your backend
        const sentAmount = response.data.outgoingCount; // Replace with the sent amount from your backend
  
        setWidgetData({
          ...widgetData,
          totalEmployee: {
            ...widgetData.totalEmployee,
            amount: count,
          },
          totalGoodsReceived: {
            ...widgetData.totalGoodsReceived,
            amount: receivedAmount,
          },
          totalGoodsSent: {
            ...widgetData.totalGoodsSent,
            amount: sentAmount,
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else if (props.role === "ceo") {
      try {
        const response = await axiosInstance.get('/api/auth/get_all_points');
        const response2 = await axiosInstance.get('/api/auth/manageEmployee');
        const count= response2.data.employee_count// Replace with the sent amount from your backend
        const gatherAmount = response.data.gatheringCount; // Replace with the received amount from your backend
        const exchangeAmount = response.data.exchangeCount; // Replace with the sent amount from your backend
  
        setWidgetData({
          ...widgetData,
          totalEmployee: {
            ...widgetData.totalEmployee,
            amount: count,
          },
          totalExchange: {
            ...widgetData.totalExchange,
            amount: exchangeAmount,
          },
          totalGathering: {
            ...widgetData.totalGathering,
            amount: gatherAmount,
          }
          
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
  };

  useEffect(() => {
    fetchEmployee();  
  }, []);

  const fetchEmployee = async () => {
    try {
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  let data;

  //temporary

  switch (props.type) {
    case "totalGoodsReceived":
      data = widgetData.totalGoodsReceived;
      break;
      case "totalGoodsSent":
        data = widgetData.totalGoodsSent;
        break;
    case "gathering":
      data = widgetData.totalGathering;
      break;
    case "employee":
      data = widgetData.totalEmployee;
      break;
    case "exchange":
      data = widgetData.totalExchange;
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
