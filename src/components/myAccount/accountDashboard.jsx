import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { api } from "../config";
import { MyContext } from "../myProvider";

function AccountDashboard() {
  const context = useContext(MyContext);
  //context.state.accounts.newsletter.toString()
  const [newsletterStatus, setNewsletterStatus] = useState("Retriving...");
  const [newsletterButton, setNewsletterButton] = useState([]);
  const [passwordError, setPasswordError] = useState([]);
  const [passwordError2, setPasswordError2] = useState([]);
  const [bool, setBool] = useState(false);
  const [passHidden, setPassHidden] = useState(
    `.my-account .pass-hidden{display:none;}`
  );

  useEffect(() => {
    newsletterHelper(context.state.accounts.newsletter);
  }, [context.state.accounts.newsletter]);

  function newsletterHelper(state) {
    if (state) {
      setNewsletterStatus("Subscribed");
      const html = (
        <button
          class="unsubscribe"
          onClick={() => {
            changeSubscribeStatus(false);
          }}
        >
          Unsubscirbe
        </button>
      );
      setNewsletterButton(html);
    } else {
      setNewsletterStatus("Unsubscribed");
      const html = (
        <button
          class="subscribe"
          onClick={() => {
            changeSubscribeStatus(true);
          }}
        >
          Subscribe
        </button>
      );
      setNewsletterButton(html);
    }
  }
  function changeSubscribeStatus(newStatus) {
    newsletterHelper(newStatus);
    context.changeNewsletterStatus(newStatus);

    newStatus
      ? context.alert("Subscribed to newsletter.", "SUCCESS")
      : context.alert("Unsubscribed to newsletter", "WARNING");
  }

  function validate() {
    const oldPwd = document.getElementById("old-pwd").value.trim();
    const newPwd = document.getElementById("new-pwd").value;
    const rePwd = document.getElementById("re-pwd").value;

    var err;
    if (oldPwd === "") {
      err = <label style={{ color: "red" }}>Current password is empty!</label>;
      setPasswordError(err);
      return false;
    } else {
      setPasswordError([]);
    }

    if (newPwd.length < 6 || newPwd.length > 20) {
      err = (
        <label style={{ color: "red" }}>
          Password should have 6-20characters!
        </label>
      );
      setPasswordError2(err);
      return false;
    } else {
      setPasswordError2([]);
    }

    if (newPwd !== rePwd) {
      err = (
        <label style={{ color: "red" }}>
          New and re-password didn't match!
        </label>
      );
      setPasswordError2(err);
      return false;
    } else {
      setPasswordError2([]);
    }

    if (newPwd === oldPwd) {
      err = (
        <label style={{ color: "red" }}>
          Current and new password are same!
        </label>
      );
      setPasswordError2(err);
      return false;
    } else {
      setPasswordError2([]);
      return true;
    }
  }

  function changePasswordBtn() {
    //Either expand or update
    if (bool === false) {
      setPassHidden(`.my-account .pass-hidden{display:flex}`);
      setBool(true);
      return;
    }

    const validateStatus = validate();
    if (validateStatus) {
      //console.log("Lets change pwd");
      changePass();
    } else {
      const err = <label style={{ color: "red" }}>Validation failed!</label>;
      setPasswordError2(err);
    }
  }

  function changePass() {
    const oldPwd = document.getElementById("old-pwd").value;
    const newPwd = document.getElementById("new-pwd").value;

    axios
      .post(`${api}/accounts/update-password`, {
        _id: Cookies.get("id"),
        oldPwd,
        newPwd,
      })
      .then((res) => {
        //console.log(res.data.status);
        if (res.data.status === "failed") {
          const err = (
            <label style={{ color: "red" }}>
              Wrong current password entered!
            </label>
          );
          setPasswordError(err);
        } else {
          context.alert("Password changed successfully!", "SUCCESS");
          setPassHidden(`.my-account .pass-hidden{display:none;}`);
          setBool(false);
          clearInputs();
        }
      });
  }

  function clearInputs() {
    document.getElementById("old-pwd").value = "";
    document.getElementById("new-pwd").value = "";
    document.getElementById("re-pwd").value = "";
  }
  return (
    <React.Fragment>
      <div className="col-flex">
        <div className="container col-flex">
          <div className="hdr">CONTACT INFORMATION</div>
          <label style={{ color: "grey" }}>{context.state.accounts.name}</label>
          <label style={{ color: "grey" }}>
            {context.state.accounts.email}
          </label>

          <div className="pass-hidden col-flex">
            <label class="lbl">Current Password:</label>
            <input
              id="old-pwd"
              type="password"
              class="pwd"
              onChange={validate}
            ></input>
            {passwordError}
            <label class="lbl">New Password:</label>
            <input
              id="new-pwd"
              type="password"
              class="pwd"
              onChange={validate}
            ></input>
            <label class="lbl">Retype New Password:</label>
            <input
              id="re-pwd"
              type="password"
              class="pwd"
              onChange={validate}
            ></input>
            {passwordError2}
          </div>
          <div className="row-flex">
            <button class="black" onClick={changePasswordBtn}>
              Change Password
            </button>
          </div>
        </div>

        <div className="container col-flex">
          <div className="hdr">
            NEWSLETTER:{" "}
            <label class="grey-font">
              {newsletterStatus}
              <br></br>
              <label>{newsletterButton}</label>
              {/* Using it in header to fix something, don't mind me XD */}
            </label>
          </div>
        </div>
        <style>{passHidden}</style>
      </div>
    </React.Fragment>
  );
}

export default AccountDashboard;
