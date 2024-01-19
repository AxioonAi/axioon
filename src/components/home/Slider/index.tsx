import { Container, SliderEmpty, SliderFilled } from "./styles";

interface Props {
  fill: string | number;
  fillColor: string;
  empty: string | number;
  emptyColor: string;
}

export function Slider({ fill, fillColor, empty, emptyColor }: Props) {
  return (
    <div className="Container flex w-28 md:w-40 h-2 roudned">
      <div
        className="Slider relative h-full rounded"
        style={{ width: `${fill}`, background: fillColor }}
      >
        <div className="absolute right-0 -top-1 w-1 h-4 bg-[#3c3c3c] rounded" />
      </div>
      <div
        className="SliderEmpty relative h-full rounded"
        style={{ width: `${empty}`, background: emptyColor }}
      />
    </div>
  );
}
