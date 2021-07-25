import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Slider } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";

import ShopCards from "../components/shopCards";
import "./css/designerE.css";
import "./css/shopOnPhone.css";
import { api } from "../components/config";
import CurrencyConverter, {
  CurrencyConverterInt,
  othersToRs,
} from "../components/currencyConverter";
import { MyContext } from "../components/myProvider";
import firstLetterCapital from "../components/firstLetterCapital";
import MaterialCheckbox from "../components/materialCheckbox";

const min = Math.floor(CurrencyConverterInt(0));
const max = Math.ceil(CurrencyConverterInt(16000));

function RangeSlider(props) {
  const [value, setValue] = React.useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.changeMe(newValue);
  };

  const handleChangeX = (event) => {
    const newValue = [event.target.value, value[1]];
    setValue(newValue);
    if (event.target.value > max || event.target.value < min) return;
    props.changeMe(newValue);
  };

  const handleChangeY = (event) => {
    const newValue = [value[0], event.target.value];
    setValue(newValue);
    if (event.target.value > max || event.target.value < min) return;
    props.changeMe(newValue);
  };

  return (
    <div>
      <Slider
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        aria-labelledby="range-slider"
      />
      <div className="price-options row-flex">
        <label className="container col-flex">
          <label>Min:</label>{" "}
          <input
            type="number"
            value={value[0]}
            onChange={handleChangeX}
          ></input>
        </label>
        <label className="container col-flex right">
          <label>Max:</label>{" "}
          <input
            type="number"
            value={value[1]}
            onChange={handleChangeY}
          ></input>
        </label>
      </div>
    </div>
  );
}
class DesignerE extends Component {
  constructor(props) {
    super(props);

    const cat = props.match.params.category;

    this.state = {
      inventory: [],
      index: 0,
      maxIndex: 0,
      limitData: 12,
      cat: cat,
      requested: false,
      priceMin: min,
      priceMax: max,
      priceRange: [min, max],
      byMaterial: [],
      byCollection: [],
      byColor: [],
      leftFiltersExpand:
        ".cole-x .price-case {padding: 30px;padding-top: 10px;height: 178px;width:120px;background-color:white}",

      setOfCategory: new Set(),
      setOfSeason: new Set(),
      setOfSize: new Set(),
      setOfMaterial: new Set(),
      setOfCollection: new Set(),
      setOfColor: new Set(),
      material: [],
      collection: [],
      redirect: null,
      endReached: false,
      loading: [],
    };

    this.getShopMisc();
  }

  getShopMisc() {
    axios.post(`${api}/misc/get-shop-details`).then((res) => {
      res = res.data;
      //console.log(res);
      this.generateCheckboxList(res.material, "MATERIAL");
      this.generateCheckboxList(res.collection, "COLLECTION");
      this.generateColorList(res.color);
    });
  }

  generateCheckboxList(list, type) {
    var html = [];
    for (let i = 0; i < list.length; i++) {
      const temp = (
        <span>
          <input
            class="checkbox"
            type="checkbox"
            onClick={() => {
              this.addRemoveToQueryList(list[i], type);
              this.retrive(true);
            }}
          ></input>{" "}
          {firstLetterCapital(list[i])}
        </span>
      );
      html.push(temp);
    }
    if (type === "MATERIAL") this.setState({ byMaterial: html });
    else if (type === "COLLECTION") this.setState({ byCollection: html });
  }

  generateColorList(color) {
    var html = [];
    for (let i = 0; i < color.length; i++) {
      const temp = (
        <MaterialCheckbox color={color[i]} functions={this.colorSetManager} />
      );
      html.push(temp);
    }

    this.setState({ byColor: html });
  }

  colorSetManager = (value) => {
    this.addRemoveToQueryList(value, "COLOR");
    this.retrive(true);
    //console.log(value);
  };

  changePriceVal = (value) => {
    this.setState({ priceRange: value });
  };

