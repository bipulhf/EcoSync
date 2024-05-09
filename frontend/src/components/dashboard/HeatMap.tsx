"use client";

import React, { useState, useEffect } from "react";
import { Heatmap } from "@ant-design/plots";

const CustomHeatMap = ({ data, xField, yField }: any) => {
  const config = {
    data,
    xField,
    yField,
    colorField: "value",
    sizeField: "value",
    shapeField: "point",
    scale: {
      size: { range: [12, 20] },
      color: { range: ["#0d5fbb", "#7eadfc", "#fd8b6f", "#aa3523"] },
    },
    label: {
      text: (d: any) => d.value,
      position: "inside",
      style: {
        fill: "#fff",
        shadowBlur: 2,
        shadowColor: "rgba(0, 0, 0, .45)",
        pointerEvents: "none",
      },
    },
  };

  return (
    <div>
      <h1 className="text-admin md:text-xl">
        {`${xField.split("_")[0]} HeatMap of Last 7 Days`.toUpperCase()}
      </h1>
      <Heatmap {...config} />
    </div>
  );
};

export default CustomHeatMap;
