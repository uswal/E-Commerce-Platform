import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import "./css/featuredSlides.css";

//https://react-slideshow.herokuapp.com/
// https://www.npmjs.com/package/react-slideshow-image

// get config from file
//import { jsonn } from "./fVariables.js";

function change(oldIndex, newIndex) {
  //
}

function FeaturedSlides(props) {
  const obj = props.obj;

  return (
    <div class="fs">
      <Slide easing="ease" indicators={true} arrows={false} onChange={change}>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${obj.imgPath[0]})`,
              backgroundColor: `whitesmoke`,
            }}
          >
            <div class="f-side f-right">
              <label class="f-caption">{obj.caption[0]}</label>
              <label class="f-title f-t-1">{obj.title1[0]}</label>
              <label class="f-title f-t-2">{obj.title2[0]}</label>
              <label class="f-desc">{obj.description[0]}</label>
              <Link to={obj.link[0]}>
                <span class="f-btn">Shop now</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${obj.imgPath[1]})`,
              backgroundColor: `whitesmoke`,
            }}
          >
            <div class="f-side f-left">
              <label class="f-caption">{obj.caption[1]}</label>
              <label class="f-title f-t-1">{obj.title1[1]}</label>
              <label class="f-title f-t-2">{obj.title2[1]}</label>
              <label class="f-desc">{obj.description[1]}</label>
              <Link to={obj.link[1]}>
                <span class="f-btn">Shop now</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${obj.imgPath[2]})`,
              backgroundColor: `whitesmoke`,
            }}
          >
            <div class="f-side f-right">
              <label class="f-caption">{obj.caption[2]}</label>
              <label class="f-title f-t-1">{obj.title1[2]}</label>
              <label class="f-title f-t-2">{obj.title2[2]}</label>
              <label class="f-desc">{obj.description[2]}</label>
              <Link to={obj.link[2]}>
                <span class="f-btn">Shop now</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${obj.imgPath[3]})`,
              backgroundColor: `whitesmoke`,
            }}
          >
            <div class="f-side f-left">
              <label class="f-caption">{obj.caption[3]}</label>
              <label class="f-title f-t-1">{obj.title1[3]}</label>
              <label class="f-title f-t-2">{obj.title2[3]}</label>
              <label class="f-desc">{obj.description[3]}</label>
              <Link to={obj.link[3]}>
                <span class="f-btn">Shop now</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${obj.imgPath[4]})`,
              backgroundColor: `whitesmoke`,
            }}
          >
            <div class="f-side f-right">
              <label class="f-caption">{obj.caption[4]}</label>
              <label class="f-title f-t-1">{obj.title1[4]}</label>
              <label class="f-title f-t-2">{obj.title2[4]}</label>
              <label class="f-desc">{obj.description[4]}</label>
              <Link to={obj.link[4]}>
                <span class="f-btn">Shop now</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${obj.imgPath[5]})`,
              backgroundColor: `whitesmoke`,
            }}
          >
            <div class="f-side f-left">
              <label class="f-caption">{obj.caption[5]}</label>
              <label class="f-title f-t-1">{obj.title1[5]}</label>
              <label class="f-title f-t-2">{obj.title2[5]}</label>
              <label class="f-desc">{obj.description[5]}</label>
              <Link to={obj.link[5]}>
                <span class="f-btn">Shop now</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${obj.imgPath[6]})`,
              backgroundColor: `whitesmoke`,
            }}
          >
            <div class="f-side f-right">
              <label class="f-caption">{obj.caption[6]}</label>
              <label class="f-title f-t-1">{obj.title1[6]}</label>
              <label class="f-title f-t-2">{obj.title2[6]}</label>
              <label class="f-desc">{obj.description[6]}</label>
              <Link to={obj.link[6]}>
                <span class="f-btn">Shop now</span>
              </Link>
            </div>
          </div>
        </div>
      </Slide>
      <style id="fz"></style>
    </div>
  );
}

export default FeaturedSlides;
