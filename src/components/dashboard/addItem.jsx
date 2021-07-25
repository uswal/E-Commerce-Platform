import React, { Component, useState } from "react";
import axios from "axios";
import { api } from "../config";
import firstLetterCapital from "../firstLetterCapital";
import ApplyingChanges from "./applyingChanges";

function preview(name) {
  const fileName = document.getElementById(`img-${name}`).files[0];
  const filePreview = document.getElementById(`${name}-preview`);

  if (fileName === undefined) {
    filePreview.src = "";
    return;
  }

  var oFReader = new FileReader();
  oFReader.readAsDataURL(fileName);

  oFReader.onload = function (oFREvent) {
    filePreview.src = oFREvent.target.result;
  };
}

//Validation
var imgPrimary,
  imgSecondary,
  imgAdditional,
  itemName,
  collectionName,
  category,
  price,
  size = [],
  stock = [],
  notes,
  tags = [],
  description,
  sku,
  material,
  discount,
  season,
  color1,
  color2;

function resetFields() {
  document.getElementById("img-primary").value = null;
  document.getElementById("img-secondary").value = null;
  document.getElementById("img-additional").value = null;
  document.getElementById("primary-preview").src = "";
  document.getElementById("secondary-preview").src = "";
  document.getElementById("item-name").value = "";
  document.getElementById("price").value = null;
  document.getElementById("description").value = "";
  document.getElementById("notes").value = "";
  document.getElementById("tags").value = "";
  document.getElementById("discount").value = null;
  document.getElementById("sku").value = "";

  for (let i = 1; i <= 5; i++) {
    document.getElementById(`size-${i}`).checked = false;
    document.getElementById(`stock-${i}`).value = null;
  }
}
function validate(isNewCollection, isNewMaterial) {
  document.getElementById("applying-helper").innerHTML =
    ".applying{display:block}";
  document.getElementById("changes").innerHTML = "";

  imgPrimary = document.getElementById("img-primary");
  imgSecondary = document.getElementById("img-secondary");
  imgAdditional = document.getElementById("img-additional");
  itemName = document.getElementById("item-name").value.trim().toLowerCase();
  category = document.getElementById("category").value.trim().toLowerCase();
  price = parseInt(document.getElementById("price").value.trim());
  season = document.getElementById("season").value;
  color1 = document.getElementById("color-box-1").value;
  color2 = document.getElementById("color-box-2").value;

  if (isNewCollection)
    collectionName = document
      .getElementById("new-collection")
      .value.trim()
      .toLowerCase();
  else
    collectionName = document
      .getElementById("collection")
      .value.trim()
      .toLowerCase();

  if (isNewMaterial)
    material = document.getElementById("new-material").value.trim();
  else material = document.getElementById("material").value.trim();

  //Sizes
  size = [];
  stock = [];

  for (let i = 1; i <= 5; i++) {
    const temp = document.getElementById(`size-${i}`);
    if (temp.checked) {
      size.push(temp.value);
      const temp1 = parseInt(
        document.getElementById(`stock-${i}`).value.trim()
      );

      if (temp1 === NaN || temp1 === "" || temp1 === null) {
        alert("One of stock for certain size is left empty!");
        return;
      }
      stock.push(parseInt(temp1));
    }
  }

  description = document.getElementById("description").value.trim();
  //stock = parseInt(document.getElementById("stock").value.trim());
  notes = document.getElementById("notes").value.trim();

  var tempTag = document.getElementById("tags").value.trim();
  tags = tempTag.split(" ");

  sku = document.getElementById("sku").value.trim().toUpperCase();
  discount = parseInt(document.getElementById("discount").value.trim());

  if (imgPrimary.files[0] === undefined) {
    alert("Primary image can't be empty!");
    return;
  }

  if (imgSecondary.files[0] === undefined) {
    alert("Secondary image can't be empty!");
    return;
  }

  if (itemName === "") {
    alert("Item name can't be empty!");
    return;
  }

  if (category === "") {
    alert("Category name can't be empty!");
    return;
  }

  if (price === NaN) {
    alert("Price can't be empty!");
    return;
  }

  if (sku === NaN || sku === "") {
    alert("SKU can't be empty!");
    return;
  }

  if (material === NaN || material === "") {
    alert("Material can't be empty!");
    return;
  }

  if (description === "") {
    alert("description can't be empty!");
    return;
  }

  if (discount === NaN) {
    discount = 0;
  }
  uploadImage();
}
function uploadImage() {
  var files = [imgPrimary.files[0], imgSecondary.files[0]];

  for (let z = 0; z < imgAdditional.files.length; z++)
    files.push(imgAdditional.files[z]);

  console.log(files);
  const file = new FormData();
  for (var x = 0; x < files.length; x++) {
    if (files[x] != undefined) {
      file.append("file", files[x]);
    }
  }

  axios
    .post(`${api}/inventory/save-image`, file)
    .then((res) => {
      console.log(res);
      if (res.status == 200) uploadNow();
      else alert("Something went wrong, please refresh the page");
    })
    .catch(function (err) {
      alert(`${err} \nPage refresh required`);
    });
}
function uploadNow() {
  var images = [imgPrimary.files[0].name, imgSecondary.files[0].name];
  for (let z = 0; z < imgAdditional.files.length; z++)
    images.push(imgAdditional.files[z].name);

  axios
    .post(`${api}/inventory/add-item`, {
      images,
      itemName,
      collectionName,
      category,
      price,
      size,
      description,
      stock,
      notes,
      tags,
      sku,
      material,
      discount,
      color1,
      color2,
      season,
    })
    .then((res) => {
      console.log(res);
      document.getElementById("applying-helper").innerHTML =
        ".applying{display:none}";
      document.getElementById("changes").innerHTML = "Changes saved";
      if (res.status == 200) {
        alert("Success! All fields will be reset after hitting OK!");
        resetFields();
      }
    })
    .catch(function (err) {
      alert(`${err} \nPage refresh required`);
    });
}

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      byCollection: [],
      collection: [],
      collectionStyle: "",
      isNewCollection: false,

      byMaterial: [],
      material: [],
      materialStyle: "",
      isNewMaterial: false,

      color1Active: "white",
      color2Active: "white",
      byColor_1: [],
      byColor_2: [],
      colorList: [],
      isNewColor: false,
      newColorMessage: "",
    };
    this.getShopMisc();
  }
  getShopMisc = () => {
    axios.post(`${api}/misc/get-shop-details`).then((res) => {
      console.log(res);
      res = res.data;
      this.setState({ collection: res.collection, material: res.material });

      this.listGenerator(res.collection, "collection");
      this.listGenerator(res.material, "material");
      this.colorListGenerator(res.color);
      if (res.color[0] !== undefined)
        this.setState({
          colorList: res.color,
          color1Active: res.color[0],
          color2Active: res.color[0],
        });
      else this.setState({ colorList: res.color });
    });
  };
  listGenerator = (list, type) => {
    console.log(list);
    var html = [];
    for (let i = 0; i < list.length; i++)
      html.push(<option value={list[i]}>{firstLetterCapital(list[i])}</option>);
    if (type === "collection") this.setState({ byCollection: html });
    else if (type === "material") this.setState({ byMaterial: html });
  };
  colorListGenerator = (list) => {
    var html = [];
    for (let i = 0; i < list.length; i++)
      html.push(
        <option value={list[i]} style={{ backgroundColor: list[i] }}>
          {list[i]}
        </option>
      );
    this.setState({ byColor_1: html, byColor_2: html });
  };
  addCustomColor = () => {
    const newColor = document.getElementById("custom-color").value;
    var newColorList = this.state.colorList;
    const id = newColorList.indexOf(newColor);

    if (id !== -1) {
      alert("Color already exist!");
      return;
    }

    var newByColor = this.state.byColor_1;
    var temp = (
      <option value={newColor} style={{ backgroundColor: newColor }}>
        {newColor}
      </option>
    );
    newByColor.push(temp);
    newColorList.push(newColor);

    this.setState({
      colorList: newColorList,
      byColor_1: newByColor,
      byColor_2: newByColor,
      isNewColor: true,
      newColorMessage: (
        <label
          class="color-label"
          style={{ color: newColor, marginLeft: "20px" }}
        >
          {newColor} added!
        </label>
      ),
    });
  };
  updateMisc = () => {
    // if (
    //   !- WE WILL UPDATE MISC ALL TIMEF UCK IT, it shouldn't famil probably XD(
    //     this.state.isNewCollection &&
    //     this.state.isNewMaterial &&
    //     this.state.isNewColor
    //   )
    // ) {
    //   //console.log("No need to update misc");
    //   return;
    // }

    var newCollectionList = this.state.collection,
      newMaterialList = this.state.material,
      newColor = this.state.colorList;
    //Yeah yeah this sucks, but I don't want to recode everything
    if (this.state.isNewCollection) {
      const newVal = document.getElementById("new-collection").value;
      console.log(newVal);
      newCollectionList.push(newVal);
    }

    if (this.state.isNewMaterial) {
      const newVal = document.getElementById("new-material").value;
      newMaterialList.push(newVal);
      console.log(newVal);
    }

    axios
      .post(`${api}/misc/update-shop-details`, {
        details: {
          material: newMaterialList,
          collection: newCollectionList,
          color: newColor,
        },
      })
      .then((res) => {
        //Create logsc
        console.log(res);
      });
  };

  render() {
    return (
      <div className="admin-r-content">
        <label class="hdr-main">
          Add items! <br></br>(Keeps primary and secondary image at 2000x3000
          resolution or same ration at the very least & not above 500kb if
          possible)
        </label>
        <div class="line"></div>
        <br></br>

        <label>Select primary image:</label>
        <input
          type="file"
          id="img-primary"
          name="img-primary"
          accept="image/*"
          onChange={() => preview("primary")}
        ></input>
        <img id="primary-preview" class="img-prev"></img>
        <br></br>
        <label>Select secondary image:</label>
        <input
          type="file"
          id="img-secondary"
          name="img-secondary"
          accept="image/*"
          onChange={() => preview("secondary")}
        ></input>
        <img id="secondary-preview" class="img-prev"></img>
        <br></br>
        <label>
          Addition images(Select multiple by holding "ctr" on windows):
        </label>
        <input
          type="file"
          id="img-additional"
          name="img-additional"
          accept="image/*"
          multiple
        ></input>

        <label className="hdr-small">Item name:</label>
        <input
          id="item-name"
          type="text"
          placeholder="Enter item name!"
        ></input>

        <label className="hdr-small">Collection name:</label>
        <div class="row-flex rcc">
          <select class="list-box" id="collection">
            {this.state.byCollection}
          </select>
          <button
            className="black-btn"
            onClick={() => {
              this.setState({
                isNewCollection: true,
                collectionStyle: ".rcc{display:none}.rcc-n{display:block}",
              });
            }}
          >
            New
          </button>
        </div>
        <input
          type="text"
          id="new-collection"
          className="hidden-input rcc-n"
          placeholder="Enter new collection name"
        ></input>
        <style>{this.state.collectionStyle}</style>

        <label className="hdr-small">Category:</label>
        <select name="category" class="list-box" id="category">
          <option value="dress">Dress</option>
          <option value="topwear">Top Wear</option>
          <option value="overlays">Overlays</option>
          <option value="bottomwear">Bottom Wear</option>
        </select>

        <label className="hdr-small">Price in Rs(Including 12%tax):</label>
        <input id="price" type="text" placeholder="Enter price"></input>

        <label className="hdr-small">Select sizes and their stock.</label>
        {/* <input type="text" placeholder="Enter sizes"></input> */}
        <div class="checkbox-row">
          <div className="dashboard-checkbox size-stock">
            <input id="size-1" type="checkbox" value="XS"></input>
            <label>XS</label>
            <input id="stock-1" type="number" class="stock-num"></input>
          </div>
          <div className="dashboard-checkbox size-stock">
            <input id="size-2" type="checkbox" value="S"></input>
            <label>S</label>
            <input id="stock-2" type="number" class="stock-num"></input>
          </div>
          <div className="dashboard-checkbox size-stock">
            <input id="size-3" type="checkbox" value="M"></input>
            <label>M</label>
            <input id="stock-3" type="number" class="stock-num"></input>
          </div>
          <div className="dashboard-checkbox size-stock">
            <input id="size-4" type="checkbox" value="L"></input>
            <label>L</label>
            <input id="stock-4" type="number" class="stock-num"></input>
          </div>
          <div className="dashboard-checkbox size-stock">
            <input id="size-5" type="checkbox" value="XL"></input>
            <label>XL</label>
            <input id="stock-5" type="number" class="stock-num"></input>
          </div>
        </div>

        <label className="hdr-small">Description:</label>
        <textarea
          id="description"
          class="input-text-area"
          placeholder="Enter description"
        ></textarea>

        <label className="hdr-small">Notes (optional):</label>
        <input id="notes" type="text" placeholder="Notes, if any"></input>

        <label className="hdr-small">Enter tags (optional):</label>
        <input
          id="tags"
          type="text"
          placeholder="Enter tags seperated by space (example: fancy stylish)"
        ></input>

        <label className="hdr-small">Enter SKU: </label>
        <input type="text" id="sku" placeholder="Enter SKU"></input>

        <label className="hdr-small">Enter Material: </label>
        <div class="row-flex rm">
          <select class="list-box" id="material">
            {this.state.byMaterial}
          </select>
          <button
            className="black-btn"
            onClick={() => {
              this.setState({
                isNewMaterial: true,
                materialStyle: ".rm{display:none}.rm-n{display:block}",
              });
            }}
          >
            New
          </button>
        </div>
        <input
          type="text"
          id="new-material"
          className="hidden-input rm-n"
          placeholder="Enter new material"
        ></input>
        <style>{this.state.materialStyle}</style>

        <label className="hdr-small">Enter Discount(in %): </label>
        <input type="number" id="discount" class="disc-dash"></input>

        <label className="hdr-small">Select Season</label>
        <div class="row-flex">
          <select id="season" class="list-box">
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
          </select>
        </div>

        <label className="hdr-small">Colors:</label>
        <div className="row-flex">
          <label class="color-label">Select color:</label>
          <input type="color" id="custom-color"></input>
          <button className="black-btn" onClick={this.addCustomColor}>
            Add to palate
          </button>
          {this.state.newColorMessage}
        </div>

        <div className="row-flex">
          <label class="color-label">Color 1:</label>
          <select
            class="list-box"
            id="color-box-1"
            style={{ backgroundColor: this.state.color1Active }}
            onChange={() => {
              const value = document.getElementById("color-box-1").value;
              this.setState({ color1Active: value });
            }}
          >
            {this.state.byColor_1}
          </select>
        </div>
        <div className="row-flex">
          <label class="color-label">Color 2:</label>
          <select
            class="list-box"
            id="color-box-2"
            style={{ backgroundColor: this.state.color2Active }}
            onChange={() => {
              const value = document.getElementById("color-box-2").value;
              this.setState({ color2Active: value });
            }}
          >
            {this.state.byColor_2}
          </select>
        </div>
        <label class="small-hdr font-green" id="changes"></label>
        <div
          class="submit-btn"
          onClick={() => {
            this.updateMisc();
            validate(this.state.isNewCollection, this.state.isNewMaterial);
          }}
        >
          Save
        </div>

        <ApplyingChanges />
      </div>
    );
  }
}

export default AddItem;
