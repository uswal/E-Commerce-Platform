import React, { Component } from "react";
import axios from "axios";

import { api } from "./config";

class Ip extends Component {
  componentDidMount() {
    // axios.get(`http://ip-api.com/json/`).then((res) => {
    //   //console.log(res.data);
    //   if (res.data.status === "success") {
    //     axios.post(`${api}/misc/add-location-to-db`, {
    //       country: res.data.country,
    //       region_name: res.data.regionName,
    //       city: res.data.city,
    //       ip: res.data.query,
    //     });
    //   }
    // });
  }
  render() {
    return <div></div>;
  }
}

export default Ip;
