import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../components/myProvider";
import { api } from "../components/config";

import "./css/footer.css";

const fsocials = (
  <div class="fsocials">
    <a href="https://www.facebook.com/sootistudio/" target="_blank">
      <svg
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
        stroke="black"
        class="icons fill fnl"
        stroke-width="0"
      >
        {" "}
        <path d="M17.525,9H14V7c0-1.032,0.084-1.682,1.563-1.682h1.868v-3.18C16.522,2.044,15.608,1.998,14.693,2 C11.98,2,10,3.657,10,6.699V9H7v4l3-0.001V22h4v-9.003l3.066-0.001L17.525,9z" />
      </svg>
    </a>
    <a href="https://www.linkedin.com/company/sootistudio/" target="_blank">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="black"
        stroke="black"
        stroke-width="0"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icons fill fnl"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    </a>

    <a href="https://www.instagram.com/sootistudio/" target="_blank">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icons no-fill fnl"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    </a>

    <a
      href="https://api.whatsapp.com/send?phone=+91%2070115%2007044&text=Hello!%20Sooti%20Studio,"
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        version="1.1"
        class="icons fill fnl"
      >
        <path
          d="M19.078 4.93A9.912 9.912 0 0 0 12.012 2c-5.508 0-9.989 4.48-9.989 9.984a9.911 9.911 0 0 0 1.332 4.993l-1.417 5.175 5.296-1.39a10.003 10.003 0 0 0 4.774 1.218h.004c5.504 0 9.984-4.48 9.988-9.988a9.918 9.918 0 0 0-2.922-7.062zm-2.18 10.625c-.207.582-1.226 1.144-1.683 1.183-.461.043-.89.207-2.996-.62-2.54-1-4.14-3.602-4.266-3.77-.125-.164-1.016-1.352-1.016-2.578 0-1.23.645-1.832.872-2.082.23-.25.5-.313.668-.313.164 0 .332 0 .476.008.18.004.375.015.563.43.222.492.707 1.726.77 1.851.062.125.105.274.019.438-.082.168-.125.27-.246.418-.125.144-.262.324-.375.433-.125.125-.254.262-.11.512.145.25.645 1.066 1.387 1.726.953.852 1.758 1.114 2.008 1.239s.394.105.539-.063c.148-.164.625-.726.793-.976.164-.25.332-.207.558-.125.23.082 1.457.687 1.707.812s.414.188.477.29c.062.105.062.605-.145 1.187z"
          id="surface1"
        />
      </svg>
    </a>
  </div>
);

function Footer() {
  const context = useContext(MyContext);

  function sub() {
    const elem = document.getElementById("news");
    const email = elem.value.trim().toLowerCase();
    if (email.length < 1 || email.indexOf("@") === -1) {
      context.alert("Invalid email!", "FAIL");
      return;
    }

    axios.post(`${api}/newsletter/sub`, { email }).then((res) => {
      //console.log(res.data);
    });
    context.alert("Successfully subscribed to the newsletter!", "SUCCESS");

    elem.value = "";
  }

  return (
    <div class="footer-ctr">
      <div class="container ftc">
        <div className="card-d">
          <label className="hdr">KEEP UPTO DATE:</label>
          <input
            className="news"
            id="news"
            type="text"
            placeholder="youremail@mail.com"
          ></input>
          <button className="btn btn-black-hollow" onClick={sub}>
            SUBSCRIBE
          </button>
        </div>

        <div className="ft-r">
          <div class="col col-1">
            <div className="ul">
              <label className="hdr">INFORMATION</label>

              <div className="li">
                {/* <li><Link to="/">Discounts + Rewards</Link></li> */}
              </div>
              <div className="li">
                <Link to="/shipping">Shipping</Link>
              </div>
              <div className="li">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </div>
              <div className="li">
                <Link to="/payment-returns">Payment & Returns</Link>
              </div>

              <div className="li">
                <Link to="/terms-conditions">Terms & Conditions</Link>
              </div>
            </div>
          </div>
          <div className="col col-2">
            <div className="ul">
              <label className="hdr">CUSTOMER CARE</label>

              <div className="li">
                Business hours: <br></br>Mon - Sat: 10am to 7pm (IST)<br></br>{" "}
                Email: contact@sootistudio.com<br></br>
                Whatsapp at &nbsp;
                <a
                  href="
            https://api.whatsapp.com/send?phone=+91%2070115%2007044"
                  target="_blank"
                >
                  +917011507044
                </a>
              </div>

              <div className="li">
                <img className="card" src="/assets/images/cards.jfif"></img>
              </div>
            </div>
          </div>
          <div className="col col-3">
            <div className="ul">
              <label className="hdr">FOLLOW US</label>
              {fsocials}
              <div className="li">
                <img className="card" src="/assets/images/cards.jfif"></img>
              </div>
            </div>
          </div>
        </div>
        <div className="ft-r ft-r2">
          <div className="ft-r-h">
            <div className="left">
              Copyright © 2021 Sooti Studio | Made with &#10084; in India
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
