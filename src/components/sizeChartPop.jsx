import React from "react";

function SizeChartPop(props) {
  //console.log(props);
  return (
    <div class="middle-pop size-chart">
      <div class="ct col-flex">
        <label
          className="cross"
          onClick={() => {
            props.cross();
          }}
        >
          x
        </label>
        <img
          style={{ marginTop: "20px" }}
          src="/assets/images/Size_chart.jpg"
          alt="Loading size chart"
        ></img>
      </div>
    </div>
  );
}

export default SizeChartPop;
