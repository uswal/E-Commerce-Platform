import React, { useState, useEffect } from "react";
import axios from "axios";
import { Slide } from "react-slideshow-image";
import "./css/chronicles.css";
import { api } from "../components/config";

//! - using lookbook directory for chronicles as well
const slideImages = [
  "/assets/featuredslides/f1.jpg",
  "/assets/featuredslides/f1.jpg",
  "/assets/featuredslides/f1.jpg",
];

function Chronicles(props) {
  const [html, setHtml] = useState([]);

  const [hdr, setHdr] = useState([]);

  useEffect(() => {
    var type = props.match.params.category;

    if (type === undefined) type = "press";

    type = type.toLowerCase();
    if (type === "press") setHdr("Press / Media coverage");
    else if (type === "client-diary") setHdr("Client Diary");
    else if (type === "collaboration") setHdr("Collaboration");
    else if (type === "curated-trends") setHdr("Curated Trends");

    getData(type);
  }, []);

  function getData(type) {
    axios.post(`${api}/misc/serve-chronicles`, { type }).then((res) => {
      generateHtml(res.data);
    });
  }

  function generateHtml(data) {
    //console.log(data);
    var list = [];
    for (let i = 0; i < data.img.length; i++) {
      const temp = (
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${data.img[i]})` }}>
            <span className="box">
              <label className="cap">{data.cap[i]}</label>
              <label className="title">{data.title[i]}</label>
              <label className="desc">{data.desc[i]}</label>
            </span>
          </div>
        </div>
      );
      list.push(temp);
    }

    setHtml(
      <Slide easing="ease" indicators={true}>
        {list}
      </Slide>
    );
  }
  return (
    <div className="content chronicles">
      <div className="hdr">{hdr}</div>

      {html}
    </div>
  );
}

export default Chronicles;
