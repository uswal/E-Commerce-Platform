import React, { Component } from "react";
import CurrencyConverter, { CurrencyConverterInt } from "./currencyConverter";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";

import Wishlist from "./wishlist";
import MiniCart from "./miniCart";
import Login from "../pages/login";
import ForgotPassword from "./forgotPassword";
import Search from "./search";
import Alert from "./alert";
import { api } from "./config";
import Ip from "./ip";
import firstLetterCapital from "./firstLetterCapital";

/* ******************** NOTES *******************
For cart : Front-end : "REMOVE_FROM_CART" - "We can't just delete index and update main cart so I made id = null, and price = 0, for that removed index, when the user will load page again, it will use new cart removing all the nulls and zeros"
*/
//First we will make a new context
//TODO: Make sure to reduce the stock number in case of availStock < quanity on init
export const MyContext = React.createContext();

//And my provider is going to be one mess - ok ok
class MyProvider extends Component {
  state = {
    miniCartState: "",
    wishlistState: "",
    miniAccountPopup: [],
    searchPopup: "",

    alertPopup: "",
    alertMessage: "",
    alertStyle: {},

    cart: {
      item_img: [],
      item_name: [],
      item_id: [],
      item_price: [],
      item_quantity: [],
      item_size: [], //Each index is going to be list aswell
      item_avail_sizes: [],
    },
    current_item_stocks: [],
    cartTotalString: CurrencyConverter(0),
    cartTotalInt: 0,
    itemCount: 0,

    accountId: undefined,
    accounts: {},
    emailError: "",
    passwordError: "",

    isHiddenCartAccount:
      "#wishlist-icon,#cart,#cart-count{display:none}.ac-eq .mini-account{transform: translateX(-130px);}",

    wishlist: [],
  };

  getAccountStatusFromCookies() {
    const id = Cookies.get("id");
    this.accountManagement(id);
  }

  accountManagement = (id) => {
    if (id === undefined) {
      this.logoutStateHandler();
      return;
    }

    axios.post(`${api}/accounts/get-from-id`, { id: id }).then((res) => {
      res = res.data;
      //console.log(res);
      if (res.acc.status === "pass") {
        var newCart;
        if (res.cart.item_id === undefined) newCart = res.cart;
        else newCart = this.removeThrashFromCart(res.cart);

        //const itemCount = newCart.item_id.length;
        this.loginStateHandler(res);
        this.setState({
          accounts: res.acc,
          //cart: newCart,
          //itemCount: itemCount,
          isHiddenCartAccount: "",
          accountId: id,
          wishlist: res.wishlist,
        });
        //this.updateCart();
        this.initCurrentStocks(newCart.item_id, newCart);
      } else this.logoutStateHandler();
    });
  };

  removeThrashFromCart(oldCart) {
    var item_img = [],
      item_name = [],
      item_id = [],
      item_price = [],
      item_quantity = [],
      item_size = [],
      item_avail_sizes = [];

    for (let i = 0; i < oldCart.item_id.length; i++) {
      if (oldCart.item_id[i] === null) {
        continue;
      }

      item_img.push(oldCart.item_img[i]);
      item_name.push(oldCart.item_name[i]);
      item_id.push(oldCart.item_id[i]);
      item_price.push(oldCart.item_price[i]);
      item_quantity.push(oldCart.item_quantity[i]);
      item_size.push(oldCart.item_size[i]);
      item_avail_sizes.push(oldCart.item_avail_sizes[i]);
    }

    return {
      item_img: item_img,
      item_name: item_name,
      item_id: item_id,
      item_price: item_price,
      item_quantity: item_quantity,
      item_size: item_size,
      item_avail_sizes: item_avail_sizes,
    };
  }

  accountCrossHandler() {
    this.setState({ miniAccountPopup: "" });
  }

  loginMode() {
    this.setState({ miniAccountPopup: <Login /> });
  }

  forgotPasswordPopup() {
    this.setState({ miniAccountPopup: <ForgotPassword /> });
  }

  logoutStateHandler() {
    const state = (
      <React.Fragment>
        <div class="mini-account col-flex">
          <Link
            to="#"
            onClick={() => {
              this.loginMode();
            }}
          >
            Signin
          </Link>
          <Link to="/register">Create an account</Link>
        </div>
      </React.Fragment>
    );
    this.setState({ miniAccountState: state });
  }

