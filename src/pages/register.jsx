import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import Banner from "../components/banner";
import { api } from "../components/config";
import "./css/register.css";

function validate() {
  var firstName = document.getElementById("first-name");
  var lastName = document.getElementById("last-name");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("confirm-password");

  var newsletter = document.getElementById("newsletter").checked;
  var tc = document.getElementById("tc").checked;

  var name = firstName.value + " " + lastName.value;

  if (firstName.value.trim() == "") {
    firstName.focus();
    document.getElementById("name-error").innerHTML =
      "First name can't be empty";
    return;
  } else document.getElementById("name-error").innerHTML = "";

  if (lastName.value.trim() == "") {
    lastName.focus();
    document.getElementById("name-error").innerHTML =
      "Last name can't be empty";
    return;
  } else document.getElementById("name-error").innerHTML = "";

  if (email.value.trim().length < 7) {
    email.focus();
    document.getElementById("email-error").innerHTML = "Invalid email!";
    return;
  } else document.getElementById("email-error").innerHTML = "";

  if (password.value.trim() == "") {
    document.getElementById("password-error").innerHTML =
      "Password can't be empty!";
    password.focus();
    return;
  } else {
    document.getElementById("password-error").innerHTML = "";
  }

  if (password.value.trim().length < 7) {
    document.getElementById("password-error").innerHTML =
      "Password is too small";
    password.focus();
    return;
  } else {
    document.getElementById("password-error").innerHTML = "";
  }

  if (confirmPassword.value.trim() == "") {
    document.getElementById("confirm-password-error").innerHTML =
      "Confirm password can't be empty!";
    password.focus();
    return;
  } else {
    document.getElementById("password-error").innerHTML = "";
  }

  if (password.value != confirmPassword.value) {
    password.value = "";
    confirmPassword.value = "";
    password.focus();
    document.getElementById("confirm-password-error").innerHTML =
      "Confirm password didn't match!";
    return;
  } else {
    document.getElementById("password-error").innerHTML = "";
  }

  if (!tc) {
    document.getElementById("TC-error").innerHTML =
      "You need to accept T&C to proceed!";
    document.getElementById("tc").focus();
    return;
  } else document.getElementById("TC-error").innerHTML = "";

  register(name, email.value, password.value, newsletter);
}

function register(name, email, password, newsletter) {
  axios
    .post(`${api}/accounts/register`, {
      email: email,
      password: password,
      name: name,
      newsletter: newsletter,
    })
    .then((res) => {
      res = res.data;
      if (res.status == "pass") {
        Cookies.set("id", res.id);
        window.location.reload(false);
      }
      //Bad practice, Yeah yeah running low on time
      else {
        if (res.errorCode === 11000)
          document.getElementById("email-error").innerHTML =
            "Email already exist!";
      }
    });
}

const removeAccount = `#navbar .secondary{display:none}`;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
  }
  componentDidMount() {
    const id = Cookies.get("id");
    if (id !== undefined) this.setState({ redirect: "/" });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        {/* <UpNavBar />
        <NavBar /> */}
        <style>{removeAccount}</style>
        <Banner title="Register" />
        <div class="content rr">
          <div class="rrr">
            <label class="hdr">PERSONAL INFORMATION</label>
            <div class="roww">
              <input
                class="coll"
                type="text"
                placeholder="First Name"
                id="first-name"
                autoComplete="off"
              ></input>
              <input
                class="coll coll-b"
                type="text"
                placeholder="Last Name"
                id="last-name"
                autoComplete="off"
              ></input>
            </div>
            <label class="err" id="name-error"></label>
            <div class="cb1">
              <input type="checkbox" id="newsletter"></input>
              <label class="caption">Sign up for Newsletter</label>
            </div>
            <label class="hdr hdr2">SIGN-IN INFORMATION</label>
            <label class="caption">
              Email<label class="red">*</label>
            </label>
            <input type="text" id="email" autoComplete="off"></input>
            <label class="err" id="email-error"></label>
            <label class="caption">
              Password<label class="red">*</label>
            </label>
            <input type="password" id="password" autoComplete="off"></input>
            <label class="err" id="password-error"></label>
            <label class="caption">
              Confirm Password<label class="red">*</label>
            </label>
            <input
              type="password"
              id="confirm-password"
              autoComplete="off"
            ></input>
            <label class="err" id="confirm-password-error"></label>
            <div class="tcc">
              <input type="checkbox" id="tc"></input>
              <label class="caption tc">
                By using this form you agree with the storage and handling of
                your data by this website.
              </label>
            </div>
            <label class="err" id="TC-error"></label>
            <div class="roww">
              <div class="coll back">
                <p>Back</p>
              </div>
              <div class="coll create" onClick={validate}>
                <p>Create an account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
