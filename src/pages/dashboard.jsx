import React, { Component } from "react";

import HomeSlides from "../components/dashboard/homeSlides";
import AddItem from "../components/dashboard/addItem";
import Visitors from "../components/dashboard/visitors";
import NavShopNow from "../components/dashboard/navShopNow";
import NavLookBook from "../components/dashboard/navLookBook";
import NavSootiChronicles from "../components/dashboard/navSootiChronicles";
import AboutUs from "../components/dashboard/navAboutUs";
import Top20 from "../components/dashboard/top20";
import OrdersAndIncome from "../components/dashboard/ordersAndIncome";
import ApproveOrders from "../components/dashboard/approveOrders";
import DeleteProduct from "../components/dashboard/deleteProductFromId";
import EditProduct from "../components/dashboard/editProductFromId";
import BackendLookbook from "../components/dashboard/backendLookbook";
import Chronicles from "../components/dashboard/chroniclesBackend";
import ApproveOrders_2 from "../components/dashboard/approveOrders_2";

import "./css/dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bb: <Chronicles />,
    };
  }
  changeBB(props) {
    this.setState({ bb: props });
  }
  render() {
    return (
      <div class="dashboard">
        <div class="cold aa">
          <ul>
            <li onClick={() => this.changeBB(<AddItem />)}>Add items</li>
            <li onClick={() => this.changeBB(<BackendLookbook />)}>
              Look book
            </li>
            <li onClick={() => this.changeBB(<Chronicles />)}>
              Sooti Chronicles
            </li>
            <li onClick={() => this.changeBB(<DeleteProduct />)}>
              Delete Product
            </li>
            <li>Shop a look items</li>
            <li onClick={() => this.changeBB(<HomeSlides />)}>Home Slides</li>
            <li onClick={() => this.changeBB(<ApproveOrders_2 />)}>
              Approve Orders
            </li>
            <li onClick={() => this.changeBB(<OrdersAndIncome />)}>
              Orders & Income
            </li>
            <li onClick={() => this.changeBB(<Visitors />)}>
              Visitors Locations
            </li>

            <li onClick={() => this.changeBB(<Top20 />)}>Top 20 products</li>
          </ul>
        </div>

        <div class="cold bb" id="bb">
          {/* <AddItem /> */}
          {this.state.bb}
        </div>

        <style id="applying-helper"></style>
        <style>{`#navbar,#upnav,.footer-ctr{
      display:none;
    }
    .sticky + .content {
      padding-top: 0;
    }
    `}</style>
      </div>
    );
  }
}

export default Dashboard;
