import React, { useState, useEffect } from "react";
import axiosInstance from "../axios/Instance";
import { useNavigate } from "react-router-dom";
import EmployeeNavbar from "../../components/navbar/AdminNav";
import "../../assets/css/AddPackage.min.css";
const AddPackage = () => {
  const [name, setName] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [weight, setWeight] = useState("");

  const [exchange2Options, setExchange2Options] = useState([]);
  const [selectedExchange2, setSelectedExchange2] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch exchange2 options from the backend on component mount
    const fetchExchange2Options = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/get_all_exchange"); // Update with your endpoint
        setExchange2Options(response.data.exchanges); // Assuming the response contains an array of options
      } catch (error) {
        console.error("Error fetching exchange2 options:", error);
        // Handle error - show error message or take appropriate action
      }
    };

    fetchExchange2Options();
  }, []); // Empty dependency array to fetch data only on component mount
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/api/auth/add_package", {
        name,
        sendDate: new Date(),
        sender: sender,
        senderPhone: senderPhone,
        receiver: receiver,
        senderAddress: senderAddress,
        receiverPhone: receiverPhone,
        receiverAddress: receiverAddress,
        weight: weight,
        status: "shipping", // Default status
        nextStep: "gathering1", // Default next step,
        exchange2: selectedExchange2,
        // Include other fields as needed for the package creation
      });

      // console.log('Package added:', response.data);
      //console.log("id", response.data.newPackage._id);
      navigate("/viewReceipt/" + response.data.newPackage._id);

      // Optionally handle success, redirect, or show a success message
    } catch (error) {
      console.error("Error adding package:", error);
      // Handle error - show error message or take appropriate action
    }
  };

  return (
    <div>
      <EmployeeNavbar role="employeeExchange" />

      <div className="formContainer">
        <div className="form">
          {" "}
          <h2 className="formTitle">Add New Package</h2>
          <form onSubmit={handleSubmit}>
            {/* <div>
          <label>Send Date:</label>
          <input
            type="text"
            value={sendDate}
            onChange={(e) => setSendDate(e.target.value)}
          />
        </div> */}
            <div className="infoContainer">
              <div className="left">
                <div className="inputInfo">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="inputInfo">
                  <label>Sender name:</label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                  />
                </div>
                <div className="inputInfo">
                  <label>Sender phone:</label>
                  <input
                    type="tel" //use pattern
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                  />
                </div>
                <div className="inputInfo">
                  <label>Sender address:</label>
                  <input
                    type="text"
                    value={senderAddress}
                    onChange={(e) => setSenderAddress(e.target.value)}
                  />
                </div>
                <div className="inputInfo">
                  <label>Receiver name:</label>
                  <input
                    type="text"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                </div>
              </div>
              <div className="right">
                <div className="inputInfo">
                  <label>Receiver phone:</label>
                  <input
                    type="text"
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                  />
                </div>
                <div className="inputInfo">
                  <label>Receiver address:</label>
                  <input
                    type="text"
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.target.value)}
                  />
                </div>
                <div className="inputInfo">
                  <label>Weight:</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="inputInfo">
                  <label>Exchange2:</label>
                  <select
                    value={selectedExchange2}
                    onChange={(e) => setSelectedExchange2(e.target.value)}
                  >
                    <option value="">Select Exchange2</option>
                    {exchange2Options.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="btnContainer">
              <button type="submit">Add Package</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPackage;
