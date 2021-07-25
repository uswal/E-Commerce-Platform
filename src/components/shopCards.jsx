import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { MyContext } from "./myProvider";
import firstLetterCapital from "./firstLetterCapital";
import CurrencyConverter from "./currencyConverter";
import LazyImg from "./lazyImg";

const eye = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    stroke-width="0.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="eye"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const alt = "/assets/images/Logo_1.png";

function ShopCards(data) {
  useEffect(() => {}, []);

  const price = CurrencyConverter(data.props.price);

  var firstTimeOnlyVar = "size-active"; // 1/2/21
  var size = [];
  for (let z = 0; z < data.props.size.length; z++) {
    const id = `id${data.props.item_name}${data.props._id}${data.props.size[z]}`;
    const classN = `size-cont ${firstTimeOnlyVar}`; // 1/2/21
    size.push(
      <button
        class={classN} //Class for active -  size-active // 1/2/21
        id={id}
        value={data.props.size[z]}
        onClick={() => {
          const temp8 = data.props;
          //console.log(document.getElementById(id).value);
          const addClass = document.getElementById(
            `id${temp8.item_name}${temp8._id}${data.props.size[z]}`
          );

          for (let t = 0; t < temp8.size.length; t++) {
            const temp9 = document.getElementById(
              `id${temp8.item_name}${temp8._id}${temp8.size[t]}`
            );
            temp9.classList.remove("size-active");
          }
          addClass.classList.add("size-active");
          document.getElementById(
            `text-${temp8._id}`
          ).value = `${data.props.size[z]}`;
          //console.log(document.getElementById(`text-${temp8._id}`).value); - Use this to get value of container
        }}
      >
        {data.props.size[z]}
      </button>
    );
    firstTimeOnlyVar = "";
  }

  const imgPrimary = `/assets/images/uploads/${data.props.images[0]}`;
  const imgSecondary = `/assets/images/uploads/${data.props.images[1]}`;
  const linkTo = `/itemview/${data.props._id}`;
  const sizeHiddenText = `text-${data.props._id}`;

  return (
    <div class="item-container">
      <input
        type="text"
        id={sizeHiddenText}
        style={{ display: "none" }}
        value={data.props.size[0]}
      ></input>
      <ul>
        <li>
          <div class="img">
            {/* <LazyLoadImage effect="blur" alt={alt} src={alt} /> */}
            <img src={imgPrimary}></img>
            {/* <LazyImg src={imgPrimary} classes="" /> */}
            <div class="hidden hide-on-phone">
              <div class="hidden-img-container ">
                <img class="hidden-img" src={imgSecondary}></img>
              </div>
            </div>

            <div class="hidden heo">
              <ul>
                {/* <li>
                  <Link to={linkTo}>
                    
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="svg"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    
                  </Link>
                </li> */}
                <li>
                  {/* Heart */}
                  <MyContext.Consumer>
                    {(context) => (
                      <React.Fragment>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="svg"
                          onClick={() => {
                            context.addToWishList(
                              data.props._id,
                              data.props.item_name
                            );
                          }}
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {/* <label
                          className="svg-label"
                          onClick={() => {
                            context.addToWishList(
                              data.props._id,
                              data.props.item_name
                            );
                          }}
                        >
                          Add to Wishlist
                        </label> */}
                      </React.Fragment>
                    )}
                  </MyContext.Consumer>
                </li>
              </ul>

              <div>
                <Link class="quick-v-c" to={linkTo}>
                  <p class="quick-v">{eye}QUICK VIEW</p>
                </Link>
                <MyContext.Consumer>
                  {(context) => (
                    <React.Fragment>
                      <p
                        class="add-cart"
                        onClick={() => {
                          if (context.state.accounts.email === undefined) {
                            context.loginMode();
                            return;
                          }

                          const currentSize = document.getElementById(
                            `text-${data.props._id}`
                          ).value;
                          if (currentSize === "") {
                            context.alert(
                              "You must select a size before adding.",
                              "WARNING"
                            );
                            return;
                          }

                          const id = data.props.size.indexOf(currentSize);
                          if (data.props.stock[id] < 1) {
                            context.alert(
                              "This size is out of stock at the moment!",
                              "NOTIFY"
                            );
                            return;
                          }

                          const value = {
                            item_name: data.props.item_name,
                            item_id: data.props._id,
                            item_price: data.props.price, //in rs
                            item_quantity: 1,
                            item_size: currentSize,
                            item_img: imgPrimary,
                            item_avail_sizes: data.props.size,
                          };
                          context.addItem(value, data.props.stock);
                        }}
                      >
                        ADD TO CART
                      </p>
                    </React.Fragment>
                  )}
                </MyContext.Consumer>
              </div>
            </div>
          </div>
        </li>
        <li class="padd-help margin-20-phone">
          <Link class="item-title darkblue-hover" to={linkTo}>
            {firstLetterCapital(data.props.item_name)}
          </Link>
        </li>
        <li>
          <label class="item-price margin-20-phone">{price}</label>
        </li>
        <li>
          <div class="item-sizes margin-20-phone">{size}</div>
        </li>
      </ul>
    </div>
  );
}

export default ShopCards;
