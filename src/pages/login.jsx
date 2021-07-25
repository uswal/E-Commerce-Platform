import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { MyContext } from "../components/myProvider";
import GoogleLogin from "react-google-login";
import sleep from "../components/sleep";
import "./css/login.css";

const opp = `#navbar .login-register{background-color: rgba(0, 0, 0, 0.5);}#navbar .login-register .container{opacity:1}`;
const cll = `#navbar .login-register{background-color: rgba(0, 0, 0, 0);}#navbar .login-register .container{opacity:0}`;

function LoginRegister() {
  const context = useContext(MyContext);
  const [op, setOp] = useState("");
  const [locationKeys, setLocationKeys] = useState([]);
  const history = useHistory();

  function responseGoogle(response) {
    console.log(response);
  }

  function responseFacebook(response) {
    console.log(response);
  }

  async function animateOp() {
    await sleep(10);
    setOp(opp);
  }

  useEffect(() => {
    animateOp();
  }, []);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);

          // Handle forward event
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);
          //Handle backward event
          closeMe();
        }
      }
    });
  }, [locationKeys]);

  async function closeMe() {
    setOp(cll);
    await sleep(410);
    context.accountCrossHandler();
  }

  return (
    <div class="login-register">
      <div class="container col-flex">
        <label class="cross">
          <button
            onClick={async () => {
              setOp(cll);
              await sleep(410);
              context.accountCrossHandler();
            }}
          >
            X
          </button>
        </label>
        <label class="hdr">REGISTERED CUSTOMERS</label>
        <label class="hdr-caption">
          If you have an account, sign in with your email address.
        </label>
        <form className="col-flex">
          <label class="hdr-input">Email Address*</label>
          <input type="text" id="email" autoComplete="off"></input>
          <label class="err" id="email-error">
            {context.state.emailError}
          </label>
          <label class="hdr-input" id="password-lbl">
            Password*
          </label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            onFocus={() => {
              document.getElementById("password-lbl").scrollIntoView();
            }}
          ></input>
          <label class="err" id="password-error">
            {context.state.passwordError}
          </label>

          <div class="row-flex">
            {/* <GoogleLogin
              clientId="716481269872-5q6c15f7blj49897iukod75msc1r90ar.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            /> */}
          </div>
          <div class="roww">
            <div
              class="sign-in-options"
              id="sign-in"
              onClick={() => {
                context.validate();
              }}
            >
              Sign In
            </div>
            <Link
              class="sign-in-options register"
              to="/register"
              onClick={() => {
                context.accountCrossHandler();
              }}
            >
              Register
            </Link>
            <div
              onClick={() => {
                context.forgotPasswordPopup();
              }}
              class="sign-in-options"
              id="forgot-password"
            >
              Forgot Your Password?
            </div>
          </div>
        </form>
      </div>
      <style>{op}</style>
    </div>
  );
}

export default LoginRegister;
