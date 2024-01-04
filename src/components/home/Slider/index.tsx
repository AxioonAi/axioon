import { Container, SliderEmpty, SliderFilled } from "./styles";

interface Props {
  fill: string | number;
  fillColor: string;
  empty: string | number;
  emptyColor: string;
}

export function Slider({ fill, fillColor, empty, emptyColor }: Props) {
  return (
    <Container>
      <SliderFilled fill={fill} fillColor={fillColor}>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "-3px",
            width: "3px",
            height: "16px",
            backgroundColor: "#3C3C3C",
            borderRadius: "2px",
          }}
        />
      </SliderFilled>
      <SliderEmpty empty={empty} emptyColor={emptyColor} />
    </Container>
  );
}
