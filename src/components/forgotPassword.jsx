import React, { useState, useContext } from "react";
import axios from "axios";
import { api } from "./config";
import "./css/middlePage.css";
import { MyContext } from "./myProvider";

function ForgotPassword() {
  const context = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  function validateInput() {
    if (email.length === 0) {
      setMessage("Email can't be empty");
      setColor("red");
    } else if (email.indexOf("@") === -1) {
      setMessage("Your email seems to be invalid.");
      setColor("red");
    } else {
      setMessage("");
      sendRequest();
    }
  }

  function sendRequest() {
    axios
      .post(`${api}/mail/generate-password-reset-link`, { email })
      .then((res) => {
        //console.log(res.data);
        if (res.data.status === "SUCCESS") {
          setMessage(res.data.message);
          setColor("green");
        } else {
          setMessage(res.data.message);
          setColor("red");
        }
      });
  }

  return (
    <div class="middle-pop forgot-pass">
      <div class="ct col-flex">
        <label
          className="cross"
          onClick={() => {
            context.accountCrossHandler();
          }}
        >
          x
        </label>
        <label className="hdr">Forgot Password</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value.trim());
          }}
          value={email}
          type="text"
          placeholder="Enter email!"
        ></input>
        <label className="err" style={{ marginBottom: "10px", color }}>
          {message}
        </label>
        <div className="row-flex">
          <button className="btn btn-blue" onClick={validateInput}>
            Send Reset Email
          </button>
          <button
            className="btn btn-black-hollow"
            onClick={() => {
              context.loginMode();
            }}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
