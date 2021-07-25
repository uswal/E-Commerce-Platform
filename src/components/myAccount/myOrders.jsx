import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { api } from "../config";
import { Link } from "react-router-dom";
import firstLetterCapital from "../firstLetterCapital";
import { MyContext } from "../myProvider";

function MyOrders() {
  const context = useContext(MyContext);

  const [table, setTable] = useState([]);
  const [trans, setTrans] = useState([]);
  const [forHidingTable, setForHidingTable] = useState("");

  function dynamicsort(property, order) {
    var sort_order = 1;
    if (order === "desc") {
      sort_order = -1;
    }
    return function (a, b) {
      // a should come before b in the sorted order
      if (a[property] < b[property]) {
        return -1 * sort_order;
        // a should come after b in the sorted order
      } else if (a[property] > b[property]) {
        return 1 * sort_order;
        // a and b are the same
      } else {
        return 0 * sort_order;
      }
    };
  }

  function getDetails() {
    axios
      .post(`${api}/accounts/transaction-history`, {
        _id: Cookies.get("id"),
      })
      .then((res) => {
        //console.log(res.data);
        var sortedData = res.data.sort(dynamicsort("createdAt", "asc"));
        updateTable(sortedData);
      });
  }

  function requestInvoice(_id) {
    context.alert("Your invoice will start downloading in some seconds.");
    axios.post(`${api}/transactions/get-invoice/`, { _id }).then((res) => {
      //console.log(res.data);
      download(`Invoice-${res.data.date}.pdf`, res.data.file);
    });
  }

  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:application/pdf;base64," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function updateTable(data) {
    //console.log(data);
    var html = [];
    if (data.length < 1) {
      //Do something like - show some message
      setTrans(
        <div class="if-no-transactions">
          You don't have any transactions yet, <Link to="/shop">Shop Now</Link>
        </div>
      );
      setForHidingTable(".history .table{display:none}");
      return;
    }

    for (let i = data.length - 1; i >= 0; i--) {
      var itemsString = "";
      const nameList = data[i].item_list?.item_name;
      if (nameList === undefined) return;
      nameList.forEach((elem) => {
        itemsString += elem + ", ";
      });
      itemsString = itemsString.slice(0, -2);
      const date = new Date(data[i].createdAt);

      const temp = (
        <tr class="card">
          <td class="small-t">{date.toDateString()}</td>
          <td class="items">{firstLetterCapital(itemsString)}</td>
          <td class="small-t">{data[i].status}</td>
          <td class="small-t">
            {/* <Link to="/">MORE</Link> */}
            <button
              className="download"
              onClick={() => {
                requestInvoice(data[i]._id);
              }}
            >
              DOWNLOAD
            </button>
          </td>
        </tr>
      );
      html.push(temp);
    }

    setTable(html);
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div class="history col-flex">
      <div class="hdr">History</div>
      {trans}
      <table class="table">
        <tr>
          <th class="small-t">Date</th>
          <th class="items">Items</th>
          <th class="small-t"> Status</th>
          <th class="small-t"> Invoice</th>
        </tr>
        {table}
      </table>
      <style>{forHidingTable}</style>
    </div>
  );
}

export default MyOrders;
