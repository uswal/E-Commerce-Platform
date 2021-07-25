import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/banner";
import { api } from "../components/config";
import "./css/lookbook.css";

function Lookbook(props) {
  const [html, setHtml] = useState([]);
  const [hdr, setHdr] = useState([]);

  useEffect(() => {
    var type = props.match.params.category;
    if (type === undefined) type = "point-perspective";

    type = type.toLowerCase();
    if (type === "point-perspective") setHdr("Point Perspective");
    else if (type === "into-the-garden") setHdr("Into The Garden");

    getData(type);
  }, []);

  function getData(type) {
    axios.post(`${api}/misc/serve-lookbook`, { type }).then((res) => {
      //console.log(res.data);
      generateHTML(res.data);
    });
  }

  function generateHTML(data) {
    const list = [];
    for (let i = 0; i < data.img.length; i++) {
      const link = `/itemview/${data.id[i]}`;
      const temp = (
        <div class="ctr">
          <Link to={link}>
            <img src={data.img[i]}></img>
            <label>{data.title[i]}</label>
          </Link>
        </div>
      );
      list.push(temp);
    }
    setHtml(list);
  }
  return (
    <div className="content lookbook">
      <div className="hdr">{hdr}</div>

      {html}
    </div>
  );
}

export default Lookbook;
