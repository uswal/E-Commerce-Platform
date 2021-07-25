import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/search.css";

import { MyContext } from "./myProvider";
import FirstLetterCapital from "./firstLetterCapital";
import { api } from "./config";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  componentDidMount() {
    document.getElementById("search-text").focus();
  }

  search = () => {
    const str = document
      .getElementById("search-text")
      .value.trim()
      .toLowerCase();
    const query = { item_name: { $regex: str } };

    axios
      .post(`${api}/inventory/search-query`, { query })
      .then((res) => {
        //console.log(res.data);
        this.newList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  newList = (res) => {
    var list = [];
    for (let i = 0; i < res.length; i++) {
      const img = `/assets/images/uploads/${res[i].images[0]}`;
      const link = `/itemview/${res[i]._id}`;
      const html = (
        <div className="card">
          <div className="border-helper">
            <img src={img}></img>
            <MyContext.Consumer>
              {(context) => (
                <React.Fragment>
                  <Link
                    to={link}
                    onClick={() => {
                      context.searchClose();
                    }}
                  >
                    <p>{FirstLetterCapital(res[i].item_name)}</p>
                  </Link>
                </React.Fragment>
              )}
            </MyContext.Consumer>
          </div>
        </div>
      );
      list.push(html);
    }
    this.setState({ list: list });
  };
  render() {
    return (
      <div class="search-container">
        <div className="navigation">
          <p>
            <input
              id="search-text"
              type="text"
              placeholder="Search"
              onChange={this.search}
            ></input>
            <MyContext.Consumer>
              {(context) => (
                <button
                  class="btn"
                  onClick={() => {
                    context.searchClose();
                  }}
                >
                  X
                </button>
              )}
            </MyContext.Consumer>
          </p>
        </div>

        <div className="container">{this.state.list}</div>
      </div>
    );
  }
}

export default Search;
