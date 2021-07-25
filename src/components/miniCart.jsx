import React, { Component, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { MyContext } from "./myProvider";
import CurrencyConverter from "./currencyConverter";
import MiniCartItem from "./miniCartItem";

import "./css/miniCart.css";

class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: <div></div>,
      value: props.value,
      redirect: null,
    };
    //console.log(props.value);
  }
  componentDidMount() {
    this.filler(this.state.value);
  }

  filler = (value) => {
    var htm = [];
    for (let i = 0; i < value.item_id.length; i++) {
      if (value.item_id[i] === null || value.item_id[i] === undefined) continue;
      const linkTo = `/itemview/${value.item_id[i]}`;
      const price = CurrencyConverter(value.item_price[i]);
      const object = {
        indexProvider: i,
        itemSize: value.item_size[i],
        price: price,
        itemLink: linkTo,
        itemId: value.item_id[i],
      };
      const temp = <MiniCartItem value={object} />;
      htm.push(temp);
    }

    this.setState({ html: htm });

    //After doing everything animate
    this.animate();
  };
  async animate() {
    await this.sleep(50);

    const elem = document.getElementById("m-cart-item-remove");

    elem.innerHTML += `.mcr {background-color:rgba(0, 0, 0, 0.5)}
    .mcr .right-m{width:320px}
    `;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div class="mcr">
        <div class="right-m">
          <p class="hdr-m">MINI CART</p>
          <MyContext.Consumer>
            {(context) => (
              <React.Fragment>
                {" "}
                <button
                  class="cross"
                  onClick={async () => {
                    //I have to use inline, coze I can't use context state outside of this
                    const elem = document.getElementById("m-cart-item-remove");
                    elem.innerHTML += `.mcr {background-color:rgba(0, 0, 0, 0)}
                  .mcr .right-m{width:0}
                  `;

                    await this.sleep(400);
                    const currentState = true;
                    context.cartManipulator(currentState);
                  }}
                >
                  X
                </button>
              </React.Fragment>
            )}
          </MyContext.Consumer>

          {/* Checkout icon */}
          <a href="#last">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 236 236"
              fill="rgb(199, 197, 197)"
              stroke="rgb(199, 197, 197)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="checkout-icon"
            >
              <g>
                <path
                  d="M110.035,151.039c0.399,3.858,3.655,6.73,7.451,6.73c0.258,0,0.518-0.013,0.78-0.04c4.12-0.426,7.115-4.111,6.689-8.231
		l-3.458-33.468c-0.426-4.121-4.11-7.114-8.231-6.689c-4.12,0.426-7.115,4.111-6.689,8.231L110.035,151.039z"
                />
                <path
                  d="M156.971,157.729c0.262,0.027,0.522,0.04,0.78,0.04c3.795,0,7.052-2.872,7.451-6.73l3.458-33.468
		c0.426-4.121-2.569-7.806-6.689-8.231c-4.121-0.419-7.806,2.569-8.231,6.689l-3.458,33.468
		C149.855,153.618,152.85,157.303,156.971,157.729z"
                />
                <path
                  d="M98.898,190.329c-12.801,0-23.215,10.414-23.215,23.215c0,12.804,10.414,23.221,23.215,23.221
		c12.801,0,23.216-10.417,23.216-23.221C122.114,200.743,111.699,190.329,98.898,190.329z M98.898,221.764
		c-4.53,0-8.215-3.688-8.215-8.221c0-4.53,3.685-8.215,8.215-8.215c4.53,0,8.216,3.685,8.216,8.215
		C107.114,218.076,103.428,221.764,98.898,221.764z"
                />
                <path
                  d="M176.339,190.329c-12.801,0-23.216,10.414-23.216,23.215c0,12.804,10.415,23.221,23.216,23.221
		c12.802,0,23.218-10.417,23.218-23.221C199.557,200.743,189.141,190.329,176.339,190.329z M176.339,221.764
		c-4.53,0-8.216-3.688-8.216-8.221c0-4.53,3.686-8.215,8.216-8.215c4.531,0,8.218,3.685,8.218,8.215
		C184.557,218.076,180.87,221.764,176.339,221.764z"
                />
                <path
                  d="M221.201,84.322c-1.42-1.837-3.611-2.913-5.933-2.913H65.773l-6.277-24.141c-0.86-3.305-3.844-5.612-7.259-5.612h-30.74
		c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24.941l6.221,23.922c0.034,0.15,0.073,0.299,0.116,0.446l23.15,89.022
		c0.86,3.305,3.844,5.612,7.259,5.612h108.874c3.415,0,6.399-2.307,7.259-5.612l23.211-89.25
		C223.111,88.55,222.621,86.158,221.201,84.322z M186.258,170.659H88.982l-19.309-74.25h135.894L186.258,170.659z"
                />
                <path
                  d="M106.603,39.269l43.925,0.002L139.06,50.74c-2.929,2.929-2.929,7.678,0,10.606c1.464,1.464,3.384,2.197,5.303,2.197
		c1.919,0,3.839-0.732,5.303-2.197l24.263-24.263c2.929-2.929,2.929-7.678,0-10.606l-24.28-24.28c-2.929-2.929-7.678-2.929-10.607,0
		c-2.929,2.929-2.929,7.678,0,10.607l11.468,11.468l-43.907-0.002h0c-4.142,0-7.5,3.358-7.5,7.5
		C99.104,35.911,102.461,39.269,106.603,39.269z"
                />
              </g>
            </svg>
          </a>
          <div class="content-ctr">
            {this.state.html}
            <div class="options col-flex" id="last">
              <p class="total">
                TOTAL:
                <MyContext.Consumer>
                  {(context) => (
                    <React.Fragment>
                      <label>{context.state.cartTotalString}</label>
                      <Link to="#">
                        <button
                          class="solid"
                          onClick={async () => {
                            if (context.state.itemCount === 0) {
                              alert(
                                "You need to add atleast 1 item to proceed."
                              );
                              return;
                            }
                            this.setState({ redirect: "/checkout" });
                            //I have to use inline, coze I can't use context state outside of this
                            const elem = document.getElementById(
                              "m-cart-item-remove"
                            );
                            elem.innerHTML += `.mcr {background-color:rgba(0, 0, 0, 0)}
                  .mcr .right-m{width:0}
                  `;

                            await this.sleep(400);
                            const currentState = true;
                            context.cartManipulator(currentState);
                          }}
                        >
                          Checkout
                        </button>
                      </Link>
                    </React.Fragment>
                  )}
                </MyContext.Consumer>{" "}
              </p>
              {/* <button class="hollow">Go to Cart</button> //create new page- I want to be lazy plox*/}
            </div>
          </div>
        </div>
        <style id="m-cart-item-remove"></style>
      </div>
    );
  }
}

export default MiniCart;
