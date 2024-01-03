import React, { useState, useEffect } from "react";
import axiosInstance from "../axios/Instance";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import Navbar from "../../components/navbar/SearchNavbar";
import "../../assets/css/PackageDetail.min.css";
import InfoTable from "../../components/table/InfoTable";
import Loader from "../../components/loader/Loader";
import { WidthFull } from "@mui/icons-material";
const PackageDetail = () => {
  const { packageId } = useParams(); // A hook to access the package id from the route params
  const [packageData, setPackageData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const color = "#f26522";
  function changeNodeBg(
    ex1 = color,
    g1 = color,
    g2 = color,
    ex2 = color,
    receive = color
  ) {
    const exchange1 = document.querySelector(".exchange1");
    const gathering1 = document.querySelector(".gathering1");
    const gathering2 = document.querySelector(".gathering2");
    const exchange2 = document.querySelector(".exchange2");
    const recipient = document.querySelector(".recipient");
    exchange1.style.backgroundColor = ex1;
    gathering1.style.backgroundColor = g1;
    gathering2.style.backgroundColor = g2;
    exchange2.style.backgroundColor = ex2;
    recipient.style.backgroundColor = receive;
  }

  function changeRouteBg(r1 = color, r2 = color, r3 = color, r4 = color) {
    const route1 = document.querySelector(".route1");
    const route2 = document.querySelector(".route2");
    const route3 = document.querySelector(".route3");
    const route4 = document.querySelector(".route4");

    route1.style.backgroundColor = r1;
    route2.style.backgroundColor = r2;
    route3.style.backgroundColor = r3;
    route4.style.backgroundColor = r4;
  }

  const getPackageById = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/api/auth/get_package_by_id/${packageId}`
      );
      setPackageData(response.data.package); // Set the retrieved package data
      setIsLoading(false);
      setError(null); // Reset error state
    } catch (error) {
      console.log(error);
      setError("Package not found"); // Set error if package not found
      setPackageData(null); // Reset packageData
    }
  };

  // Call the getPackageById function when the component mounts
  useEffect(() => {
    getPackageById();
  }, []);
  useEffect(() => {
    if (packageId !== "0") {
      const exchange1 = document.querySelector(".exchange1");
      const gathering1 = document.querySelector(".gathering1");
      const gathering2 = document.querySelector(".gathering2");
      const exchange2 = document.querySelector(".exchange2");
      const recipient = document.querySelector(".recipient");
      if (
        packageData.nextStep === "exchange1" &&
        packageData.status === "success"
      ) {
        changeNodeBg();
        changeRouteBg();
        exchange1.firstChild.innerHTML =
          "The package is currently in " +
          packageData.exchange1_name +
          " exchange";
      }
      if (
        packageData.nextStep === "gathering1" &&
        packageData.status === "shipping"
      ) {
        changeNodeBg("gray");
        changeRouteBg();
        gathering1.firstChild.innerHTML =
          "The package is being send to " +
          packageData.gathering1_name +
          " gathering";
      }
      if (
        packageData.nextStep === "gathering1" &&
        packageData.status === "success"
      ) {
        changeNodeBg("gray");
        changeRouteBg("gray");
        gathering1.firstChild.innerHTML =
          "The package has arrived at " +
          packageData.gathering1_name +
          " gathering";
      }
      if (
        packageData.nextStep === "gathering2" &&
        packageData.status === "shipping"
      ) {
        changeNodeBg("gray", "gray");
        changeRouteBg("gray");
        gathering2.firstChild.innerHTML =
          "The package is being send to " +
          packageData.gathering2_name +
          " gathering";
      }
      if (
        packageData.nextStep === "gathering2" &&
        packageData.status === "success"
      ) {
        changeNodeBg("gray", "gray");
        changeRouteBg("gray", "gray");
        gathering2.firstChild.innerHTML =
          "The package has arrived at " +
          packageData.gathering2_name +
          " gathering";
      }
      if (
        packageData.nextStep === "exchange2" &&
        packageData.status === "shipping"
      ) {
        changeNodeBg("gray", "gray", "gray");
        changeRouteBg("gray", "gray");
        exchange2.firstChild.innerHTML =
          "The package is being send to " +
          packageData.exchange2_name +
          " exchange";
      }
      if (
        packageData.nextStep === "exchange2" &&
        packageData.status === "success"
      ) {
        changeNodeBg("gray", "gray", "gray");
        changeRouteBg("gray", "gray", "gray");
        exchange2.firstChild.innerHTML =
          "The package has arrived at " +
          packageData.exchange2_name +
          " exchange";
      }
      if (
        packageData.nextStep === "receiver" &&
        packageData.status === "shipping"
      ) {
        changeNodeBg("gray", "gray", "gray", "gray");
        changeRouteBg("gray", "gray", "gray");
        recipient.firstChild.innerHTML =
          "The package is being send to the recipient";
      }
      if (packageData.status === "received") {
        changeNodeBg("gray", "gray", "gray", "gray");
        changeRouteBg("gray", "gray", "gray", "gray");
        recipient.firstChild.innerHTML =
          "The package has succesfully arrive at the recipient";
      }
    }
  }, [packageData, packageId]);
  const formatID = (id) => {
    if (id && id.length > 10) {
      const firstTenCharacters = id.substring(0, 10);
      return firstTenCharacters + "****";
    }
    return id;
  };
  const formatPN = (pn) => {
    //phone number
    if (pn) {
      const firstSixCharacters = pn.substring(0, 6);
      return firstSixCharacters + "****";
    }
    return pn;
  };
  const extractLastTwoWords = (address) => {
    if (address) {
      const words = address.split(",").map((word) => word.trim()); // Split the address by commas and trim each word
      if (words.length >= 2) {
        return words.slice(-2).join(", "); // Join the last two words with a comma
      }
    }
    return address;
  };
  return (
    <div style={{ maxWidth: "100%" }}>
      <Navbar />
      {packageId === "0" ? (
        <div className="noId">
          <div className="title">Chưa nhập mã đơn hàng</div>
          <div className="desc">Vui lòng nhập mã đơn hàng để kiểm tra</div>
        </div>
      ) : isLoading ? (
        <Loader />
      ) : packageData ? (
        <div className="packageDetail">
          <div className="main">
            <div className="part packageInfo">
              <p className="header">Package Information</p>
              <div className="bodyTable">
                <InfoTable title="ID: " data={formatID(packageData._id)} />
                <InfoTable title="Name: " data={packageData.name} />
                <InfoTable
                  title="Send date: "
                  data={
                    <Moment format="DD-MM-YYYY">{packageData.sendDate}</Moment>
                  }
                />
                <InfoTable title="Status: " data={packageData.status} />
                <InfoTable title="Weight: " data={packageData.weight} />
              </div>
              {/* Display other package details as needed */}
            </div>
            <div className="part senderInfo">
              <p className="header">Sender Information</p>
              <div className="bodyTable">
                <InfoTable title="Sender name: " data={packageData.sender} />
                <InfoTable
                  title="Sender phone: "
                  data={formatPN(packageData.senderPhone)}
                />
                <InfoTable
                  title="Sender address: "
                  data={extractLastTwoWords(packageData.senderAddress)}
                />
              </div>
            </div>
            <div className="part recipientInfo">
              <p className="header">Recipient Information</p>
              <div className="bodyTable">
                <InfoTable
                  title="Receiver name: "
                  data={packageData.receiver}
                />
                <InfoTable
                  title="Receiver phone: "
                  data={formatPN(packageData.receiverPhone)}
                />
                <InfoTable
                  title="Receiver address: "
                  data={extractLastTwoWords(packageData.receiverAddress)}
                />
              </div>
            </div>
          </div>
          <div className="packageStatus">
            <div className="route">
              <div className="route1"></div>
              <div className="route2"></div>
              <div className="route3"></div>
              <div className="route4"></div>
            </div>
            <div className="dotContainer">
              <div className="dot exchange1">
                <div className="info">{"Exchange 1"}</div>
              </div>
              <div className="dot gathering1">
                <div className="info">{"Gather 1"}</div>
              </div>
              <div className="dot gathering2">
                <div className="info">{"Gather 2"}</div>
              </div>
              <div className="dot exchange2">
                <div className="info">{"Exchange 2"}</div>
              </div>
              <div className="dot recipient">
                <div className="info">Recipient</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="noId">
          <div className="title">Mã đơn hàng không đúng</div>
          <div className="desc">
            Chúng tôi không tìm thấy mã đơn hàng của bạn trong hệ thống. Vui
            lòng kiểm tra lại mã đơn hàng.
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetail;
