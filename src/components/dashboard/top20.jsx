import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { api } from "../config";
import FLC from "../firstLetterCapital";
import CC from "../currencyConverter";

function Top20() {
  const [html, setHtml] = useState([]);

  useEffect(() => {
    axios.post(`${api}/inventory/top-20-viewed-items`).then((res) => {
      init(res.data);
    });
  }, []);

  function init(data) {
    var htm = [];
    for (let i = 0; i < data.length; i++) {
      const linkTo = `/itemview/${data[i]._id}`;
      const views = data[i]?.views === undefined ? 0 : data[i].views;
      const imgPath = `/assets/images/uploads/${data[i].images[0]}`;
      const temp = (
        <div className="items">
          <div class="card row-flex">
            <img src={imgPath}></img>
            <div class="details col-flex">
              <label>
                Item Name: <Link to={linkTo}>{FLC(data[i].item_name)}</Link>
              </label>
              <label>
                Item Price: <label class="grey-font">{CC(data[i].price)}</label>
              </label>
              <label>
                Views: <label class="grey-font">{views}</label>
              </label>
            </div>
          </div>
        </div>
      );

      htm.push(temp);
    }
    setHtml(htm);
  }

  return (
    <div class="top-20">
      <div class="hdr">Top 20 Viewed products</div>
      {html}
    </div>
  );
}

export default Top20;
