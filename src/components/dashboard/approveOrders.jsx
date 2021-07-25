import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../config";
import CC from "../currencyConverter";

const creds = {
  email: "teamtantuvya@gmail.com",
  password: "Sunshine@1003",
};

function ApproveOrders() {
  const [table, setTable] = useState("");

  function itemToString(list, size) {
    var string = "";
    for (let x = 0; x < list.length; x++) string += list[x] + `(${size[x]}),`;
    //console.log(list);
    return string;
  }

  function generateList(data) {
    // data is array of objects
    var list = [];
    // alert(data[0].item_list.item_name[0]);
    for (let i = 0; i < data.length; i++) {
      const add =
        data[i].shipping_address.sa1 +
        "," +
        data[i].shipping_address.sa2 +
        "," +
        data[i].shipping_address.sa3;

      const itemString = itemToString(
        data[i].item_list.item_name,
        data[i].item_list.item_size
      );
      const elem = (
        <React.Fragment>
          <tr>
            <td>{data[i].shipping_address.name}</td>
            <td>{itemString}</td>
            <td>{CC(data[i].amount)}</td>
            <td>{data[i].payment_status}</td>
            <td>{data[i].payment_mode}</td>
            <td>{add}</td>
            <td>
              <button
                className="btn btn-green"
                onClick={() => {
                  clickYes(data[i]);
                }}
              >
                Yes
              </button>

              <button
                className="btn btn-blue"
                onClick={() => {
                  clickNo(data[i]);
                }}
              >
                No
              </button>
            </td>
          </tr>
        </React.Fragment>
      );
      list.push(elem);
    }
    setTable(list);
  }

  async function getDetailsAndGenerateList(obj) {
    var newList = [];
    obj.item_id.forEach((elem) => {
      newList.push({ _id: elem });
    });
    var deliveryList = [];
    await axios
      .post(`${api}/inventory/approve-order-return-details`, newList)
      .then((res) => {
        var newObj = obj;
        var skus = [];
        var price = [];

        // newObj.item_id.forEach((elem) => {
        //   const id = res.data.ids.indexOf(elem);
        //   skus.push(res.data.skus[id]);
        //   price.push(res.data.price[id]);
        // });
        for (let i = 0; i < newObj.item_id.length; i++) {
          const id = res.data.ids.indexOf(newObj.item_id[i]);
          skus.push(res.data.skus[id]);
          price.push(res.data.price[id]);
        }
        //console.log(skus);
        for (let i = 0; i < newObj.item_id.length; i++) {
          skus[i] = skus[i] + "-" + newObj.item_size[i] + i.toString();
        }

        newObj.item_skus = skus;
        newObj.item_price = price;
        // Now start creating list of obj to return

        //console.log(newObj);
        for (let i = 0; i < newObj.item_id.length; i++) {
          deliveryList.push({
            name: newObj.item_name[i],
            sku: newObj.item_skus[i],
            units: newObj.item_quantity[i],
            selling_price: newObj.item_price[i],
            discount: "",
            tax: "",
            hsn: 620630,
          });
        }
      });

    console.log(deliveryList);
    return deliveryList;

    // Syntax
    //   {
    //     name: "",
    //     sku: "",
    //     units: "",
    //     selling_price: "",
    //     discount: "",
    //     tax: "",
    //     hsn: "",
    //   },
  }

  async function clickYes(data) {
    var dim = prompt(
      `Enter L-B-H-W of Package with one dash in between, ex: "1-2-3-4"\nL - Length(cm)\nB- Breadth(cm)\nH - Height(cm)\nW - Weight(kgs)`
    );
    //var dim = "1-1-1-1";
    if (dim === null) return;

    dim = dim.split("-");

    if (dim.length !== 4) {
      alert("Wrong format entered");
      clickYes(data);
    }

    const arrObj = await getDetailsAndGenerateList(data.item_list);
    //console.log(arrObj);

    const paymentMethod = data.payment_mode === "COD" ? "COD" : "Prepaid";
    var date = new Date(data.createdAt);

    const one =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const two = date.getHours() + ":" + date.getMinutes();

    const dateStr = one + " " + two;

    const obj = {
      order_id: data._id,
      order_date: dateStr,
      pickup_location: "Primary",
      channel_id: "",
      comment: "",
      reseller_name: "",
      company_name: "SootiStudio",
      billing_customer_name: data.shipping_address.name,
      billing_last_name: "",
      billing_address: data.shipping_address.sa1,
      billing_address_2:
        data.shipping_address.sa2 + "," + data.shipping_address.sa3,
      billing_isd_code: "",
      billing_city: data.shipping_address.city,
      billing_pincode: parseInt(data.shipping_address.zip),
      billing_state: data.shipping_address.state,
      billing_country: data.shipping_address.country,
      billing_email: data.email,
      billing_phone: data.shipping_address.phone,
      billing_alternate_phone: "",
      shipping_is_billing: true,
      shipping_customer_name: "",
      shipping_last_name: "",
      shipping_address: "",
      shipping_address_2: "",
      shipping_city: "",
      shipping_pincode: "",
      shipping_country: "",
      shipping_state: "",
      shipping_email: "",
      shipping_phone: "",
      order_items: arrObj,
      payment_method: paymentMethod,
      shipping_charges: "",
      giftwrap_charges: "",
      transaction_charges: "",
      total_discount: "",
      sub_total: data.amount,
      length: parseInt(dim[0]),
      breadth: parseInt(dim[1]),
      height: parseInt(dim[2]),
      weight: parseInt(dim[3]),
      ewaybill_no: "",
      customer_gstin: "",
      invoice_number: "",
    };
    createOrder(obj);
  }

  async function createOrder(obj) {
    console.log(obj);
    const shipToken = await getToken();
    if (shipToken === "") {
      alert("Token isn't initialized properly!");
      return;
    }

    const data = JSON.stringify(obj);

    var config = {
      method: "post",
      url: "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${shipToken}`,
      },
      data: data,
    };

    axios(config)
      .then((res) => {
        createdOrderInShiprocket(obj.order_id);
        console.log(res);
      })
      .catch((err) => {
        alert(err);
      });
  }
  function createdOrderInShiprocket(transactionId) {
    console.log(transactionId);
    // Change status
    axios
      .post(`${api}/transactions/verified`, { transactionId })
      .then((res) => {
        window.location.reload(false);
      });
  }
  function clickNo(data) {
    axios
      .post(`${api}/transactions/cancelled`, { transactionId: data._id })
      .then((res) => {
        window.location.reload(false);
      });
  }
  async function getToken() {
    var token = "";
    await axios
      .post(`https://apiv2.shiprocket.in/v1/external/auth/login`, creds)
      .then((res) => {
        token = res.data.token;
      });
    return token;
  }

  useEffect(() => {
    axios.post(`${api}/transactions/return-ordered-items`).then((res) => {
      generateList(res.data);
    });
    getToken();
  }, []);

  // async function fun() {
  //   const shipToken = await getToken();
  //   const obj = {
  //     ids: ["28220"],
  //   };
  //   const data = JSON.stringify({
  //     ids: ["28220"],
  //   });

  //   var config = {
  //     method: "post",
  //     url: "https://apiv2.shiprocket.in/v1/external/orders/print/invoice",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${shipToken}`,
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }
  return (
    <div className="margin-top-50">
      <div className="hdr">Approve Orders</div>
      <table style={{ width: "100%" }}>
        <tr>
          <th>Customer Name</th>
          <th>Items</th>
          <th>Price</th>
          <th>Payment Status</th>
          <th>Payment Mode</th>
          <th>Address</th>
          <th>Approve </th>
        </tr>
        {table}
      </table>
    </div>
  );
}

export default ApproveOrders;