  loginStateHandler(res) {
    const state = (
      <React.Fragment>
        <div class="mini-account col-flex">
          <Link to="/my-account">My Account</Link>
          <Link
            to="#"
            onClick={() => {
              this.wishlistOpen();
            }}
          >
            My Wishlist
          </Link>
          <Link to="/my-account/my-orders">My Orders</Link>
          <Link
            to="#"
            onClick={() => {
              this.logMeOut();
            }}
          >
            Logout
          </Link>
        </div>
      </React.Fragment>
    );
    this.setState({ miniAccountState: state });
    // this.alertMessageHandler("Login successfull.", "SUCCESS");
  }

  updateCart() {
    axios.post(`${api}/accounts/add-to-cart`, {
      id: this.state.accounts._id,
      cart: this.state.cart,
    });
  }

  cartManipulator = (bool) => {
    if (bool === false)
      this.setState({
        isMiniCartShowing: true,
        miniCartState: <MiniCart value={this.state.cart} />,
      });
    else this.setState({ isMiniCartShowing: false, miniCartState: "" });
  };

  cartTotal = (value, qty) => {
    var newTotal = 0;
    value.forEach((val, i) => {
      newTotal += val * qty[i];
    });

    this.setState({
      cartTotalInt: newTotal,
      cartTotalString: CurrencyConverter(newTotal),
    });
  };

  addItem = (value, stock) => {
    var tempState = this.state;
    var supposedToBeNew = true;

    var curItemIdArr = tempState.cart.item_id;
    var curItemSizeArr = tempState.cart.item_size;
    var indexId = -1;

    for (let i = 0; i < curItemIdArr.length; i++) {
      if (
        curItemIdArr[i] === value.item_id &&
        curItemSizeArr[i] === value.item_size
      ) {
        supposedToBeNew = false;
        indexId = i;
      }
    }

    if (supposedToBeNew === true) {
      tempState.cart.item_name.push(value.item_name);
      tempState.cart.item_id.push(value.item_id);
      tempState.cart.item_price.push(value.item_price);
      tempState.cart.item_quantity.push(value.item_quantity);
      tempState.cart.item_size.push(value.item_size);
      tempState.cart.item_img.push(value.item_img);
      tempState.cart.item_avail_sizes.push(value.item_avail_sizes);

      const newCount = this.state.itemCount + 1;
      this.setState({ itemCount: newCount });
    } else {
      const tstock = this.returnStock(
        this.state.cart,
        this.state.current_item_stocks,
        indexId
      ); //It takes cart and allstockList and index

      const newQuanity =
        value.item_quantity + tempState.cart.item_quantity[indexId];

      if (newQuanity > tstock) {
        this.alertMessageHandler("Already in cart!", "FAIL");
        return;
      }

      tempState.cart.item_quantity[indexId] = newQuanity;
    }

    var newStockList = this.state.current_item_stocks;
    newStockList.push(stock);
    this.setState({
      cart: tempState.cart,
      current_item_stocks: newStockList,
    }); //Long way yeah yeah, i ran into some issues - plox - neb here

    this.cartTotal(tempState.cart.item_price, tempState.cart.item_quantity);
    this.alertMessageHandler(
      `${firstLetterCapital(value.item_name)} added to cart.`,
      "SUCCESS"
    );
  };

  qtyHandler = (type, currentVal, index) => {
    if (type === "REMOVE") {
      this.removeItem(index);
      return;
    }
    // Also using this for "REMOVE FROM CART" - to lazy to create new component
    const curSize = this.state.cart.item_size[index];
    const idd = this.state.cart.item_avail_sizes[index].indexOf(curSize);
    const stocks = this.state.current_item_stocks[index];
    const stockMax = stocks[idd];

    var max = 5;
    const min = 1;
    var newVal = currentVal;

    if (stockMax < max) max = stockMax;

    switch (type) {
      case "PLUS":
        newVal++;
        break;
      case "MINUS":
        newVal--;
        break;
      default:
        return;
    }

    if (newVal < min || newVal > max) {
      this.alertMessageHandler("Out of range!", "FAIL");

      return;
    }

    var newCart = this.state.cart;
    newCart.item_quantity[index] = newVal;

    this.setState({ cart: newCart });
    this.cartTotal(this.state.cart.item_price, this.state.cart.item_quantity);
  };

  removeItem = (id) => {
    var newCart = this.state.cart;
    newCart.item_id[id] = undefined;
    newCart.item_price[id] = 0;

    const newCount = this.state.itemCount - 1;
    this.setState({ itemCount: newCount });
    this.setState({ cart: newCart });
    this.cartTotal(newCart.item_price, newCart.item_quantity);
  };

