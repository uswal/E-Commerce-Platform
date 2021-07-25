import React, { useState, useEffect, useContext } from "react";

import "./css/alert.css";

import { MyContext } from "./myProvider";

function Alert() {
  const context = useContext(MyContext);
  return (
    <div class="alert" style={context.state.alertStyle}>
      <div className="container row-flex">
        <label className="style">{context.state.alertMessage}</label>
        <button
          class="cross"
          style={context.state.alertStyle}
          onClick={() => {
            context.alertClose();
          }}
        >
          X
        </button>
        {/* </span> */}
      </div>
      <style id="alert-animation-helper"></style>
    </div>
  );
}

export default Alert;
