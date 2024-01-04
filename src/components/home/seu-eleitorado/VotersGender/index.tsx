import { Slider } from "../../Slider";
import { CellContent, CellInfo, Container } from "./styles";

interface PopulationProps {
  population: {
    male: number;
    female: number;
    total: number;
  };
}

export function VotersGender({ population }: PopulationProps) {
  return (
    <Container>
      <CellContent>
        <strong>Homens</strong>
        <CellInfo>
          <Slider
            fill={`${population?.male}%`}
            empty={`${population?.female}%`}
            fillColor="linear-gradient(270deg, #0D123C 0%, rgba(13, 18, 60, 0.40) 106.97%)"
            emptyColor="#CFD0D8"
          />
          <strong>{population?.male}</strong>
        </CellInfo>
      </CellContent>

      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#C8C8C8",
          position: "absolute",
          left: 0,
        }}
      />

      <CellContent>
        <strong>Mulheres</strong>
        <CellInfo>
          <Slider
            fill={`${population?.female}%`}
            empty={`${population?.male}%`}
            fillColor="linear-gradient(270deg, #E7298A 0%, rgba(231, 41, 138, 0.40) 106.97%);"
            emptyColor="#FAD4E8"
          />
          <strong>{population?.female}</strong>
        </CellInfo>
      </CellContent>

      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#C8C8C8",
          position: "absolute",
          left: 0,
        }}
      />

      <CellContent style={{ paddingBottom: 0 }}>
        <strong>Total</strong>
        <CellInfo>
          <Slider
            fill="100%"
            empty="0%"
            fillColor="linear-gradient(270deg, #00B132 0%, rgba(0, 145, 41, 0.40) 106.97%)"
            emptyColor="#9BE0AF"
          />
          <strong>{population?.total}</strong>
        </CellInfo>
      </CellContent>
    </Container>
  );
}