  sizeHandler = (type, currentSize, availSize, index) => {
    const maxId = availSize.length - 1;
    const minId = 0;
    var newSize = this.state.itemSize;
    const id = availSize.indexOf(currentSize);

    if (type === "PLUS" && maxId != id) newSize = availSize[id + 1];
    else if (type === "MINUS" && minId != id) newSize = availSize[id - 1];
    else {
      //Show some error in future or something in case switch isn't possible
      return;
    }

    var newCart = this.state.cart;
    newCart.item_size[index] = newSize;
    newCart.item_quantity[index] = 1;
    const idd = newCart.item_avail_sizes[index].indexOf(newSize);
    const stocks = this.state.current_item_stocks[index];

    if (stocks[idd] < 1) newCart.item_quantity[index] = 0;
    this.cartTotal(newCart.item_quantity, newCart.item_price);
    this.setState({ cart: newCart });
  };

  validate() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    if (email.value.trim().length < 7) {
      email.focus();
      this.setState({ emailError: "Invalid email!" });
      return;
    } else this.setState({ emailError: "" });

    if (password.value.trim() == "") {
      this.setState({ passwordError: "Password can't be empty!" });
      password.focus();
      return;
    } else {
      this.setState({ passwordError: "" });
    }

    if (password.value.trim().length < 7) {
      this.setState({ passwordError: "Password is too small!" });
      password.focus();
      return;
    } else {
      this.setState({ passwordError: "" });
    }
    //this.alertMessageHandler("Login successfull!", "SUCCESS");
    this.logMeIn(email.value, password.value);
  }

  logMeIn = (email, password) => {
    axios
      .post(`${api}/accounts/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data === null) {
          document.getElementById("email").innerHTML = "";
          document.getElementById("password").innerHTML = "";

          this.setState({
            emailError: "Email doesn't exist!",
            passwordError: "",
          });
          return;
        }
        if (res.data.status === "failed") {
          //console.log("I FAILED");
          document.getElementById("password").innerHTML = "";

          this.setState({
            emailError: "",
            passwordError: "Incorrect password!",
          });

          return;
        }
        //console.log(res.data);
        this.resetCart();
        Cookies.set("id", res.data.id);
        this.accountManagement(res.data.id);
        this.accountCrossHandler();
      });
  };

  logMeOut() {
    Cookies.remove("id");
    this.logoutStateHandler();
    this.setState({
      accounts: {},
      isHiddenCartAccount:
        "#wishlist-icon,#cart,#cart-count{display:none}.ac-eq{margin-left:-106px}",
    });
    window.location.reload(false);
  }

  searchOpen() {
    this.setState({ searchPopup: <Search /> });
  }

  searchClose() {
    this.setState({ searchPopup: "" });
  }

  alertMessageHandler = (message, type) => {
    this.setState({ alertPopup: [] });
    this.alertMessageGlobalItems(message, type);
    this.setState({ alertPopup: <Alert message={message} type={type} /> });
  };

  alertMessageGlobalItems = (message, typee) => {
    var bgColor = "";
    var color = "";

    var type = "";
    if (typee !== undefined) type = typee;

    if (type === "WARNING") {
      bgColor = "#f0ad4e";
      color = "white";
    } else if (type === "NOTIFY") {
      bgColor = "#0275d8";
      color = "white";
    } else if (type === "SUCCESS") {
      bgColor = "#5cb85c";
      color = "white";
    } else if (type === "FAIL") {
      bgColor = "#d9534f";
      color = "white";
    } else {
      bgColor = "#0275d8";
      color = "white";
    }

    const style = {};
    this.setState({
      alertMessage: message,
      alertStyle: { backgroundColor: bgColor, color: color },
    });
  };

  forceCloseAlertMessage() {
    const elem = document.getElementById("alert-animation-helper");
    if (elem === null) return;
    elem.innerHTML = `.alert{opacity:0}`;
    this.setState({ alertPopup: "" });
  }

  initCurrentStocks = (ids, cart) => {
    axios.post(`${api}/inventory/current-stock`, { ids: ids }).then((res) => {
      const data = res.data;
      if (data === "NOTHING") return;

      //Logic
      var newStockList = [];
      var retrivedSerial = []; // Fuck I am reallyu bad
      //Arranging
      data.forEach((elem) => {
        retrivedSerial.push(elem._id);
      });
      //Updating current_stock_list
      for (let i = 0; i < retrivedSerial.length; i++) {
        const id = retrivedSerial.indexOf(ids[i]);
        newStockList.push(data[id].stock);
      }
      //Updating cart
      for (let i = 0; i < retrivedSerial.length; i++) {
        const stock = this.returnStock(cart, newStockList, i);
        if (stock < cart.item_quantity[i]) cart.item_quantity[i] = stock;
      }
      this.cartTotal(cart.item_price, cart.item_quantity);
      const itemCount = cart.item_id.length;
      this.setState({
        current_item_stocks: newStockList,
        cart: cart,
        itemCount: itemCount,
      });
      this.updateCart();
    });
  };

  returnStock = (cart, stock, i) => {
    const s = cart.item_avail_sizes[i];
    const id = s.indexOf(cart.item_size[i]);
    const ss = stock[i];

    return ss[id];
  };

  addToWishList = (itemId, name) => {
    if (Cookies.get("id") === undefined) {
      this.loginMode();
      return;
    }

    var wishlist = this.state.wishlist;
    const doesExist = wishlist.indexOf(itemId);

    if (doesExist !== -1) {
      this.alertMessageHandler("Item already in wishlist!", "FAIL");
      return;
    }

    wishlist.push(itemId);
    this.setState({ wishlist: wishlist });
    this.updateWishListToAccount(wishlist);
    this.alertMessageHandler(
      `${firstLetterCapital(name)} added to wishlist.`,
      "SUCCESS"
    );
  };

  updateWishListToAccount = (newWishlist) => {
    axios
      .post(`${api}/accounts/add-to-wishlist`, {
        _id: this.state.accountId,
        newWishlist,
      })
      .then((res) => {
        //console.log(res.data);
        //Show alert or something
      });
  };

  removeItemFromWishlist = (id) => {
    const wishlist = this.state.wishlist;
    var newWishlist = [];

    wishlist.forEach((elem) => {
      if (elem !== id) {
        newWishlist.push(elem);
      }
    });

    this.setState({ wishlist: newWishlist });
    this.updateWishListToAccount(newWishlist);
  };
  wishlistOpen = () => {
    this.setState({ wishlistState: <Wishlist /> });
  };
  wishlistClose = () => {
    this.setState({ wishlistState: "" });
  };
  resetCart = () => {
    this.setState({
      cart: {
        item_img: [],
        item_name: [],
        item_id: [],
        item_price: [],
        item_quantity: [],
        item_size: [],
        item_avail_sizes: [],
      },
      current_item_stocks: [],
      cartTotalString: CurrencyConverter(0),
      cartTotalInt: 0,
      itemCount: 0,
    });
  };

  changeNewsletterStatus = (newStatus) => {
    axios.post(`${api}/accounts/update-newsletter-status`, {
      _id: this.state.accountId,
      newStatus: newStatus,
    });
    var newAccount = this.state.accounts;
    newAccount.newsletter = newStatus;
    this.setState({ accounts: newAccount });
  };
  //
  componentDidMount() {
    // this.getCookiesCart();
    this.getAccountStatusFromCookies();
  }
  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          addItem: (value, stock) => {
            this.addItem(value, stock);
            this.updateCart();
          },
          cartManipulator: (bool) => {
            this.cartManipulator(bool);
            // this.updateCart();
          },
          qtyHandler: (type, currentVal, index) => {
            this.qtyHandler(type, currentVal, index);
            this.updateCart();
          },
          sizeHandler: (type, currentSize, availSize, id) => {
            this.sizeHandler(type, currentSize, availSize, id);
            this.updateCart();
          },
          addToWishList: (itemId, name) => {
            this.addToWishList(itemId, name);
          },
          removeItemFromWishlist: (id) => {
            this.removeItemFromWishlist(id);
          },
          changeNewsletterStatus: (newStatus) => {
            this.changeNewsletterStatus(newStatus);
          },
          validate: () => {
            this.validate();
          },
          accountCrossHandler: () => {
            this.accountCrossHandler();
          },
          loginMode: () => {
            this.loginMode();
          },
          logMeOut: () => {
            this.logMeOut();
          },
          searchOpen: () => {
            this.searchOpen();
          },
          searchClose: () => {
            this.searchClose();
          },
          alert: (message, type) => {
            this.alertMessageHandler(message, type);
          },
          alertClose: () => {
            this.forceCloseAlertMessage();
          },
          wishlistOpen: () => {
            this.wishlistOpen();
          },
          wishlistClose: () => {
            this.wishlistClose();
          },
          resetCart: () => {
            this.resetCart();
          },
          forgotPasswordPopup: () => {
            this.forgotPasswordPopup();
          },
        }}
      >
        {this.props.children}
        <Ip />
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
