import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "./index.css";
import "./pages/css/global.css";
import "./pages/css/phone.css";

import reportWebVitals from "./reportWebVitals";
import Home from "./pages/home";
import WhyUs from "./pages/whyUs";
import DesignerE from "./pages/designerE";
import ScrollToTop from "./components/scrollToTop";
import Register from "./pages/register";
import Admin from "./pages/admin";
import Lookbook from "./pages/lookbook";
import ItemView from "./pages/itemView";
import Checkout from "./pages/checkout";
import MyAccount from "./pages/myAccount";
import ShippingReturns from "./pages/shippingReturns";
import Chronicles from "./pages/chronicles";
import OurStory from "./pages/ourStory";

import Error404 from "./components/error404";
import Footer from "./components/footer";
import NavBar from "./components/navBar";
import UpNavBar from "./components/upNavBar";
import Fonts from "./components/fonts";
import WatsappBottomRight from "./components/watsappBottomRight";

import MyProvider from "./components/myProvider";
import PrivacyPolicy from "./pages/privacyPolicy";
import TermsConditions from "./pages/termsConditions";
import PaymentInformation from "./pages/paymentInformation";

ReactDOM.render(
  <Router>
    <Fonts />
    <ScrollToTop />
    <div id="render-stuff-below">
      <MyProvider>
        <WatsappBottomRight />
        <UpNavBar />
        <NavBar />
        <div class="col-flex">
          <div class="content">
            <Switch>
              {/* <Route path="/wishlist" component={Wishlist} /> */}
              <Route
                path="/checkout"
                component={(props) => (
                  <Checkout {...props} key={window.location.pathname} />
                )}
              />
              <Route path="/itemview/:id" component={ItemView} />
              {/* <Route path="/dashboard" component={Dashboard} /> */}
              <Route path="/admin" component={Admin} />
              <Route path="/register" component={Register} />

              <Route
                path="/my-account/:type?"
                component={(props) => (
                  <MyAccount {...props} key={window.location.pathname} />
                )}
              />
              <Route
                path="/shop/:category?"
                component={(props) => (
                  <DesignerE {...props} key={window.location.pathname} />
                )}
              />

              <Route
                path="/look-book/:category?"
                component={(props) => (
                  <Lookbook {...props} key={window.location.pathname} />
                )}
              />
              <Route
                path="/sooti-chronicles/:category?"
                component={(props) => (
                  <Chronicles {...props} key={window.location.pathname} />
                )}
              />

              <Route path="/our-story" component={OurStory} />
              <Route path="/why-us" component={WhyUs} />
              <Route path="/error-404" component={Error404} />
              <Route path="/payment-returns" component={PaymentInformation} />
              <Route path="/shipping" component={ShippingReturns} />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
              <Route path="/terms-conditions" component={TermsConditions} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
          <Footer />
        </div>
      </MyProvider>
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
