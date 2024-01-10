import React, { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

interface Props {
  socialMediaData: any;
}
export function SimpleWordcloud({ socialMediaData }: Props) {
  const [words, setWords] = useState([
    {
      text: "",
      value: 0,
    },
  ]);
  useEffect(() => {
    if (socialMediaData) {
      const filteredData = socialMediaData.filter(
        (obj: { quantity: number }) => obj.quantity > 100
      );
      setWords(
        filteredData.map((obj: { word: string; quantity: number }) => {
          return {
            text: obj.word,
            value: obj.quantity,
          };
        })
      );
    }
  }, [socialMediaData]);

  const options = {
    rotations: 0,
    colors: ["#556AFB", "#33429A", "#0A27E6"],
    fontWeight: "700",
    fontFamily: "Impact",
    fontSizes: [20, 80] as [number, number],
  };

  return (
    <div style={{ height: "100%" }}>
      <ReactWordcloud words={words} options={options} />
    </div>
  );
}
