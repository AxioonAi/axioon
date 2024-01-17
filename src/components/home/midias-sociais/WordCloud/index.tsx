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
        (obj: { quantity: number }) => obj.quantity > 20
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
    <div className="sm:h-96 md:h-[40vh] xl:h-52 2xl:h-68 w-full">
      <ReactWordcloud words={words} options={options} />
    </div>
  );
}
