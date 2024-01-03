import React, { useState, useEffect } from "react";
import axiosInstance from "../axios/Instance";
import { useParams, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import Navbar from "../../components/navbar/AdminNav";
import InfoTable from "../../components/table/InfoTable";
const PackageComponent = (props) => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [nextLocation, setNextLocation] = useState("");
  const [packageData, setPackageData] = useState(null);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");
  const getNextLocation = (location) => {
    if (location === "exchange1") {
      return "gathering1";
    } else if (location === "gathering1") {
      return "gathering2";
    } else if (location === "gathering2") {
      return "exchange2";
    } else {
      return "receiver";
    }
  };
  const getPackageById = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/auth/get_package_by_id/${packageId}`
      );
      setPackageData(response.data.package);
      setLocation(response.data.package.nextStep);
      setNextLocation(getNextLocation(response.data.package.nextStep));
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Package not found");
      setPackageData(null);
    }
  };

  useEffect(() => {
    getPackageById();
  }, []);
  useEffect(() => {
    if (props.role === "employee_gather") {
      setRole("/employeeGather");
    } else if (props.role === "employee_exchange") {
      setRole("/employeeExchange");
    }
  }, [props]);
  const updatePackageById = async () => {
    try {
      const update = await axiosInstance.post(
        `/api/auth/update_package_by_id`,
        {
          _id: packageId,
          nextStep: nextLocation,
          status: "shipping",
        }
      );
      navigate(role);
    } catch (error) {
      console.log(error);
      setError("Update fail");
    }
  };

  const handleSubmit = () => {
    updatePackageById();
  };

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
    <div>
      <Navbar role={role} />
      {error && <p>{error}</p>}
      {packageData && (
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
                <InfoTable
                  title="Current location: "
                  data={location + " : " + packageData[location]}
                />
                <InfoTable
                  title="To: "
                  data={nextLocation + " : " + packageData[nextLocation]}
                />
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
        </div>
      )}
      <div className="instruction">
        <p>
          If current location and previous location are correct, enter submit
        </p>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
//   return (
//     <div>
//       <Navbar role ={role}/>
//       {error && <p>{error}</p>}
//       {packageData && (
//         <div>
//           <h2>Package Details</h2>
//           <p>ID: {packageData._id}</p>
//           <p>Name: {packageData.name}</p>
//           <p>Sender name: {packageData.sender}</p>
//           <p>Sender phone: {packageData.senderPhone}</p>
//           <p>Receiver name: {packageData.receiver}</p>
//           <p>Receiver phone: {packageData.receiverPhone}</p>
//           <p>Send date: <Moment format="DD/MM/YYYY">{packageData.sendDate}</Moment></p>
//           <p>Status: {packageData.status}</p>
//           <p>Weight: {packageData.weight && packageData.weight['$numberDecimal']}</p>
//           {/* Display other package details as needed */}
//           <p>Current location: {location}: {packageData[location]} </p>
//           <p>To</p>
//           <p>{nextLocation}: {packageData[nextLocation]}</p>
//         </div>
//       )}
//       <div>
//         <p>If current location and next location are correct, enter submit</p>
//         <button onClick={handleSubmit}>
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

export default PackageComponent;
