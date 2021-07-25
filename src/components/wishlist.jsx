import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { api } from "./config";
import "./css/wishlist.css";
import { MyContext } from "./myProvider";
import CurrencyConverter from "./currencyConverter";
import FLC from "./firstLetterCapital";

async function removeCertainCard(id) {
  const elem = document.getElementById("wishlist-card-remove");
  elem.innerHTML += `.wishlist #${id}{opacity:0;visibility:hidden}`;
  await sleep(400);
  elem.innerHTML += `.wishlist  #${id}{display:none}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function animateOpen() {
  await sleep(50);

  const elem = document.getElementById("wishlist-whole");

  elem.innerHTML += `.wishlist {background-color:rgba(0, 0, 0, 0.5)}
  .wishlist .container{width:320px}.wishlist .cross{opacity:1}
  `;
}

function Wishlist() {
  const context = useContext(MyContext);
  const [contents, setContents] = useState([]);

  animateOpen();

  async function animateClose() {
    const elem = document.getElementById("wishlist-whole");
    elem.innerHTML += `.wishlist {background-color:rgba(0, 0, 0, 0)}
    .wishlist .container{width:0}.wishlist .cross{opacity:0}
    `;
    await sleep(500);
    context.wishlistClose();
  }

  useEffect(() => {
    //console.log(context.state.wishlist.length);
    //We will retrive and rerender each time whenever wishlist changes!
    if (context.state.wishlist.length < 1) {
      return;
    }

    axios
      .post(`${api}/accounts/get-details-from-wishlist`, {
        ids: context.state.wishlist,
      })
      .then((res) => {
        res.data?.item_id !== undefined
          ? generateContent(res.data)
          : console.log("Nothing to do");
      });
  }, []);

  function sizeChanger(id, allSize, type) {
    const elem = document.getElementById(id);
    const cur = elem.innerHTML;
    const index = allSize.indexOf(cur);

    if (type === "PLUS") {
      if (index + 1 >= allSize.length) {
        context.alert("Highest size is already selected.", "FAIL");
        return;
      }
      elem.innerHTML = allSize[index + 1];
    } else {
      if (index - 1 < 0) {
        context.alert("Lowest size is already selected.", "FAIL");
        return;
      }
      elem.innerHTML = allSize[index - 1];
    }
  }

  function generateContent(data) {
    //console.log(data);
    //item_img item_name item_id item_price item_avail_sizes item_stocks
    var html = [];
    for (let i = 0; i < data.item_id.length; i++) {
      const imgPath = `/assets/images/uploads/${data.item_img[i]}`;
      const availSizes = data.item_avail_sizes[i];
      const id = `wl-${data.item_id[i]}`;
      const mId = `wl-main-${data.item_id[i]}`;

      const temp = (
        <div className="cards row-flex" id={mId}>
          <img src={imgPath}></img>
          <div className="details col-flex">
            <Link to="/itemview/">{FLC(data.item_name[i])}</Link>
            <label>
              Size:{" "}
              <label
                id={id}
                style={{
                  color: "grey",
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}
              >
                {availSizes[0]}
              </label>
            </label>
            <label>{CurrencyConverter(data.item_price[i])}</label>
            <label
              class="btn-remove"
              onClick={() => {
                removeCertainCard(mId);
                context.removeItemFromWishlist(data.item_id[i]);
              }}
            >
              Remove
            </label>
            <button
              className="btn"
              onClick={() => {
                const elem = document.getElementById(id);
                const curSize = elem.innerHTML;
                const availSize = data.item_avail_sizes[i];
                const idx = availSize.indexOf(curSize);
                const stocks = data.item_stocks[i];
                const stockForThisItem = stocks[idx];

                if (stockForThisItem < 1) {
                  context.alert("Out of stock at the moment.", "FAIL");
                  return;
                }

                const value = {
                  item_name: data.item_name[i],
                  item_id: data.item_id[i],
                  item_price: data.item_price[i],
                  item_quantity: 1,
                  item_size: curSize,
                  item_img: imgPath,
                  item_avail_sizes: data.item_avail_sizes[i],
                };

                context.addItem(value, stocks);
                context.removeItemFromWishlist(data.item_id[i]);
                removeCertainCard(mId);
              }}
            >
              ADD TO CART
            </button>
            <div className="plus-minus">
              <button
                className="btn-nav"
                onClick={() =>
                  sizeChanger(id, data.item_avail_sizes[i], "MINUS")
                }
              >
                {"<"}
              </button>
              <button
                className="btn-nav"
                onClick={() =>
                  sizeChanger(id, data.item_avail_sizes[i], "PLUS")
                }
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      );
      html.push(temp);
    }
    setContents(html);
  }

  return (
    <div class="wishlist">
      <div className="container">
        <p className="title">
          WISHLIST
          <button
            class="cross"
            onClick={() => {
              animateClose();
            }}
          >
            X
          </button>
        </p>
        <div className="items-below col-flex">
          {contents}
          <div class="some-padding-below"></div>
        </div>
      </div>
      <style id="wishlist-card-remove"></style>
      <style id="wishlist-whole"></style>
    </div>
  );
}

export default Wishlist;
