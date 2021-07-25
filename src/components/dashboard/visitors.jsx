import axios from "axios";
import React, { Component } from "react";

import { api } from "../config";

class Visitors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CRC: [],
      PC: [],
    };
  }

  componentDidMount() {
    axios.post(`${api}/misc/get-location-from-db`).then((res) => {
      //For CRC
      var html = [];
      //let count = 0;
      for (let i = res.data.city.length - 1; i >= 0; i--) {
        //count++;
        const line = (
          <tr>
            <td>{i + 1}</td>
            <td>{res.data.city[i]}</td>
            <td>{res.data.region_name[i]}</td>
            <td>{res.data.country[i]}</td>
          </tr>
        );
        html.push(line);
      }
      this.setState({ CRC: html });

      //PC
      this.generatePC(res.data);
    });
  }
  generatePC = (res) => {
    var people = [];
    var country = [];

    res.country.forEach((elem) => {
      const id = country.indexOf(elem);
      if (id !== -1) {
        people[id] += 1;
      } else {
        people.push(1);
        country.push(elem);
      }
    });

    var html = [];
    for (let i = 0; i < people.length; i++) {
      const line = (
        <tr>
          <td>{i + 1}</td>
          <td>{people[i]}</td>
          <td>{country[i]}</td>
        </tr>
      );
      html.push(line);
    }

    this.setState({ PC: html });
  };
  render() {
    return (
      <div class="visitors margin-top-50">
        <table>
          <tr>
            <th class="serial">S/No</th>
            <th>People / 100</th>
            <th>Country</th>
          </tr>
          {this.state.PC}
        </table>
        <table class="margin-top-50">
          <tr>
            <th class="serial">S/No</th>
            <th>City</th>
            <th>Region</th>
            <th>County</th>
          </tr>
          {this.state.CRC}
        </table>
      </div>
    );
  }
}

export default Visitors;
