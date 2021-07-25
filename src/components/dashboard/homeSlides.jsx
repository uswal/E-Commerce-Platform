import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../config";
import ApplyingChanges from "./applyingChanges";

function HomeSlides() {
  const [html, setHtml] = useState([]);

  useEffect(() => {
    axios.post(`${api}/misc/serve-fslides`).then((res) => {
      setHtml(<HomeSlides2 val={res.data} />);
    });
  }, []);

  return <div>{html}</div>;
}

function HomeSlides2(props) {
  const res = props.val;

  useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    var i = 0;
    for (i = 0; i < 7; i++) {
      var html = `
        <img src="${res.imgPath[i]}" id="${res.name[i]}-preview" class="img-prev"></img>
       
        <label class="hdr-small">Image path </label>
        <input type="text" value="${res.imgPath[i]}" id="image-path-${res.name[i]}" disabled></input>
        <label class="hdr-small">Caption</label>
              <input type="text" id="caption-${res.name[i]}" value="${res.caption[i]}"></input>
        <label class="hdr-small">Title1</label>
              <input type="text" id="title1-${res.name[i]}" value="${res.title1[i]}"></input>
        <label class="hdr-small">Title2</label>
              <input type="text" id="title2-${res.name[i]}" value="${res.title2[i]}"></input>
        <label class="hdr-small">Item link</label>
              <input type="text" id="item-link-${res.name[i]}" value="${res.link[i]}"></input>
        <label class="hdr-small">Item description</label>
        <textarea id="description-${res.name[i]}">${res.description[i]}</textarea>
        `;

      document.getElementById(res.name[i]).innerHTML = html;
    }
  }
  function saveItems() {
    document.getElementById("applying-helper").innerHTML =
      ".applying{display:block}";
    document.getElementById("changes").innerHTML = "";
    //Uploading image
    var allowUpload = document.getElementById("made-changes").checked;

    if (!allowUpload) {
      alert("Confirmation required: Please mark the checkbox in bottom!");
      document.getElementById("applying-helper").innerHTML =
        ".applying{display:none}";
      return;
    }

    var files = [
      document.getElementById("img-f1").files[0],
      document.getElementById("img-f2").files[0],
      document.getElementById("img-f3").files[0],
      document.getElementById("img-f4").files[0],
      document.getElementById("img-f5").files[0],
      document.getElementById("img-f6").files[0],
      document.getElementById("img-f7").files[0],
    ];

    const file = new FormData();
    for (var x = 0; x < 7; x++) {
      if (files[x] != undefined) {
        file.append("file", files[x]);
      }
    }

    axios
      .post(`${api}/slides/saveimage`, file)
      .then((res) => {
        console.log(res);
        if (res.status == 200) updateMiscDb();
        else alert("Something went wrong, please refresh the page");
      })
      .catch(function (err) {
        console.log(err);
        alert(`${err} \nPage refresh required`);
      });
  }

  function updateMiscDb() {
    var name = ["f1", "f2", "f3", "f4", "f5", "f6", "f7"],
      imgPath = [],
      title1 = [],
      title2 = [],
      description = [],
      link = [],
      caption = [];

    for (let x = 0; x < 7; x++) {
      imgPath.push(
        document.getElementById(`image-path-${res.name[x]}`).value.trim()
      );
      title1.push(
        document.getElementById(`title1-${res.name[x]}`).value.trim()
      );
      title2.push(
        document.getElementById(`title2-${res.name[x]}`).value.trim()
      );
      description.push(
        document.getElementById(`description-${res.name[x]}`).value.trim()
      );
      link.push(
        document.getElementById(`item-link-${res.name[x]}`).value.trim()
      );
      caption.push(
        document.getElementById(`caption-${res.name[x]}`).value.trim()
      );
    }

    axios
      .post(`${api}/misc/save-fslides`, {
        name,
        link,
        imgPath,
        title1,
        title2,
        description,
        caption,
      })
      .then((result) => {
        document.getElementById("applying-helper").innerHTML =
          ".applying{display:none}";
        document.getElementById("changes").innerHTML = "Changes saved";
      });
  }

  return (
    <div class="admin-r-content">
      <ul>
        <li>
          <label class="hdr">First slide - Picture Left - Details Right</label>

          <input
            type="file"
            id={`img-${res.name[0]}`}
            name={`img-${res.name[0]}`}
            accept="image/*"
            onChange={() => preview(res.name[0])}
          ></input>

          <div id="f1" class="flex"></div>
        </li>
        <li>
          <label class="hdr">Second slide - Picture Right - Details Left</label>

          <input
            type="file"
            id={`img-${res.name[1]}`}
            name={`img-${res.name[1]}`}
            accept="image/*"
            onChange={() => preview(res.name[1])}
          ></input>

          <div id="f2" class="flex"></div>
        </li>
        <li>
          <label class="hdr">Third slide - Picture Left - Details Right</label>

          <input
            type="file"
            id={`img-${res.name[2]}`}
            name={`img-${res.name[2]}`}
            accept="image/*"
            onChange={() => preview(res.name[2])}
          ></input>

          <div id="f3" class="flex"></div>
        </li>
        <li>
          <label class="hdr">Fourth slide - Picture Right - Details Left</label>

          <input
            type="file"
            id={`img-${res.name[3]}`}
            name={`img-${res.name[3]}`}
            accept="image/*"
            onChange={() => preview(res.name[3])}
          ></input>
          <div id="f4" class="flex"></div>
        </li>
        <li>
          <label class="hdr">Fifth slide - Picture Right - Details Left</label>

          <input
            type="file"
            id={`img-${res.name[4]}`}
            name={`img-${res.name[4]}`}
            accept="image/*"
            onChange={() => preview(res.name[4])}
          ></input>
          <div id="f5" class="flex"></div>
        </li>
        <li>
          <label class="hdr">Sixth slide - Picture Right - Details Left</label>

          <input
            type="file"
            id={`img-${res.name[5]}`}
            name={`img-${res.name[5]}`}
            accept="image/*"
            onChange={() => preview(res.name[5])}
          ></input>
          <div id="f6" class="flex"></div>
        </li>
        <li>
          <label class="hdr">
            Seventh slide - Picture Right - Details Left
          </label>

          <input
            type="file"
            id={`img-${res.name[6]}`}
            name={`img-${res.name[6]}`}
            accept="image/*"
            onChange={() => preview(res.name[6])}
          ></input>
          <div id="f7" class="flex"></div>
        </li>
      </ul>

      <div class="made-changes">
        <input type="checkbox" id="made-changes"></input>
        <label class="hdr-small">Yes, I have made changes!</label>
      </div>

      <label class="small-hdr font-green" id="changes"></label>
      <div class="submit-btn" onClick={saveItems}>
        Save
      </div>

      <ApplyingChanges />
    </div>
  );
}

function preview(name) {
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById(`img-${name}`).files[0]);

  oFReader.onload = function (oFREvent) {
    document.getElementById(`${name}-preview`).src = oFREvent.target.result;
  };

  var filename = document.getElementById(`img-${name}`);
  //console.log(filename.files[0].name);
  document.getElementById(
    `image-path-${name}`
  ).value = `/assets/featuredslides/${filename.files[0].name}`;
}

export default HomeSlides;
