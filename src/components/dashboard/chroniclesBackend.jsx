import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../config";

function ChroniclesBackend() {
  const [counter, setCounter] = useState(0);
  const [html, setHtml] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    const type = document.getElementById("lb-list").value;
    axios.post(`${api}/misc/serve-chronicles`, { type }).then((res) => {
      //console.log(res.data);
      generateHtml(res.data);
    });
  }

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

  function createBlank() {
    const id = `id${counter}`; // NO use atm
    const f = `if${counter}`;
    const fp = `ifp${counter}`;
    const t = `t${counter}`;
    const c = `c${counter}`;
    const pv = `pv${counter}`;
    const d = `d${counter}`;

    const temp = (
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
        <input id={fp} type="text" disabled></input>
        <br></br>
        <label className="small-hdr">Title:</label>
        <input id={t} type="text"></input>
        <br></br>
        <label classname="small-hdr">Caption:</label>
        <input id={c} type="text"></input>
        <br></br>
        <label classname="small-hdr">Description:</label>
        <input id={d} type="text"></input>
      </div>
    );

    const newHtml = [...html, temp];
    setCounter(counter + 1);
    setHtml(newHtml);
  }
  function generateHtml(data) {
    var list = [];
    for (let i = 0; i < data.img.length; i++) {
      const id = `id${i}`; // NO use atm
      const f = `if${i}`;
      const fp = `ifp${i}`;
      const t = `t${i}`;
      const c = `c${i}`;
      const pv = `pv${i}`;
      const d = `d${i}`;

      const temp = (
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
          <label classname="small-hdr">Caption:</label>
          <input id={c} type="text"></input>
          <br></br>
          <label classname="small-hdr">Description:</label>
          <input id={d} type="text"></input>
        </div>
      );
      list.push(temp);
    }
    setHtml(list);
    setCounter(data.img.length);
    for (let i = 0; i < data.img.length; i++) {
      document.getElementById(`ifp${i}`).value = data.img[i];
      document.getElementById(`t${i}`).value = data.title[i];
      document.getElementById(`c${i}`).value = data.cap[i];
      document.getElementById(`d${i}`).value = data.desc[i];
    }
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
      desc: [],
      title: [],
      cap: [],
    };
    for (let i = 0; i < counter; i++) {
      const fp = document.getElementById(`ifp${i}`).value;
      const t = document.getElementById(`t${i}`).value;
      const c = document.getElementById(`c${i}`).value;
      const d = document.getElementById(`d${i}`).value;

      obj.img.push(fp);
      obj.title.push(t);
      obj.desc.push(d);
      obj.cap.push(c);
    }

    axios
      .post(`${api}/misc/update-chronicles`, { type, obj })
      .then((res) => {
        console.log(res.data);
        alert("Done");
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <div className="margin-top-50 new-d">
      <label className="hdr">Sooti Chronicles</label>
      <select onChange={getData} id="lb-list" name="list" size="1">
        <option value="press"> Press </option>
        <option value="collaboration"> Collaboration </option>
        <option value="client-diary"> Client Diary </option>
        <option value="curated-trends"> Curated Trends </option>
      </select>

      {html}
      <button className="btn btn-blue" onClick={createBlank}>
        Add
      </button>
      <button className="btn btn-green" onClick={saveImages}>
        SAVE
      </button>
    </div>
  );
}

export default ChroniclesBackend;
