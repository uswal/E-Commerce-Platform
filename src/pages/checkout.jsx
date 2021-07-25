import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

import PaymentMethod from "../components/paymentMethod";
import { api } from "../components/config";
import "./css/checkout.css";
import { allCountryList } from "../components/allCountryList";
import currencyConverter, {
  CurrencyConverterInt,
} from "../components/currencyConverter";
import FLC from "../components/firstLetterCapital";

const remove = "#navbar .secondary{display:none}";

function Shipping(props) {
  const [fnError, setFnError] = useState("");
  const [saError, setSaError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [zipError, setZipError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validate = () => {
    const fn = document.getElementById("fn").value.trim();
    const ln = document.getElementById("ln").value.trim();
    const sa1 = document.getElementById("sa-1").value.trim();
    const sa2 = document.getElementById("sa-2").value.trim();
    const sa3 = document.getElementById("sa-3").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const zip = document.getElementById("zip").value.trim();
    const country = document.getElementById("country").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (fn === "") {
      setFnError("First name can't be empty!");
      return;
    } else setFnError("");

    if (sa1 + sa2 + sa3 === "") {
      setSaError("Shipping address can't be empty");
      return;
    } else setSaError("");

    if (city === "") {
      setCityError("City can't be empty!");
      return;
    } else setCityError("");

    if (state === "") {
      setStateError("State can't be empty!");
      return;
    } else setStateError("");

    if (zip === "") {
      setZipError("Zip can't be empty!");
      return;
    } else setZipError("");

    if (phone.length !== 10) {
      setPhoneError("Phone number has to be of exactly 10 digits.");
      return;
    } else setPhoneError("");

    const info = {
      name: `${fn} ${ln}`,
      sa1: sa1,
      sa2: sa2,
      sa3: sa3,
      city: city,
      state: state,
      zip: zip,
      country: country,
      phone: phone,
    };

    country === "India"
      ? props.shippingHandler(0)
      : props.shippingHandler(1500);

    props.infoHandler(info);
  };

  useEffect(() => {
    const currency = Cookies.get("currency");
    const elem = document.getElementById("country");
    switch (currency) {
      case "INR":
        elem.value = "India";
        break;
      case "GBP":
        elem.value = "Germany";
        break;
      case "USD":
        elem.value = "United States of America";
        break;
      case "AED":
        elem.value = "United Arab Erimates";
        break;
      default:
        elem.value = "India";
    }
  }, []);

  return (
    <div class="checkout">
      <div class="col col-1 col-flex">
        <label class="big-hdr">Shipping Details</label>
        <div class="col-flex">
          <label class="small-hdr">
            First Name<label style={{ color: "red" }}>*</label>
          </label>
          <input id="fn" type="text" placeholder="First Name"></input>
          <label class="err">{fnError}</label>
        </div>
        <div class="col-flex">
          <label class="small-hdr">Last Name</label>
          <input id="ln" type="text" placeholder="Last Name"></input>
        </div>
        <div class="col-flex">
          <label class="small-hdr">
            Street Address<label style={{ color: "red" }}>*</label>
          </label>
          <input
            id="sa-1"
            type="text"
            placeHolder="House No., Building"
          ></input>
          <input id="sa-2" type="text" placeHolder="Street"></input>
          <input id="sa-3" type="text" placeHolder="Area"></input>
          <label class="err">{saError}</label>
        </div>
        <div class="col-flex">
          <label class="small-hdr">
            City<label style={{ color: "red" }}>*</label>
          </label>
          <input id="city" type="text"></input>
          <label class="err">{cityError}</label>
        </div>
        <div class="col-flex">
          <label class="small-hdr">
            State/Province<label style={{ color: "red" }}>*</label>
          </label>
          <input id="state" type="text"></input>
          <label class="err">{stateError}</label>
        </div>
        <div class="col-flex">
          <label class="small-hdr">
            Zip/Postal Code<label style={{ color: "red" }}>*</label>
          </label>
          <input id="zip" class="number" type="number"></input>
          <label class="err">{zipError}</label>
        </div>
        <div class="col-flex">
          <label class="small-hdr">
            Country<label style={{ color: "red" }}>*</label>
          </label>
          {allCountryList}
        </div>
        <div class="col-flex">
          <label class="small-hdr">
            Phone Number<label style={{ color: "red" }}>*</label>
          </label>
          <input id="phone" class="number" type="number"></input>
          <label class="err">{phoneError}</label>
        </div>

        <button class="black-btn" onClick={validate}>
          Next
        </button>
      </div>
    </div>
  );
}

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: [],
      userId: [],

      cart: "",
      itemsList: [],
      subtotal: 0,
      shipFee: "Pending",
      tax: 0,
      orderIncTax: 0,
      orderExcTax: 0,

      intTotal: 0, //TODO - Make it 0 in the end

      shippingDetailsContainer: [],
      redirect: null,
    };
  }

  redirectToOrders = async () => {
    //TODO
    this.setState({ redirect: "/my-account/my-orders" });
    await this.sleep(500);
    window.location.reload(false); //Bad practice ikr, but to reduce some bugs and yeah this will waste the point of creating resetCart() and so many other functions in MyProvider
  };

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  infoHandler = (obj) => {
    const html = (
      <div class="details col-flex">
        <label class="hdr-smalll">Shipping Address</label>
        <label class="hdr-small">{obj.name}</label>
        <label class="hdr-small">{obj.sa1}</label>
        <label class="hdr-small">{obj.sa2}</label>
        <label class="hdr-small">{obj.sa3}</label>
        <label class="hdr-small">City: {obj.city}</label>
        <label class="hdr-small">State: {obj.state}</label>
        <label class="hdr-small">Zip: {obj.zip}</label>
        <label class="hdr-small">Country: {obj.country}</label>
        <label class="hdr-small">Phone: {obj.phone}</label>
        <button
          class="black-btn"
          onClick={() => {
            this.setState({
              shippingDetailsContainer: "",
              phase: (
                <Shipping
                  shippingHandler={this.shippingHandler}
                  infoHandler={this.infoHandler}
                />
              ),
            });
            const elem = document.getElementById("checkout-helper");
            elem.innerHTML = "";
          }}
        >
          Change
        </button>
      </div>
    );
    this.setState({ shippingDetailsContainer: html });
    this.paymentHandler(obj);
  };

  shippingHandler = (value) => {
    const newOrderExcTax = this.state.intTotal + value;
    this.setState({
      shipFee: currencyConverter(value),
      orderExcTax: currencyConverter(newOrderExcTax),
    });
  };

  paymentHandler = (obj) => {
    const info = {
      userId: this.state.userId,
      name: obj.name,
      phone: obj.phone,
      currency: Cookies.get("currency"),
      amount: CurrencyConverterInt(this.state.intTotal),
      shippingAddress: obj,
    };
    this.setState({
      phase: (
        <PaymentMethod
          info={info}
          fun={() => {
            this.redirectToOrders();
          }}
        />
      ),
    });
  };

  componentDidMount() {
    const id = Cookies.get("id");

    if (id === undefined) {
      //Redirect to login and [refresh mayb]
    }

    this.setState({ userId: id });

    axios.post(`${api}/accounts/get-cart`, { id: id }).then((res) => {
      this.listGenerator(res.data.cart);
    });

    this.setState({
      phase: (
        <Shipping
          shippingHandler={this.shippingHandler}
          infoHandler={this.infoHandler}
        />
      ),
    });
  }

  listGenerator = (obj) => {
    var cartSubtotal = 0,
      //shippingFee = 0,
      tax = 0,
      OTET = 0;

    const taxPercent = 12;
    console.log(obj);
    var html = [];
    for (let i = 0; i < obj.item_id.length; i++) {
      if (obj.item_id[i] === null || obj.item_quantity[i] < 1) {
        continue;
      }

      cartSubtotal += obj.item_price[i] * obj.item_quantity[i];
      const taxOnThisItem = (obj.item_price[i] * taxPercent) / 100;
      tax += taxOnThisItem * obj.item_quantity[i];
      const excludeTaxOnThisItem = obj.item_price[i] - taxOnThisItem;
      OTET += excludeTaxOnThisItem * obj.item_quantity[i];

      const temp = (
        <div class="container row-flex">
          <img src={obj.item_img[i]}></img>
          <div class="right col-flex">
            <label>{FLC(obj.item_name[i])}</label>
            <label class="hdr-small grey-font">
              Quantity:{" "}
              <label style={{ fontWeight: "bold" }}>
                {obj.item_quantity[i]}
              </label>
            </label>
            <label class="hdr-small grey-font" style={{ fontWeight: "bold" }}>
              {currencyConverter(obj.item_price[i])}
            </label>
          </div>
        </div>
      );

      html.push(temp);
    }

    this.setState({
      itemsList: html,
      subtotal: currencyConverter(cartSubtotal),
      //shipFee: currencyConverter(shippingFee),
      tax: currencyConverter(tax),
      orderIncTax: currencyConverter(cartSubtotal),
      orderExcTax: currencyConverter(OTET),
      intTotal: cartSubtotal,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div class="checkout-m">
        <div class="progress-bar">
          <div class="progress">
            <p>Shipping</p>
          </div>
          <label class="right-hdr">Review & Payment</label>
        </div>

        <div class="column">{this.state.phase}</div>

        <div class="column">
          <div class="order-summary col-flex">
            <div class="misc col-flex">
              <label class="hdr">ORDER SUMMARY</label>
              <label class="hdr-smalll">
                Cart Total:{" "}
                <label class="float-right">{this.state.subtotal}</label>
              </label>
              <label class="hdr-blue hdr-smalll">
                Order Total:{" "}
                <label class="float-right">{this.state.orderExcTax}</label>
              </label>
              <label class="hdr-smalll">
                Tax (GST): <label class="float-right">{this.state.tax}</label>
              </label>
              <label class="hdr-smalll">
                Shipping Fee:{" "}
                <label class="float-right">{this.state.shipFee}</label>
              </label>

              <label class="hdr-blue hdr-smalll">
                Sub Total:{" "}
                <label class="float-right">{this.state.orderIncTax}</label>
              </label>
            </div>

            <div class="cart-items">{this.state.itemsList}</div>

            {this.state.shippingDetailsContainer}
          </div>
        </div>

        <style id="checkout-helper"></style>
        <style>{remove}</style>
      </div>
    );
  }
}

export default Checkout;
