import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { MyContext } from "./myProvider";
import { api } from "./config";

const __DEV__ = document.domain === "localhost";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function PaymentMethod(props) {
  //console.log(props.info.shippingAddress.country);
  //Init
  const context = useContext(MyContext);
  const email = context.state.accounts.email;
  const [codHTML, setCodHTML] = useState([]);

  var itemList = {
    item_id: [],
    item_quantity: [],
    item_name: [],
    item_img: [],
    item_size: [],
  };
  console.log(context.state.cart);
  for (let i = 0; i < context.state.cart.item_id.length; i++) {
    if (
      context.state.cart.item_id[i] === undefined ||
      context.state.cart.item_id[i] === null ||
      context.state.cart.item_quantity[i] < 1
    )
      continue;

    itemList.item_id.push(context.state.cart.item_id[i]);
    itemList.item_quantity.push(context.state.cart.item_quantity[i]);
    itemList.item_name.push(context.state.cart.item_name[i]);
    itemList.item_img.push(context.state.cart.item_img[i]);
    itemList.item_size.push(context.state.cart.item_size[i]);
  }
  //console.log(itemList);
  useEffect(() => {
    const elem = document.getElementById("checkout-helper");
    elem.innerHTML = `
        .progress{ background-color:#14ab00 }
        .progress-bar{background-color:#eb5202}
        `;
    window.scrollTo(0, 0);
    props.info.shippingAddress.country === "India"
      ? setCodHTML(
          <label
            // onClick={() => {
            //   cashOnDelivery();
            // }}
            className="razorpay"
          >
            <input type="radio" id="pm-4" name="pm" value="CO"></input>&nbsp;
            Cash On Delivery
          </label>
        )
      : setCodHTML([]);
  }, []);

  async function displayRazorPay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    axios
      .post(`${api}/transactions/razorpay`, { info: props.info })
      .then((res) => {
        ShowOrder(res.data);
      });
  }

  function ShowOrder(data) {
    const options = {
      key: "rzp_live_bnGPvBENloFYUh", // Enter the Key ID generated from the Dashboard
      amount: data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Sooti Studio",
      description: "Description",
      image: "http://localhost:3000/assets/images/Logo_1.png", //Logo TODO
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        // console.log(response);
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        RazorpaySuccess(response);
      },
      prefill: {
        name: props.info.name,
        email: email,
        contact: props.info.phone,
      },
      //   notes: {
      //     address: "Razorpay Corporate Office",
      //   },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  async function RazorpaySuccess(response) {
    const payment_id = response.razorpay_payment_id;
    const order_id = response.razorpay_order_id;
    const signature = response.razorpay_signature;

    //Adding record to transaction collection
    await axios
      .post(`${api}/transactions/finalize-order`, {
        payment_id,
        order_id,
        signature,
        name: props.info.name,
        email: email,
        amount: props.info.amount,
        itemList: itemList,
        shippingAddress: props.info.shippingAddress,
        userId: Cookies.get("id"),
        payment_mode: "RAZORPAY",
        payment_status: "PAID",
      })
      .then((res) => {
        // Do nothing, function below will redict
      });

    context.resetCart();
    context.alert("Order placed!", "SUCCESS");
    props.fun(); // REDIRECT TO ORDERS
  }

  function generateRandomString(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  function proceed() {
    var val;
    for (let i = 1; i <= 4; i++) {
      const elem = document.getElementById(`pm-${i}`);
      if (elem === null || elem === undefined) continue;
      if (elem.checked === true) {
        val = elem.value;
        break;
      }
    }

    if (val === "OP" || val === "UP" || val === "WA") {
      displayRazorPay();
    } else if (val === "CO") {
      cashOnDelivery();
    }
  }
  async function cashOnDelivery() {
    const payment_id = "";
    const order_id = generateRandomString(5) + Date.now().toString();
    const signature = "";

    //Adding record to transaction collection
    await axios
      .post(`${api}/transactions/finalize-order`, {
        payment_id,
        order_id,
        signature,
        name: props.info.name,
        email: email,
        amount: props.info.amount,
        itemList: itemList,
        shippingAddress: props.info.shippingAddress,
        userId: Cookies.get("id"),
        payment_mode: "COD",
        payment_status: "UNPAID",
      })
      .then((res) => {
        if (res.data === "success") {
          // Do nothing, function below will redict
        }
      });

    context.resetCart();
    context.alert("Order placed!", "SUCCESS");
    props.fun(); // Redirect
  }
  return (
    <div class="checkout">
      <div class="col col-1 col-flex">
        <label class="big-hdr">Payment Method</label>
        {/* <img
          src="/assets/images/razorpay.png"
          class="razorpay"
          onClick={displayRazorPay}
        ></img> */}

        <label className="razorpay payment-methods">
          <input type="radio" id="pm-1" name="pm" value="OP"></input>
          &nbsp;Online Payment
        </label>
        <label className="razorpay payment-methods">
          <input type="radio" id="pm-2" name="pm" value="UP"></input>&nbsp;
          UPI/QR
        </label>
        <label className="razorpay payment-methods">
          <input type="radio" id="pm-3" name="pm" value="WA"></input>
          &nbsp;Wallet (PhonePe, GooglePay & more )
        </label>
        {codHTML}

        <button
          className="btn btn-green"
          onClick={() => {
            proceed();
          }}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}

export default PaymentMethod;
