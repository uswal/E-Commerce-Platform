import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../config";

function BackendLookbook() {
  const [list, setList] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    requestData();
  }, []);

  function preview(name) {
    const fileName = document.getElementById(`if${name}`).files[0];
    const filePreview = document.getElementById(`pv${name}`);

    if (fileName === undefined) {
      filePreview.src = "";
      return;
    }

    var oFReader = new FileReader();
    oFReader.readAsDataURL(fileName);

    oFReader.onload = function (oFREvent) {
      filePreview.src = oFREvent.target.result;
    };

    document.getElementById(
      `ifp${name}`
    ).value = `/assets/lookbook/${fileName.name}`;
  }

  function createBlankForm() {
    const id = `id${counter}`; // NO use atm
    const f = `if${counter}`;
    const fp = `ifp${counter}`;
    const t = `t${counter}`;
    const l = `l${counter}`;
    const pv = `pv${counter}`;

    const html = (
      <div id={id} className="cd">
        <label>{counter}</label>
        <input
          id={f}
          type="file"
          accept="image/*"
          onChange={() => {
            preview(counter);
          }}
        ></input>
        <img id={pv} class="img-prev"></img>
        <input id={fp} type="text" value="" disabled></input>
        <br></br>
        <label className="small-hdr">Title:</label>
        <input id={t} type="text"></input>
        <br></br>
        <label classname="small-hdr">Itemview Id:</label>
        <input id={l} type="text"></input>
      </div>
    );

    const newList = [...list, html];
    setCounter(counter + 1);
    setList(newList);
  }

  function saveImages() {
    var files = [];

    for (let i = 0; i < counter; i++) {
      const temp = document.getElementById(`if${i}`).files[0];
      files.push(temp);
    }

    const file = new FormData();
    var nf = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x] !== undefined || files[x] === null) {
        file.append("file", files[x]);
        nf.push("something");
      }
    }

    if (nf.length > 0) {
      axios
        .post(`${api}/misc/lookbook-saveimages`, file)
        .then((res) => {
          if (res.data) {
            generateData();
          } else {
            alert("Something went wrong!");
          }
        })
        .catch(function (err) {
          alert(`${err} \nPage refresh required`);
        });
    } else {
      generateData();
    }
  }

  function generateData() {
    const type = document.getElementById("lb-list").value;
    var obj = {
      img: [],
      id: [],
      title: [],
    };
    //console.log(counter);
    for (let i = 0; i < counter; i++) {
      const fp = document.getElementById(`ifp${i}`).value;
      const t = document.getElementById(`t${i}`).value;
      const l = document.getElementById(`l${i}`).value;

      obj.img.push(fp);
      obj.title.push(t);
      obj.id.push(l);
    }

    axios
      .post(`${api}/misc/update-lookbook`, { type, obj })
      .then((res) => {
        console.log(res.data);
        alert("done");
      })
      .catch((err) => {
        alert(err);
      });
  }

  function requestData() {
    setList([]);
    const type = document.getElementById("lb-list").value;

    axios.post(`${api}/misc/serve-lookbook`, { type }).then((res) => {
      //console.log(res.data);
      var newList = [];

      for (let i = 0; i < res.data.id.length; i++) {
        const id = `id${i}`; // NO use atm
        const f = `if${i}`;
        const fp = `ifp${i}`;
        const t = `t${i}`;
        const l = `l${i}`;
        const pv = `pv${i}`;

        const html = (
          <div id={id} className="cd">
            <label>{i}</label>
            <input
              id={f}
              type="file"
              accept="image/*"
              onChange={() => {
                preview(i);
              }}
            ></input>
            <img id={pv} class="img-prev"></img>
            <input id={fp} type="text" disabled></input>
            <br></br>
            <label className="small-hdr">Title:</label>
            <input id={t} type="text"></input>
            <br></br>
            <label classname="small-hdr">Itemview Id:</label>
            <input id={l} type="text"></input>
          </div>
        );

        newList.push(html);
      }
      setList(newList);
      setCounter(res.data.id.length);
      for (let i = 0; i < res.data.img.length; i++) {
        document.getElementById(`ifp${i}`).value = res.data.img[i];
        document.getElementById(`t${i}`).value = res.data.title[i];
        document.getElementById(`l${i}`).value = res.data.id[i];
      }
    });
  }

  return (
    <div className="margin-top-50 new-d">
      <label className="hdr">Look book</label>
      <select onChange={requestData} id="lb-list" name="list" size="1">
        <option value="point-perspective"> Point perspective </option>
        <option value="into-the-garden"> Into the garden </option>
      </select>

      {list}
      <button className="btn btn-blue" onClick={createBlankForm}>
        Add
      </button>
      <button className="btn btn-green" onClick={saveImages}>
        SAVE
      </button>
    </div>
  );
}

export default BackendLookbook;
