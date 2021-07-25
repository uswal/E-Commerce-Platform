import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import NavRightElements from "./navRightElements";
import { MyContext } from "./myProvider";

const removeElem = `#navbar .cardd #ac{display:none}`;

const openingAnimate = `#navbar .ham .ctr{width:320px}#navbar .ham{background-color: rgba(0,0,0,0.5)}`;
const closingAnimate = `#navbar .ham .ctr{width:0px}#navbar .ham{background-color: rgba(0,0,0,0)}#navbar .title-n{opacity:0}`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function NavBarMenu(props) {
  const [opH, setOpH] = useState("");

  useEffect(() => {
    opAnimate();
    curInit();
  }, []);

  async function opAnimate() {
    await sleep(10);
    setOpH(openingAnimate);
  }

  async function close() {
    setOpH(closingAnimate);
    await sleep(500);
    props.close();
  }

  function curInit() {
    var currency = Cookies.get("currency");

    if (currency === undefined) {
      Cookies.set("currency", "INR", { expires: 360 });
      currency = "INR";
    }

    document.getElementById("currency-upnavv").value = currency;
  }
  function updateCur() {
    const currency = document.getElementById("currency-upnavv").value;
    Cookies.set("currency", currency, { expires: 360 });
    document.getElementById("currency-upnav").value = currency;
    window.location.reload(false); //Bad practice, Yeah yeah
  }
  return (
    <MyContext.Consumer>
      {(context) => (
        <React.Fragment>
          <div className="ham">
            <div className="ctr">
              <p className="title-n">
                NAVIGATION
                <button class="cross-n" onClick={close}>
                  X
                </button>
              </p>
              <div className="contents">
                <div className="cardd">
                  <span className="float-left">
                    <select id="currency-upnavv" onChange={updateCur}>
                      <option value="INR">INR</option>
                      <option value="GBP">GBP</option>
                      <option value="USD">USD</option>
                      <option value="AED">AED</option>
                    </select>
                  </span>
                  <span className="float-right" onClick={close}>
                    <NavRightElements />
                  </span>
                </div>
                <div className="cardd" onClick={close}>
                  {context.state.miniAccountState}
                </div>

                <div className="cardd">
                  <Link to="/" onClick={close}>
                    SHOP NOW
                  </Link>
                </div>
                <div className="cardd">
                  <Link to="/shop" onClick={close}>
                    JUST IN
                  </Link>
                  <div className="sub-links col-flex">
                    <Link to="/shop" onClick={close}>
                      All
                    </Link>
                    <Link to="/shop/dress" onClick={close}>
                      Dresses
                    </Link>
                    <Link to="/shop/topwear" onClick={close}>
                      Top + Shirt
                    </Link>
                    <Link to="/shop/bottomwear" onClick={close}>
                      Trousers + Skirts
                    </Link>
                    <Link to="/shop/outerwear" onClick={close}>
                      Outerwear
                    </Link>
                  </div>
                </div>
                <div className="cardd">
                  <Link to="/look-book" onClick={close}>
                    LOOK BOOK
                  </Link>
                  <div className="sub-links col-flex">
                    <Link to="/look-book/point-perspective" onClick={close}>
                      Point to Perspective
                    </Link>
                    <Link to="/look-book/into-the-garden" onClick={close}>
                      Into the Garden
                    </Link>
                  </div>
                </div>
                <div className="cardd">
                  <Link to="/sooti-chronicles" onClick={close}>
                    SOOTI CHRONICLES
                  </Link>
                  <div className="sub-links col-flex">
                    <Link to="/sooti-chronicles/press" onClick={close}>
                      Press / Media Coverage
                    </Link>
                    <Link to="/sooti-chronicles/collaboration" onClick={close}>
                      Collaboration
                    </Link>
                    <Link to="/sooti-chronicles/client-diary" onClick={close}>
                      Client Diary
                    </Link>
                    <Link to="/sooti-chronicles/curated-trends" onClick={close}>
                      Journal
                    </Link>
                  </div>
                </div>
                <div className="cardd last-cardd">
                  <Link to="/why-us" onClick={close}>
                    WHY US
                  </Link>
                  {/* <div className="sub-links col-flex">
                    <Link to="#" onClick={close}>
                      Why us!
                    </Link>
                    <Link to="/our-story" onClick={close}>
                      Our Story
                    </Link>
                    <Link to="#" onClick={close}>
                      Business & Process
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
            <style>{removeElem}</style>
            <style>{opH}</style>
          </div>
        </React.Fragment>
      )}
    </MyContext.Consumer>
  );
}

export default NavBarMenu;
