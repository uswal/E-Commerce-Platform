import React, { Component } from "react";
import Cookies from "js-cookie";
import CC from "./currencyConverter";
import "./css/upNavBar.css";

const cc = CC(15000);
const msg = `Free Shipping in India on Prepaid orders only & Free Shipping Worldwide on Orders above ${cc}/-`;

class UpNavBar extends Component {
  componentDidMount() {
    var currency = Cookies.get("currency");

    if (currency === undefined) {
      Cookies.set("currency", "INR", { expires: 360 });
      currency = "INR";
    }

    document.getElementById("currency-upnav").value = currency;
  }

  updateCur() {
    const currency = document.getElementById("currency-upnav").value;
    Cookies.set("currency", currency, { expires: 360 });
    document.getElementById("currency-upnav").value = currency;
    window.location.reload(false); //Bad practice, Yeah yeah
  }
  render() {
    return (
      <div id="upnav">
        <ul>
          <li class="upnav-left">
            <a
              href="
            https://api.whatsapp.com/send?phone=+91%2070115%2007044"
              target="_blank"
            >
              +91 7011507044
            </a>
            <a href="mailto:contact@sootistudio.com">contact@sootistudio.com</a>
          </li>

          <li id="upnav-middle">
            <p>{msg}</p>
          </li>

          <li>
            <select
              id="currency-upnav"
              class="upnav-right"
              onChange={this.updateCur}
            >
              <option value="INR">INR</option>
              <option value="GBP">GBP</option>
              <option value="USD">USD</option>
              <option value="AED">AED</option>
            </select>
          </li>
        </ul>
      </div>
    );
  }
}

export default UpNavBar;
