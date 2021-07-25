import React from "react";
import axios from "axios";
import { api } from "../config";
function DeleteProductFromId() {
  function askConfirmation() {
    var str = prompt(`Are you sure you want to delete this product? \n
      Type "YES" or "NO"
      `);
    str = str.toLowerCase().trim();
    if (str === "yes") sendDeleteRequest();
    else alert("Product deletion canceled!");
  }

  function sendDeleteRequest() {
    const elem = document.getElementById("id");
    const id = elem.value.trim();
    axios
      .post(`${api}/inventory/delete-product-from-id`, { id })
      .then((res) => {
        if (res.data) {
          elem.value = "";
          alert("Product deleted!");
        } else alert("Deletion failed!");
      });
  }

  return (
    <div className="margin-top-50">
      <label className="hdr">Enter product id</label> <br></br>
      <input id="id" type="text"></input> <br></br>
      <button
        className="btn btn-red"
        onClick={() => {
          askConfirmation();
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteProductFromId;
