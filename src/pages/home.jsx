import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from "../components/config";
import FeaturedSlides from "../components/featuredSlides";

import "./css/home.css";

function Home() {
  const [fs, setFs] = useState([]);
  useEffect(() => {
    axios.post(`${api}/misc/serve-fslides`).then((res) => {
      setFs(<FeaturedSlides obj={res.data} />);
    });
  }, []);
  return (
    <div>
      {/* <UpNavBar />
        <NavBar /> */}
      <div class="content col-flex">
        {/* <FeaturedSlides /> */}
        {fs}
        <div class="basic-options">
          <div class="img-container">
            <img class="bcol" src="/assets/covers/basic_dress.png"></img>
            <Link to="/shop/dress">
              <div class="a-cap">DRESS</div>
            </Link>
          </div>

          <div class="img-container">
            <img class="bcol" src="/assets/covers/basic_topwear.png"></img>
            <Link to="/shop/topwear">
              <div class="a-cap">TOPWEAR</div>
            </Link>
          </div>

          <div class="img-container">
            <img class="bcol" src="/assets/covers/basic_overlays.png"></img>
            <Link to="/shop/outerwear">
              <div class="a-cap">OUTERWEAR</div>
            </Link>
          </div>

          <div class="img-container">
            <img class="bcol" src="/assets/covers/basic_bottomwear.png"></img>
            <Link to="/shop/bottomwear">
              <div class="a-cap">BOTTOMWEAR</div>
            </Link>
          </div>
        </div>

        <p class="ig-hdr-container">
          <p class="caption">
            <label
              style={{
                fontWeight: "400",
                fontSize: "18px",
                paddingBottom: "20px",
              }}
            >
              <label style={{ fontWeight: "bold" }}>#sootistudio</label>{" "}
              <br></br>Follow our feed for daily style inspiration and tag us to
              spread the love<br></br>
            </label>
            <br></br>
            <a href="https://www.instagram.com/sootistudio/" target="_blank">
              @INSTAGRAM
            </a>
          </p>
        </p>
        {/* TODO */}
        <div class="instagram-grid">
          <div class="insgcol">
            <a href="https://www.instagram.com/p/CDGXl5fJ1E3/" target="_blank">
              <img src="/assets/covers/one.jpg"></img>
            </a>
          </div>
          <div class="insgcol">
            <a href="https://www.instagram.com/p/CCzE5uIJ1HD/" target="_blank">
              <img src="/assets/covers/two.jpg"></img>
            </a>
          </div>
          <div class="insgcol">
            <a href="https://www.instagram.com/p/CC_6r1WpdCS/" target="_blank">
              <img src="/assets/covers/basic_dress.png"></img>
            </a>
          </div>
          <div class="insgcol">
            <a href="https://www.instagram.com/p/CCt7LTOJcEi/" target="_blank">
              <img src="/assets/covers/basic_topwear.png"></img>
            </a>
          </div>
          <div class="insgcol">
            <a href="https://www.instagram.com/p/CEZQ0hPl7Tz/" target="_blank">
              <img src="/assets/covers/basic_bottomwear.png"></img>
            </a>
          </div>
          <div class="insgcol">
            <a href="https://www.instagram.com/p/CC5uzAXJ2hJ/" target="_blank">
              <img src="/assets/covers/basic_overlays.png"></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
