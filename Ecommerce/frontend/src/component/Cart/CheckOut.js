import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import MetaData from "../layout/MetaData";
import "./CheckOut.css";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckOutSteps from "../Cart/CheckOutSteps";
import { useHistory } from "react-router-dom";
const CheckOut = () => {
  const history = useHistory();
  // const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  //  useState
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [contactNo, setcontactNo] = useState(shippingInfo.contactNo);

  const dispatch = useDispatch();
  const alert = useAlert();
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (contactNo.length < 10 || contactNo.length > 10) {
      alert.error("Contact no. must be of 10 digits long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, contactNo })
    );
    history.push("/order/confirm");
  };
  return (
    <Fragment>
      <MetaData title="Checkout Details" />
      <CheckOutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            encType="multipart/form-data"
            className="shippingForm"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="text"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => {
                  setPinCode(e.target.value);
                }}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="text"
                placeholder="Contact"
                required
                value={contactNo}
                onChange={(e) => {
                  setcontactNo(e.target.value);
                }}
              />
            </div>

            <div>
              <PublicIcon />
              <select
                required
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  required
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckOut;
