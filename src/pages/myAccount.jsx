import React, { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { MyContext } from "../components/myProvider";

import "./css/myAccount.css";

import AccountDashboard from "../components/myAccount/accountDashboard";
import MyOrders from "../components/myAccount/myOrders";
import AccountInformation from "../components/myAccount/accountInformation";

const remove = "#navbar .secondary{display:none}";

class MyAccount extends Component {
  constructor(props) {
    super(props);
    //console.log(props.match.params.type);
    var rightCol = <AccountDashboard />;
    var style = ".acd{font-weight:bold}";
    if (props.match.params.type === "my-orders") {
      rightCol = <MyOrders />;
      style = ".mo{font-weight:bold}";
    }
    this.state = {
      rightCol: rightCol,
      style: style,
      redirect: null,
    };

    //if (props.match.params.type === "wish-list")
  }
  changeToAcDb() {
    this.setState({
      rightCol: <AccountDashboard />,
      style: ".acd{font-weight:bold}",
    });
  }
  componentDidMount() {
    const id = Cookies.get("id");
    //console.log(id);
    if (id === undefined) this.setState({ redirect: "/" });
  }
  styleHandler(id) {
    const str = `.${id}{font-weight:bold}`;
    this.setState({ style: str });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <MyContext.Consumer>
        {(context) => (
          <React.Fragment>
            <div className="my-account">
              <div className="colm a">
                <div className="container col-flex">
                  <div className="hdr">Account Navigation</div>

                  <ul className="options">
                    <li
                      class="acd"
                      onClick={() => {
                        this.styleHandler("acd");
                        this.setState({ rightCol: <AccountDashboard /> });
                      }}
                    >
                      Account Dashboard
                    </li>
                    <li
                      class="mo"
                      onClick={() => {
                        this.styleHandler("mo");
                        this.setState({ rightCol: <MyOrders /> });
                      }}
                    >
                      My Orders
                    </li>
                    <li
                      class="mw"
                      onClick={() => {
                        // this.styleHandler("mw");
                        context.wishlistOpen();
                      }}
                    >
                      My Wishlist
                    </li>
                    <li
                      class="mc"
                      onClick={() => {
                        //this.styleHandler("mc");
                        context.cartManipulator(false); //It takes current state of cart
                      }}
                    >
                      My Cart
                    </li>
                    {/* <li
                      class="ab"
                      onClick={() => {
                        this.styleHandler("ab");
                      }}
                    >
                      Address Book
                    </li> */}
                    <li
                      class="ai"
                      onClick={() => {
                        this.setState({
                          rightCol: (
                            <AccountInformation
                              fun={() => {
                                this.changeToAcDb();
                              }}
                            />
                          ),
                        });
                        this.styleHandler("ai");
                      }}
                    >
                      Account Information
                    </li>
                  </ul>

                  <button
                    className="black logout"
                    onClick={() => {
                      context.logMeOut();
                      this.setState({ redirect: "/" });
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
              <div className="colm b col-flex">
                <div className="container">{this.state.rightCol}</div>
              </div>

              <style>{this.state.style}</style>
              <style>{remove}</style>
            </div>
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}

export default MyAccount;
