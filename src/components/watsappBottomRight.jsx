import React, { Component } from "react";
import "./css/watsappBottomRight.css";

class WatsappBottomRight extends Component {
  state = {};
  render() {
    return (
      <div>
        <div class="watsapp">
          <a
            href="
            https://api.whatsapp.com/send?phone=+91%2070115%2007044"
            target="_blank"
          >
            <img
              class="watsapplogo"
              src="/assets/icons/watsapp_black.svg"
            ></img>
          </a>
        </div>
      </div>
    );
  }
}

export default WatsappBottomRight;
