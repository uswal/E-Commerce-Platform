import axios from "axios";
import React, { useEffect, useState } from "react";

function LazyImg(props) {
  const [img, setImg] = useState("/assets/images/imgLoading.gif");

  useEffect(() => {
    console.log("start");
    init();
  }, []);

  function init() {
    axios.get(props.src).then((res) => {
      //console.log(res.data);
      setImg(props.src);
      console.log("finished");
    });
  }
  return <img className={props.classes} src={img}></img>;
}

export default LazyImg;
