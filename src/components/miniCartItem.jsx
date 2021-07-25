import React, { Component } from "react";
import { Link } from "react-router-dom";

import { MyContext } from "./myProvider";
import FLC from "./firstLetterCapital";

class MiniCartComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.value.indexProvider,
      itemSize: props.value.itemSize,
      price: props.value.price,
      itemLink: props.value.itemLink,
      itemContainerId: `m-cart-item-id-${props.value.itemId}-${props.value.itemSize}`,
      itemId: props.value.itemId,
    };
  }

  async removeFromCart() {
    const elem = document.getElementById("m-cart-item-remove");
    elem.innerHTML += `#${this.state.itemContainerId}{
        visibility: none;
        opacity: 0;
    }`;
    await this.sleep(500);
    elem.innerHTML += `#${this.state.itemContainerId}{
        height: 0;
        display:none;
    }`;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  render() {
    return (
      <MyContext.Consumer>
        {(context) => (
          <div class="m-content" id={this.state.itemContainerId}>
            <div class="col-flex">
              <img src={context.state.cart.item_img[this.state.index]}></img>
            </div>
            <div class="col-flex">
              <Link to={this.state.itemLink} className="title">
                {FLC(context.state.cart.item_name[this.state.index])}
              </Link>
              <label className="small">
                Size:{" "}
                <label style={{ color: "black" }}>
                  {context.state.cart.item_size[this.state.index]}
                </label>
              </label>

              <label class="small qty">Quantity:</label>
              <input
                className="item-count"
                type="number"
                // value={this.state.itemQty}
                value={context.state.cart.item_quantity[this.state.index]}
                disabled
              ></input>
              <label className="small price">
                Price:{" "}
                <label style={{ color: "black" }}>{this.state.price}</label>
              </label>

              <button
                class="remove"
                onClick={() => {
                  this.removeFromCart();
                  context.qtyHandler(
                    "REMOVE",
                    context.state.cart.item_quantity[this.state.index],
                    this.state.index
                  );
                }}
              >
                Remove From Cart
              </button>
              <div class="m-icons">
                <div class="row-flex">
                  {/* Size - */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon"
                    onClick={() => {
                      //console.log(`-- ${this.state.index}`);
                      context.sizeHandler(
                        "MINUS",
                        context.state.cart.item_size[this.state.index],
                        context.state.cart.item_avail_sizes[this.state.index],
                        this.state.index
                      );
                    }}
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  {/* Size + */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon"
                    onClick={() => {
                      context.sizeHandler(
                        "PLUS",
                        context.state.cart.item_size[this.state.index],
                        context.state.cart.item_avail_sizes[this.state.index],
                        this.state.index
                      );
                    }}
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
                <div class="row-flex">
                  {/* Qantity - */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon"
                    onClick={() => {
                      //this.quntityHandler("MINUS", this.state.itemQty);
                      context.qtyHandler(
                        "MINUS",
                        context.state.cart.item_quantity[this.state.index],
                        this.state.index
                      );
                    }}
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  {/* Qantity + */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg "
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon"
                    onClick={() => {
                      //this.quntityHandler("PLUS", this.state.itemQty);
                      context.qtyHandler(
                        "PLUS",
                        context.state.cart.item_quantity[this.state.index],
                        this.state.index
                      );
                    }}
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

export default MiniCartComponent;
