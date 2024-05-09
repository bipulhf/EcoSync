"use client";

import { Pie } from "@ant-design/plots";

const PieChart = ({ data, text }: any) => {
  const config = {
    data,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.4,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text,
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 12,
          fontStyle: "bold",
        },
      },
    ],
  };
  return <Pie {...config} />;
};

export default PieChart;
