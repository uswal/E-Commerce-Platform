import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./css/navBar.css";

import ScriptTag from "react-script-tag";
import NavBarMenu from "./navBarMenu";
import NavRightElements from "./navRightElements";
import { MyContext } from "./myProvider";

// ! Navigation bar script isn't working as intended

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function animateOpening(l) {
  var v = document.getElementById(`${l}-q`);
  v.classList.add("vis");
  const elem = document.getElementById("nav-drop-helper");
  elem.innerHTML = `
  .shop-now-eq{visibility: hidden;
    opacity: 0}
  `;

  await sleep(100);

  elem.innerHTML = `
  .shop-now-eq{visibility: visible;
    opacity: 1}
  `;
}
async function animateOpeningAC(l) {
  var v = document.getElementById(`${l}-q`);
  v.classList.add("vis");
  const elem = document.getElementById("nav-drop-helper");
  elem.innerHTML = `
  .ac-eq{visibility: hidden;
    opacity: 0}
  `;

  await sleep(100);

  elem.innerHTML = `
  .ac-eq{visibility: visible;
    opacity: 1}
  `;
}

function add() {
  document.getElementById("shop-now").onmouseover = function () {
    animateOpening("shop-now");
  };
  document.getElementById("shop-now").onmouseout = function () {
    hide("shop-now");
  };
  document.getElementById("look-book").onmouseover = function () {
    animateOpening("look-book");
  };
  document.getElementById("look-book").onmouseout = function () {
    hide("look-book");
  };
  document.getElementById("sooti-chronicles").onmouseover = function () {
    animateOpening("sooti-chronicles");
  };
  document.getElementById("sooti-chronicles").onmouseout = function () {
    hide("sooti-chronicles");
  };
  // document.getElementById("about-us").onmouseover = function () {
  //   animateOpening("about-us");
  // };
  // document.getElementById("about-us").onmouseout = function () {
  //   hide("about-us");
  // };
  document.getElementById("ac").onmouseover = function () {
    animateOpeningAC("ac");
  };
  document.getElementById("ac").onmouseout = function () {
    hide("ac");
  };
}

