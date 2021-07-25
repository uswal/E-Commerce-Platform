import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

import "./css/itemView.css";
import "./css/itemViewOnPhone.css";

import { api } from "../components/config";
import { MyContext } from "../components/myProvider";
import CurrencyConverter from "../components/currencyConverter";
import firstLetterCapital from "../components/firstLetterCapital";
import SizeChartPop from "../components/sizeChartPop";

class ItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      rHtml: "",
      lHtml: "",
      sLeft: 0,
      thisSizeHasStock: 0,
      selectedSize: "",
      redirect: null,
      sizePop: [],
    };
  }
  crossHandler = () => {
    this.setState({ sizePop: [] });
  };
  stockMessage = (n) => {
    //console.log(n);
    const availId = document.getElementById("avail");

    if (n > 0) {
      availId.innerHTML = `Availability: <label style="color: green">In Stock</label>`;
    } else
      availId.innerHTML = `Availability: <label style="color: red">Out Of Stock</label>`;
  };
  componentDidMount() {
    axios
      .post(`${api}/inventory/getOne`, { id: this.state.id })
      .then((res) => {
        res = res.data;
        //console.log(res);
        //R html
        var reviewsText = "";
        if (res.reviews.length === 0)
          reviewsText = "Be the first to review this product";

        const price = CurrencyConverter(res.price);

        var size = [];
        var firstTimeOnlyVar = "size-active";
        this.setState({
          thisSizeHasStock: res.stock[0],
          selectedSize: res.size[0],
        });
        for (let z = 0; z < res.size.length; z++) {
          const classN = `size-cont ${firstTimeOnlyVar}`;
          const id = `id${res.item_name}${res._id}${res.size[z]}`;
          size.push(
            <button
              class={classN}
              id={id}
              onClick={() => {
                const temp8 = res;

                const addClass = document.getElementById(
                  `id${temp8.item_name}${temp8._id}${res.size[z]}`
                );

                for (let t = 0; t < temp8.size.length; t++) {
                  const temp9 = document.getElementById(
                    `id${temp8.item_name}${temp8._id}${temp8.size[t]}`
                  );
                  temp9.classList.remove("size-active");
                }
                addClass.classList.add("size-active");
                this.stockMessage(res.stock[z]);

                this.setState({
                  thisSizeHasStock: res.stock[z],
                  selectedSize: res.size[z],
                });

                const id = document.getElementById("noi");
                if (parseInt(id.value) > res.stock[z]) id.value = res.stock[z];
              }}
            >
              {res.size[z]}
            </button>
          );
          firstTimeOnlyVar = "";
        }
        //console.log(size);
        var avail;

        if (res.stock[0] > 0)
          avail = (
            <label id="avail">
              Availability: <label style={{ color: "green" }}>In Stock</label>
            </label>
          );
        else
          avail = (
            <label id="avail">
              Availability: <label style={{ color: "red" }}>Out Of Stock</label>
            </label>
          );

        const rHtm = (
          <span>
            <label style={{ fontWeight: "bold", fontSize: "22px" }}>
              {firstLetterCapital(res.item_name)}
            </label>
            {/* <label class="iv-review">{reviewsText}</label> TODO */}
            <label
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "rgb(49, 49, 49)",
                marginTop: "10px",
              }}
            >
              {price}
            </label>
            <label
              style={{
                fontSize: "16px",
                lineHeight: "20px",
                color: "grey",
                margin: "10px 0",
                fontFamily: "Open sans",
              }}
            >
              {res.description}
            </label>
            <label
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "grey",
                margin: "10px 0",
                fontFamily: "Open sans",
              }}
            >
              {res.notes}
            </label>
            <label
              style={{
                marginTop: "20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              SIZE:
            </label>
            <div class="item-sizes">{size}</div>
            <div class="row-flex" style={{ marginTop: "20px" }}>
              <div class="noi">
                <button
                  class="left"
                  onClick={() => {
                    const v = document.getElementById("noi");
                    if (v.value > 1) v.value = parseInt(v.value) - 1;
                  }}
                >
                  -
                </button>
                <input type="text" id="noi" value="1" type="number"></input>
                <MyContext.Consumer>
                  {(context) => (
                    <React.Fragment>
                      <button
                        class="right"
                        onClick={() => {
                          const v = document.getElementById("noi");
                          const newV = parseInt(v.value) + 1;
                          if (newV >= this.state.thisSizeHasStock) {
                            context.alert(
                              "Requested quantity exceeds stock!",
                              ""
                            );
                            return;
                          }
                          if (v.value < 5) v.value = newV;
                          else
                            context.alert(
                              "Max quantity per order reached!",
                              "FAIL"
                            );
                        }}
                      >
                        +
                      </button>
                    </React.Fragment>
                  )}
                </MyContext.Consumer>
              </div>
              <MyContext.Consumer>
                {(context) => (
                  <React.Fragment>
                    <button
                      class="atc"
                      onClick={() => {
                        if (context.state.accounts.email === undefined) {
                          context.loginMode();
                          return;
                        }

                        const numberOfItems = parseInt(
                          document.getElementById("noi").value
                        );

                        if (this.state.thisSizeHasStock < 1) {
                          context.alert("This size is out of stock!", "NOTIFY");
                          return;
                        }

                        const imgPrimary = `/assets/images/uploads/${res.images[0]}`;
                        const value = {
                          item_name: res.item_name,
                          item_id: res._id,
                          item_price: res.price, //in rs
                          item_quantity: numberOfItems,
                          item_size: this.state.selectedSize,

                          item_img: imgPrimary,
                          item_avail_sizes: res.size,
                        };
                        context.addItem(value);
                      }}
                    >
                      ADD TO CART
                    </button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke=" rgb(177, 177, 177)"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-heart wl"
                      onClick={() => {
                        context.addToWishList(res._id, res.item_name);
                      }}
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </React.Fragment>
                )}
              </MyContext.Consumer>
            </div>
            <label style={{ marginTop: "30px" }}>
              <label style={{ fontWeight: "bold" }}>MORE QUERIES?</label>&nbsp;
              Reach us on{" "}
              <a
                href="https://api.whatsapp.com/send?phone=+91%2070115%2007044"
                target="_blank"
                style={{ color: "black", curosr: "pointer" }}
              >
                <img
                  src="/assets/images/wpq.png"
                  style={{ height: "20px", transform: "translate(6px,5px)" }}
                ></img>{" "}
                &nbsp; <label>at +91 7011507044</label>
              </a>
            </label>
            <img
              style={{ marginTop: "20px", maxWidth: "400px" }}
              src="/assets/images/Size_chart.jpg"
              alt="Loading size chart"
            ></img>
            <div class="row-flex">
              {/* <label
                class="sd"
                onClick={() => {
                  this.setState({
                    sizePop: <SizeChartPop cross={this.crossHandler} />,
                  });
                }}
              >
                Size Guide
              </label> */}
              <label class="sd">
                <Link to="/payment-returns">Payment & Returns</Link>
              </label>
            </div>
            <label style={{ marginTop: "20px" }}>{avail}</label>
            <label style={{ marginTop: "20px" }}>
              Collection:{" "}
              <label style={{ fontStyle: "italic", color: "grey" }}>
                {firstLetterCapital(res.collection_name)}
              </label>
            </label>
            <label style={{ marginTop: "20px" }}>
              SKU: <label style={{ color: "grey" }}>{res.sku}</label>
            </label>
          </span>
        );
        this.setState({ rHtml: rHtm });

        var options = [];
        for (let x = 0; x < res.images.length; x++) {
          const add = `/assets/images/uploads/${res.images[x]}`;
          const id = `a${x}`;
          const temp = (
            <img
              class="img pc-active"
              id={id}
              src={add}
              onClick={() => {
                document.getElementById(
                  "picture"
                ).innerHTML = `<img id="myimage" src="${add}"></img>`;
                document.getElementById("iv-helper").innerHTML = `#${id}{
                  opacity:1;
                }`;
              }}
            ></img>
          );
          options.push(temp);
        }
        const cI = `/assets/images/uploads/${res.images[0]}`;
        document.getElementById("iv-helper").innerHTML = `#a0{opacity:1}`;

        const lHtm = (
          <div class="iv-picture">
            <div id="myresult" class="img-zoom-result"></div>
            <div class="picture" id="picture">
              <img id="myimage" src={cI}></img>
            </div>

            <img
              class="arrow left"
              src="/assets/icons/arrow-left.svg"
              onClick={() => {
                var t = this.state.sLeft - 140;
                if (t < 0) return;

                const temp = document.getElementById("scroll").scrollWidth;
                if (temp - t < 600) t = temp - 600 - 140;
                if (t < 140) t = 0;

                this.setState({ sLeft: t });

                document.getElementById("scroll").scrollTo({
                  left: t,
                  behavior: "smooth",
                });
              }}
            ></img>
            <img
              class="arrow right"
              src="/assets/icons/arrow-right.svg"
              onClick={() => {
                var t = this.state.sLeft + 140;
                const temp = document.getElementById("scroll").scrollWidth;
                if (temp < t) return;

                this.setState({ sLeft: t });

                document.getElementById("scroll").scrollTo({
                  left: t,
                  behavior: "smooth",
                });
              }}
            ></img>
            <div class="scroll" id="scroll">
              {options}
            </div>
          </div>
        );
        //console.log(res.images);
        this.setState({ lHtml: lHtm });
      })
      .catch((err) => {
        this.setState({ redirect: "/error-404" });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="item-view-container">
        <div class="iv-col iv-left">{this.state.lHtml}</div>
        <div class="iv-col iv-right">{this.state.rHtml}</div>
        <style id="iv-helper"></style>
        {/* <SizeChartPop
          cross={() => {
            this.crossHandler();
          }}
        /> */}
        {this.state.sizePop}
      </div>
    );
  }
}

export default ItemView;
