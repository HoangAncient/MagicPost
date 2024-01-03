import approvedImg from "../../assets/image/approved.png";
import logo from "../../assets/image/magicPost.png";
import QRCode from "react-qr-code";
import "../../assets/css/ViewReceipt.min.css";
import { useEffect, useState } from "react";
import axiosInstance from "../axios/Instance";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import SmallTable from "../../components/table/SmallTable";
function TrackingParcelInformation() {
  // {
  //     senderInfo,
  //     recipientInfo,
  //     typeOfParcel,
  //     parcelValues,
  //     additionalService,
  //     senderInstruction,
  //     notes,
  //     deliveryFare,
  //     weight,
  //     recipientFare,
  //     parcelId,
  //     paths,
  //     delivered,
  //   }
  const packageId = useParams();
  const getData = async (parcelId) => {
    try {
      const response = await axiosInstance.get(
        "/api/auth/get_package_by_id/" + parcelId
      );
      console.log(response);
      // console.log(response.data.package.sender);
      setSenderInfo({
        name: response.data.package.sender,
        address: response.data.package.senderAddress,
        phoneNum: response.data.package.senderPhone,
        customerId: 1245,
      });
      setRecipientInfo({
        name: response.data.package.receiver,
        address: response.data.package.receiverAddress,
        phoneNum: response.data.package.receiverPhone,
        customerId: 1245,
      });

      setWeight((weight) => [
        {
          title: "Actual volume",
          value: response.data.package.weight,
        },
        {
          title: "Conversion volume",
          value: 0,
        },
      ]);

      setParcelId(parcelId);
      setSendDate(response.data.package.sendDate);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData(packageId.packageId);
  }, []);

  const [senderInfo, setSenderInfo] = useState({});
  const [recipientInfo, setRecipientInfo] = useState({});
  const [parcelId, setParcelId] = useState();
  const [sendDate, setSendDate] = useState();
  const [deliveryFare, setDeliveryFare] = useState([
    {
      index: "a",
      title: "Main fee:",
      value: "9500",
    },
    {
      index: "b",
      title: "Surcharge:",
      value: "1900",
    },
    {
      index: "c",
      title: "GTGT:",
      value: "0",
    },
    {
      index: "d",
      title: "Total fee (including VAT)",
      value: "12312",
    },
    {
      index: "e",
      title: "Other revenue",
      value: "0",
    },
    {
      index: "f",
      title: "Total revenue",
      value: "12312",
    },
  ]);
  const typeOfParcel = {
    isDocument: true,
  };

  const senderInstruction = {
    returnImmediately: false,
    callRecipient: false,
    cancel: false,
    returnBefore: false,
    returnAfterStorage: false,
  };

  const recipientFare = [
    {
      title: "COD",
      value: "0",
    },
    {
      title: "Other revenue",
      value: "0",
    },
    {
      title: "Total revenue",
      value: "0",
    },
  ];
  const [weight, setWeight] = useState([]);

  return (
    <div className="main">
      <div className="parcelInfoContainer">
        <div className="header-information">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="qr-code">
            <QRCode
              size={64}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`http://localhost:3000/tracking?parcelId=${parcelId}`}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
        <div className="parcel-information">
          <div className="boxes">
            <div className="box">
              <div className="header">
                <p>
                  <b>1. Sender's full name and address</b>
                </p>
                <p>{senderInfo.name}</p>
                <p>{senderInfo.address}</p>
              </div>
              <div>
                <p>
                  <b>Phone:</b> {senderInfo.phoneNum}
                </p>
                <div className="code">
                  <p>
                    <b>Customer Code:</b> {senderInfo.customerId}
                  </p>
                  <p>
                    <b>Postal Code:</b> 1000
                  </p>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="header">
                <p>
                  <b>2. Recipient's full name and address</b>
                </p>
                <p>{recipientInfo.name}</p>
                <p>{recipientInfo.address}</p>
              </div>
              <div>
                <p>
                  <b>Parcel Code:</b> {parcelId}
                </p>
                <div className="code">
                  <p>
                    <b>Phone:</b> {recipientInfo.phoneNum}
                  </p>
                  <p>
                    <b>Postal Code:</b> 1000
                  </p>
                </div>
              </div>
            </div>
            <div className="box-3">
              <div className="section">
                <div className="parcel-type">
                  <p>
                    <b>3. Type of goods sent</b>
                  </p>

                  <div className="check-box-group">
                    <label className="checkBox">
                      <input type="checkbox" className="input" disabled />
                      <span className="custom-checkbox"></span>
                      Document
                    </label>
                    <label className="checkBox">
                      <input
                        type="checkbox"
                        className="input"
                        checked={!typeOfParcel.isDocument}
                        disabled
                      />
                      <span className="custom-checkbox"></span>
                      Goods
                    </label>
                  </div>
                </div>
                <div className="parcel-value">
                  <p>
                    <b>4. Content of postal value</b>
                  </p>
                  <div className="smallTable">
                    <SmallTable />
                  </div>
                </div>
                <div className="parcel-service">
                  <p>
                    <b>5. Additional / Special services</b>
                  </p>
                  <div className="dottedLine" />
                  <div className="dottedLine" />
                  <p style={{ marginTop: "12px" }}>EMSC/PPA contact code</p>
                </div>
              </div>
              <div className="sender-instruction">
                <p>
                  <b>6. Sender's instructions when items cannot be delivered</b>
                </p>
                <div className="check-box-group">
                  <label className="checkBox">
                    <input
                      type="checkbox"
                      className="input"
                      checked={senderInstruction.returnImmediately}
                      disabled
                    />
                    <span className="custom-checkbox"></span>
                    Refund immediately
                  </label>
                  <label className="checkBox">
                    <input
                      type="checkbox"
                      className="input"
                      checked={senderInstruction.callRecipient}
                      disabled
                    />
                    <span className="custom-checkbox"></span>
                    Call the recipient
                  </label>
                  <label className="checkBox">
                    <input
                      type="checkbox"
                      className="input"
                      checked={senderInstruction.cancel}
                      disabled
                    />
                    <span className="custom-checkbox"></span>
                    Cancel
                  </label>
                </div>
                <div className="check-box-group">
                  <label className="checkBox">
                    <input
                      type="checkbox"
                      className="input"
                      checked={senderInstruction.returnBefore}
                      disabled
                    />
                    <span className="custom-checkbox"></span>
                    Return before date
                  </label>
                  <label className="checkBox">
                    <input
                      type="checkbox"
                      className="input"
                      checked={senderInstruction.returnAfterStorage}
                      disabled
                    />
                    <span className="custom-checkbox"></span>
                    Refund when storage period expires
                  </label>
                </div>
              </div>
              <div className="section">
                <div className="sender-commiment">
                  <p>
                    <b>7. Sender's commiment</b>
                  </p>
                  <p>
                    I acknowledge and accept the terms on the reverse side of
                    the shipping receipt. I confirm that the parcel does not
                    contain prohibited or hazardous items. In case of
                    non-delivery, please refer to section 6 for instructions,
                    and I undertake to cover the return shipping costs.
                  </p>
                </div>
                <div className="sender-signature">
                  <div className="date">
                    <p>
                      <b>8. Sending date and time</b>
                    </p>
                    <p>
                      <Moment format="DD-MM-YYYY">{sendDate}</Moment>
                    </p>
                  </div>
                  <div className="signature">
                    <p>
                      <b>Sender's signature</b>
                    </p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-4">
              <div className="section">
                <div className="left">
                  <div className="delivery-fare">
                    <p>
                      <b>9. Delivery fare:</b>
                    </p>
                    {deliveryFare.map((fare, index) => {
                      return (
                        <div className="fare" key={index}>
                          <p>
                            {fare.index}. {fare.title}
                          </p>
                          <p>{fare.value}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="recipient-fare">
                    <p>
                      <b>11. Recipient's fare:</b>
                    </p>
                    {recipientFare.map((fare, index) => {
                      return (
                        <div className="fare" key={index}>
                          <p>{fare.title}</p>
                          <p>{fare.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="right">
                  <div className="parcel-weight">
                    <p>
                      <b>10. Weight (kg):</b>
                    </p>
                    {weight.map((weight, index) => {
                      return (
                        <div className="weight" key={index}>
                          <p>{weight.title}</p>
                          <p>{weight.value}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="parcel-note">
                    <p>
                      <b>12. Operational notes</b>
                    </p>
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="parcel-approval">
                  <p>
                    <b>13. The post office accepted</b>
                  </p>
                  <p>The recipient's signature</p>
                  <img
                    src={approvedImg}
                    alt="confirmation seal"
                    width="110px"
                  />
                </div>
                <div className="delivery-date">
                  <p>
                    <b>
                      14. Time of receipt
                      <br /> ....h...../...../...../20.....
                    </b>
                    <br />
                  </p>
                  <p style={{ textAlign: "center" }}>
                    Recipient/ Reciever authorized to recieve
                    <br />
                    (Sign, write full name)
                  </p>
                  <div style={{ height: "50px" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "50px" }}> x</div>
    </div>
  );
}

export default TrackingParcelInformation;