// function show(l) {
//   var v = document.getElementById(`${l}-q`);
//   v.classList.add("vis");
// }
function hide(l) {
  var v = document.getElementById(`${l}-q`);
  v.classList.remove("vis");
}

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownMiniAccountStatus: "",
      mobileNav: [],
      navScroll: [],
    };
  }

  closeMobileNav = () => {
    this.setState({ mobileNav: [] });
  };
  componentDidMount() {
    this.setState({
      navScroll: <ScriptTag type="text/javascript" src="scripts/navBar.js" />,
    });
    add();
  }

  render() {
    return (
      <div id="navbar" class="navbar">
        {/* Hamburger icon */}

        <img
          class="menu-i"
          src="/assets/icons/menu.svg"
          onClick={() => {
            this.setState({
              mobileNav: (
                <NavBarMenu
                  close={() => {
                    this.closeMobileNav();
                  }}
                />
              ),
            });
          }}
        ></img>

        {this.state.mobileNav}
        {/* Mini-cart-tooglle-state */}
        <MyContext.Consumer>
          {(context) => (
            <React.Fragment>
              {context.state.miniCartState}
              {context.state.miniAccountPopup}
              {context.state.searchPopup}
              {context.state.alertPopup}
              {context.state.wishlistState}
            </React.Fragment>
          )}
        </MyContext.Consumer>

        <style id="tt"></style>
        <style id="nav-helper-pc"></style>
        <style id="nav-drop-helper"></style>

        <div class="big">
          <p>
            <Link to="/">
              <img
                id="navbar-logo"
                class="navbar-logo"
                src="/assets/images/Logo_1.png"
              ></img>
            </Link>
          </p>
        </div>

        <div class="nav-contents nav-a">
          <p>
            <Link id="stockist" to="/">
              Shop Now
            </Link>
            <Link id="shop-now" class="shop-now" to="/shop">
              Just In!
            </Link>
            <Link id="look-book" to="/look-book">
              Look Book
            </Link>
            <Link to="/">
              <img
                id="hidden-logo"
                class="hidden-logo"
                src="/assets/images/Logo_1.png"
              ></img>
            </Link>
            {/* <Link id="bespoke" to="/">
              Bespoke
            </Link> */}

            <Link id="sooti-chronicles" to="/sooti-chronicles">
              Sooti Chronicles
            </Link>
            <Link id="about-us" to="/why-us">
              About Us
            </Link>
          </p>
        </div>

        <div class="secondary nav-a">
          <div class="fsocials">
            <a href="https://www.facebook.com/sootistudio/" target="_blank">
              <svg
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                stroke="black"
                class="icons fill fnl"
                stroke-width="0"
              >
                {" "}
                <path d="M17.525,9H14V7c0-1.032,0.084-1.682,1.563-1.682h1.868v-3.18C16.522,2.044,15.608,1.998,14.693,2 C11.98,2,10,3.657,10,6.699V9H7v4l3-0.001V22h4v-9.003l3.066-0.001L17.525,9z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/sootistudio/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="black"
                stroke="black"
                stroke-width="0"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icons fill fnl"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>

            <a href="https://www.instagram.com/sootistudio/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icons no-fill fnl"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=+91%2070115%2007044&text=Hello!%20Sooti%20Studio,"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                version="1.1"
                class="icons fill fnl"
              >
                <path
                  d="M19.078 4.93A9.912 9.912 0 0 0 12.012 2c-5.508 0-9.989 4.48-9.989 9.984a9.911 9.911 0 0 0 1.332 4.993l-1.417 5.175 5.296-1.39a10.003 10.003 0 0 0 4.774 1.218h.004c5.504 0 9.984-4.48 9.988-9.988a9.918 9.918 0 0 0-2.922-7.062zm-2.18 10.625c-.207.582-1.226 1.144-1.683 1.183-.461.043-.89.207-2.996-.62-2.54-1-4.14-3.602-4.266-3.77-.125-.164-1.016-1.352-1.016-2.578 0-1.23.645-1.832.872-2.082.23-.25.5-.313.668-.313.164 0 .332 0 .476.008.18.004.375.015.563.43.222.492.707 1.726.77 1.851.062.125.105.274.019.438-.082.168-.125.27-.246.418-.125.144-.262.324-.375.433-.125.125-.254.262-.11.512.145.25.645 1.066 1.387 1.726.953.852 1.758 1.114 2.008 1.239s.394.105.539-.063c.148-.164.625-.726.793-.976.164-.25.332-.207.558-.125.23.082 1.457.687 1.707.812s.414.188.477.29c.062.105.062.605-.145 1.187z"
                  id="surface1"
                />
              </svg>
            </a>
          </div>

          <div class="right nav-a">
            <NavRightElements />

            {/* <label id="cart-count">{this.state.itemsCart}</label> */}
          </div>
        </div>
        {this.state.navScroll}
        {/* <ScriptTag type="text/javascript" src="scripts/navBar.js" /> */}
        {/* Shop now drop down */}
        <div id="shop-now-q" class="shop-now-eq nav-a">
          <div class="hover-fix">
            <div class="col left">
              <div class="contents col-flex">
                <Link to="/shop">All</Link>
                <Link to="/shop/dress">Dresses</Link>
                <Link to="/shop/topwear">Top + Shirt</Link>
                <Link to="/shop/bottomwear">Trousers + Skirts</Link>
                <Link to="/shop/outerwear">Outerwear</Link>
              </div>
            </div>
            <div class="col right">
              <div class="contents row-flex">
                <Link to="/itemview/6069b81d91d290649e1a452c">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4558.jpg"
                  ></img>
                </Link>
                <Link to="/itemview/6069ca1191d290649e1a453c">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A5006.jpg"
                  ></img>
                </Link>
                <Link to="/itemview/6069ba2e91d290649e1a452e">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4710.jpg"
                  ></img>
                </Link>
                <Link to="/itemview/6069bb3e91d290649e1a452f">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4897.jpg"
                  ></img>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Look Book drop down */}
        <div id="look-book-q" class="shop-now-eq nav-a">
          <div class="hover-fix">
            <div class="col left">
              <div class="contents col-flex">
                <Link to="/look-book/point-perspective">Point Perspective</Link>
                <Link to="/look-book/into-the-garden">Into The Garden</Link>
              </div>
            </div>
            <div class="col right">
              <div class="contents row-flex">
                <Link to="/itemview/6069c49191d290649e1a4538">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4972.jpg"
                  ></img>
                </Link>
                <Link to="/itemview/6069c49191d290649e1a4538">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4972.jpg"
                  ></img>
                </Link>
                <Link to="/itemview/6069c49191d290649e1a4538">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4972.jpg"
                  ></img>
                </Link>
                <Link to="/itemview/6069c49191d290649e1a4538">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4972.jpg"
                  ></img>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sooti Chronicles */}
        <div id="sooti-chronicles-q" class="shop-now-eq nav-a">
          <div class="hover-fix">
            <div class="col left">
              <div class="contents col-flex">
                <Link to="/sooti-chronicles/press">Press / Media coverage</Link>
                <Link to="/sooti-chronicles/collaboration">Collaboration</Link>
                <Link to="/sooti-chronicles/client-diary">Client Diary</Link>
                <Link to="/sooti-chronicles/curated-trends">
                  Curated Trends
                </Link>
              </div>
            </div>
            <div class="col right">
              <div class="contents row-flex">
                <Link to="/itemview/6069b92291d290649e1a452d">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4442.jpg"
                  ></img>
                </Link>
                <Link to="/itemview/6069b60d91d290649e1a452a">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4737.jpg"
                  ></img>
                </Link>
                <Link to="/itemview/6069bc0691d290649e1a4530">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4890.jpg"
                  ></img>
                </Link>
                <Link to="/itemview/6069c49191d290649e1a4538">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4972.jpg"
                  ></img>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* About us */}
        <div id="about-us-q" class="shop-now-eq nav-a">
          <div class="hover-fix">
            <div class="col left">
              <div class="contents col-flex">
                <Link to="/why-us">Why Us!</Link>
                <Link to="/our-story">Our Story</Link>
                <Link to="/">Business & Process</Link>
              </div>
            </div>
            <div class="col right">
              <div class="contents row-flex">
                <Link to="/itemview/6069c49191d290649e1a4538">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4972.jpg"
                  ></img>
                </Link>
                <Link to="/itemview/6069c49191d290649e1a4538">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4972.jpg"
                  ></img>
                </Link>
                <Link to="/itemview/6069c49191d290649e1a4538">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4972.jpg"
                  ></img>
                </Link>
                <Link to="/itemview/6069c49191d290649e1a4538">
                  <img
                    className="tiles"
                    src="/assets/images/uploads/194A4972.jpg"
                  ></img>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {this.state.navScroll}
      </div>
    );
  }
}

export default NavBar;
