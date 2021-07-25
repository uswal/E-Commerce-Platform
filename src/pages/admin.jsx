import React, { useState } from "react";
import Dashboard from "./dashboard";

import "./css/admin.css";

const USERNAME = "admin";
const PASSWORD = "Sunshine@1003";

function Admin() {
  const askCreds = (
    <div id="admin-container">
      <div class="admin-container">
        <div class="admin-login">
          <input type="text" id="username" placeholder="Enter username"></input>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
          ></input>
          <div class="btn" onClick={adminLogin}>
            Login
          </div>
        </div>
      </div>
      <style>{`#navbar,#upnav,.footer-ctr{
      display:none;
    }
    .sticky + .content {
      padding-top: 0;
    }
    `}</style>
    </div>
  );

  const [state, setState] = useState(askCreds);

  function adminLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === USERNAME && password === PASSWORD) setState(<Dashboard />);
    else alert("Login failed!");
  }

  return <React.Fragment>{state}</React.Fragment>;
}

export default Admin;
