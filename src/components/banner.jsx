import React, { Component } from "react";

import "./css/banner.css";

class Banner extends Component {
  state = {};
  render() {
    return (
      <div class="banner content">
        <div class="img">
          <p>{this.props.title}</p>
        </div>
      </div>
    );
  }
}

export default Banner;
