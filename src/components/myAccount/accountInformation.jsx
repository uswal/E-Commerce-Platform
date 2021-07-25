import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import { api } from "../config";
import FLC from "../firstLetterCapital";

function AccountInformation(props) {
  // console.log(props);
  const [since, setSince] = useState("Retriving...");
  const [name, setName] = useState("Retriving...");
  const [newsletter, setNewsletter] = useState("Retriving...");
  const [phone, setPhone] = useState("Retriving...");
  const [email, setEmail] = useState("Retriving...");

  useEffect(() => {
    init();
  }, []);

  function init() {
    axios
      .post(`${api}/accounts/get-account-information`, {
        _id: Cookies.get("id"),
      })
      .then((res) => {
        // console.log(res.data);
        setStates(res.data);
      });
  }

  function setStates(data) {
    const date = new Date(data.memberSince);
    const dateString = date.toDateString();
    setSince(dateString);

    setName(data.name);

    data.newsletter === true
      ? setNewsletter("Subscribed")
      : setNewsletter(
          <React.Fragment>
            Try{" "}
            <label
              onClick={() => {
                props.fun();
              }}
            >
              Subscribe
            </label>{" "}
            you’ll love it!
          </React.Fragment>
        );
    //setNewsletter(FLC(data.newsletter.toString()));

    data.phone[0] === null && data.phone[1] === null
      ? setPhone("Phone is currently undefined.")
      : setPhone(`${data.phone[0]} ${data.phone[1]}`);

    setEmail(data.email);
  }

  return (
    <div class="account-information col-flex">
      <div class="hdr">ACCOUNT INFORMATION</div>
      <label class="small-hdr">
        Member Since: <label class="grey-font">{since}</label>
      </label>
      <label class="small-hdr">
        Name: <label class="grey-font">{name}</label>
      </label>
      <label class="small-hdr">
        Subscribed to Newsletter?: <label class="grey-font">{newsletter}</label>
      </label>
      {/* <label class="small-hdr">
        Phone: <label class="grey-font">{phone}</label>
      </label> */}
      <label class="small-hdr">
        Email: <label class="grey-font">{email}</label>
      </label>
    </div>
  );
}

export default AccountInformation;