  // - https://stackoverflow.com/questions/45585542/detecting-when-user-scrolls-to-bottom-of-div-with-react-js
  isBottom(el) {
    //console.log(`${el.getBoundingClientRect().bottom} ${window.innerHeight}`);
    const i =
      Math.floor(el.getBoundingClientRect().bottom) - window.innerHeight;

    //return Math.floor(el.getBoundingClientRect().bottom) <= window.innerHeight;
    return i <= 500;
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  trackScrolling = () => {
    if (this.state.requested) return;
    const wrappedElement = document.getElementById("render-stuff-below");
    if (this.isBottom(wrappedElement)) {
      //console.log("header bottom reached");
      this.retrive(false);
      this.setState({ requested: true });
    }
  };

  //
  componentDidMount() {
    this.getMaxIndex();
    document.addEventListener("scroll", this.trackScrolling);
  }

  getMaxIndex() {
    axios.post(`${api}/inventory/get-max-index`).then((res) => {
      //console.log(res.data);
      if (res.data[0] !== undefined) {
        this.setState({
          index: res.data[0].index,
          maxIndex: res.data[0].index,
        });
      } else {
        this.setState({
          index: 0,
          maxIndex: 0,
        });
      }

      if (this.state.cat !== undefined) {
        const cat = ["dress", "outerwear", "bottomwear", "topwear"];
        const id = cat.indexOf(this.state.cat);

        if (id === -1) {
          this.setState({ redirect: "/shop" });
          return;
        }

        document.getElementById(`checkbox-${this.state.cat}`).checked = true;
        this.addRemoveToQueryList(this.state.cat, "CATEGORY");
      }
      this.retrive(true);
    });
  }

  addRemoveToQueryList = (str, type) => {
    var NEW, bool;

    switch (type) {
      case "CATEGORY":
        NEW = this.state.setOfCategory;
        bool = NEW.has(str);
        bool ? NEW.delete(str) : NEW.add(str);
        this.setState({ setOfCategory: NEW });
        break;
      case "SEASON":
        NEW = this.state.setOfSeason;
        bool = NEW.has(str);
        bool ? NEW.delete(str) : NEW.add(str);
        this.setState({ setOfSeason: NEW });
        break;
      case "SIZE":
        NEW = this.state.setOfSize;
        bool = NEW.has(str);
        bool ? NEW.delete(str) : NEW.add(str);
        this.setState({ setOfSize: NEW });
        break;
      case "MATERIAL":
        //console.log("CALLED MATERIAL");
        NEW = this.state.setOfMaterial;
        //console.log(NEW);
        bool = NEW.has(str);
        bool ? NEW.delete(str) : NEW.add(str);
        //console.log(NEW);
        this.setState({ setOfMaterial: NEW });
        break;
      case "COLLECTION":
        NEW = this.state.setOfCollection;
        bool = NEW.has(str.toLowerCase());
        bool ? NEW.delete(str.toLowerCase()) : NEW.add(str.toLowerCase());
        this.setState({ setOfCollection: NEW });
        break;
      case "COLOR":
        NEW = this.state.setOfColor;
        bool = NEW.has(str);
        bool ? NEW.delete(str) : NEW.add(str);
        this.setState({ setOfColor: NEW });
        break;
      default:
        console.log("Filter not available");
    }
  };

  queryListGenerator = () => {
    var listOfObjects = [];
    var assembleList = [];

    // {category: "dress"},{category:"topwear"},{category: "bottomwear"},{category: "outerwear"}
    listOfObjects = [];
    this.state.setOfCategory.forEach((elem) =>
      listOfObjects.push({ category: elem })
    );
    if (listOfObjects.length > 0) assembleList.push({ $or: listOfObjects });

    // season
    listOfObjects = [];
    this.state.setOfSeason.forEach((elem) =>
      listOfObjects.push({ season: elem })
    );
    if (listOfObjects.length > 0) assembleList.push({ $or: listOfObjects });

    //size
    listOfObjects = [];
    this.state.setOfSize.forEach((elem) =>
      listOfObjects.push({ [elem]: true })
    );
    if (listOfObjects.length > 0) assembleList.push({ $or: listOfObjects });

    //Material
    listOfObjects = [];
    this.state.setOfMaterial.forEach((elem) =>
      listOfObjects.push({ material: elem })
    );
    if (listOfObjects.length > 0) assembleList.push({ $or: listOfObjects });

    //Collection
    listOfObjects = [];
    this.state.setOfCollection.forEach((elem) =>
      listOfObjects.push({ collection_name: elem })
    );
    if (listOfObjects.length > 0) assembleList.push({ $or: listOfObjects });

    //Color
    listOfObjects = [];
    this.state.setOfColor.forEach((elem) => {
      listOfObjects.push({ color_1: elem });
      listOfObjects.push({ color_2: elem });
    });
    if (listOfObjects.length > 0) assembleList.push({ $or: listOfObjects });

    //Price
    assembleList.push({
      $and: [
        { price: { $gte: othersToRs(this.state.priceRange[0]) } },
        { price: { $lte: othersToRs(this.state.priceRange[1]) } },
      ],
    });

    //console.log("CALLED GENERATOR");
    //console.log(assembleList);
    return assembleList;
  };

  async retrive(isNew) {
    //This is one hell of a mess - working on it after 3 days gap I don't even remember much
    this.setState({ requested: true });
    var index;
    if (isNew === true) {
      index = this.state.maxIndex;
      this.setState({ index: index, inventory: [] });
    } else {
      index = this.state.index;
      if (this.state.endReached) {
        //console.log("No need to retrive anymore");
        this.setState({ loading: [] });
        return;
      }
    }
    //Generating query and accessing
    const list = this.queryListGenerator();
    var query = {
      index: { $lte: index },
      $and: list,
    };
    this.setState({ loading: <div id="load">Fetching data...</div> });
    var newList = [];
    axios
      .post(`${api}/inventory/get`, {
        query: query,
        limit: this.state.limitData,
      })
      .then((res) => {
        res = res.data;

        if (this.state.limitData > res.length)
          this.setState({ endReached: true });

        for (let i = 0; i < res.length; i++) {
          this.setState({ index: res[i].index - 1 });

          var html = <ShopCards props={res[i]} />;
          newList.push(html);
        }

        const d = [...this.state.inventory, newList];
        this.setState({ inventory: d, requested: false });
        this.setState({ loading: [] });
        //console.log(this.state.inventory);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div>
        <div class="containerr content">
          {/* I don't have a fuckin clue why am I using this shit classname, but whatever I am updating this XD*/}
          <div class="cole-x cole">
            <div className="cole-left single-ctr">
              <p class="hdr">FILTERS</p>
            </div>

            <div class="cole-left price-case">
              <p
                class="hdr"
                onClick={() => {
                  this.setState({
                    leftFiltersExpand:
                      ".cole-x .price-case {padding: 30px;padding-top: 10px;height: 178px;width:120px;background-color:white}",
                  });
                }}
              >
                By Price
              </p>
              <RangeSlider changeMe={this.changePriceVal} />

              <p class="apply">
                <button
                  onClick={() => {
                    this.retrive(true);
                  }}
                >
                  APPLY
                </button>
              </p>
            </div>
            <div class="cole-left category-case">
              <p
                class="hdr"
                onClick={() => {
                  this.setState({
                    leftFiltersExpand:
                      ".cole-x .category-case{height:130px;background-color:white}",
                  });
                }}
              >
                By Category
              </p>
              <div class="col-flex-scroll">
                <span>
                  <input
                    class="checkbox"
                    type="checkbox"
                    id="checkbox-dress"
                    onClick={() => {
                      this.addRemoveToQueryList("dress", "CATEGORY");
                      this.retrive(true);
                    }}
                  ></input>{" "}
                  Dress
                </span>
                <span>
                  <input
                    class="checkbox"
                    type="checkbox"
                    id="checkbox-topwear"
                    onClick={() => {
                      this.addRemoveToQueryList("topwear", "CATEGORY");
                      this.retrive(true);
                    }}
                  ></input>{" "}
                  Top Wear
                </span>
                <span>
                  <input
                    class="checkbox"
                    type="checkbox"
                    id="checkbox-bottomwear"
                    onClick={() => {
                      this.addRemoveToQueryList("bottomwear", "CATEGORY");
                      this.retrive(true);
                    }}
                  ></input>{" "}
                  Bottom Wear
                </span>
                <span>
                  <input
                    class="checkbox"
                    type="checkbox"
                    id="checkbox-outerwear"
                    onClick={() => {
                      this.addRemoveToQueryList("outerwear", "CATEGORY");
                      this.retrive(true);
                    }}
                  ></input>{" "}
                  Outer Wear
                </span>
              </div>
            </div>
            <div class="cole-left season-case">
              <p
                class="hdr"
                onClick={() => {
                  this.setState({
                    leftFiltersExpand:
                      ".cole-x .season-case{height:130px;background-color:white}",
                  });
                }}
              >
                By Season
              </p>
              <div class="col-flex-scroll">
                <span>
                  <input
                    class="checkbox"
                    type="checkbox"
                    onClick={() => {
                      this.addRemoveToQueryList("spring", "SEASON");
                      this.retrive(true);
                    }}
                  ></input>{" "}
                  Spring
                </span>
                <span>
                  <input
                    class="checkbox"
                    type="checkbox"
                    onClick={() => {
                      this.addRemoveToQueryList("summer", "SEASON");
                      this.retrive(true);
                    }}
                  ></input>{" "}
                  Summer
                </span>
                <span>
                  <input
                    class="checkbox"
                    type="checkbox"
                    onClick={() => {
                      this.addRemoveToQueryList("winter", "SEASON");
                      this.retrive(true);
                    }}
                  ></input>{" "}
                  Winter
                </span>
              </div>
            </div>
            <div class="cole-left size-case">
              <p
                class="hdr"
                onClick={() => {
                  this.setState({
                    leftFiltersExpand:
                      ".cole-x .size-case{height:130px;background-color:white}",
                  });
                }}
              >
                By Size
              </p>
              <div class="col-flex-scroll">
                <span>
                  <input
                    class="checkbox"
                    type="checkbox"
                    onClick={() => {
                      this.addRemoveToQueryList("size_xs", "SIZE");
                      this.retrive(true);
                    }}
                  ></input>{" "}
                  XS
                </span>
                <span>
                  <input
                    class="checkbox"
                    type="checkbox"
                    onClick={() => {
                      this.addRemoveToQueryList("size_s", "SIZE");
                      this.retrive(true);
                    }}
                  ></input>{" "}
                  S
                </span>
                <span>
                  <input
                    class="checkbox"
                    type="checkbox"
                    onClick={() => {
                      this.addRemoveToQueryList("size_m", "SIZE");
                      this.retrive(true);
                    }}
                  ></input>{" "}
                  M
                </span>
                <span>
                  <input
                    class="checkbox"
                    type="checkbox"
                    onClick={() => {
                      this.addRemoveToQueryList("size_l", "SIZE");
                      this.retrive(true);
                    }}
                  ></input>{" "}
                  L
                </span>
                <span>
                  <input
                    class="checkbox"
                    type="checkbox"
                    onClick={() => {
                      this.addRemoveToQueryList("size_xl", "SIZE");
                      this.retrive(true);
                    }}
                  ></input>{" "}
                  XL
                </span>
              </div>
            </div>
            <div class="cole-left material-case">
              <p
                class="hdr"
                onClick={() => {
                  this.setState({
                    leftFiltersExpand:
                      ".cole-x .material-case{height:130px;background-color:white}",
                  });
                }}
              >
                By Material
              </p>
              <div class="col-flex-scroll">{this.state.byMaterial}</div>
            </div>
            <div class="cole-left collection-case">
              <p
                class="hdr"
                onClick={() => {
                  this.setState({
                    leftFiltersExpand:
                      ".cole-x .collection-case{height:130px;background-color:white}",
                  });
                }}
              >
                By Collection
              </p>
              <div class="col-flex-scroll">{this.state.byCollection}</div>
            </div>
            <div class="cole-left color-case">
              <p
                class="hdr"
                onClick={() => {
                  this.setState({
                    leftFiltersExpand:
                      ".cole-x .color-case{height:auto;background-color:white}",
                  });
                }}
              >
                By Color
              </p>
              <div class="container">
                <FormGroup row>{this.state.byColor}</FormGroup>
              </div>
            </div>
          </div>
          <style id="filter-style-helper">{this.state.leftFiltersExpand}</style>

          <div class="cole-y cole">
            {/* ITEMS LISTING */}
            <div id="fill-items"> {this.state.inventory} </div>
          </div>
          {this.state.loading}
        </div>
      </div>
    );
  }
}

export default DesignerE;
