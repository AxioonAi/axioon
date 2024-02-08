import { Slider } from "../../Slider";

interface PopulationProps {
  population: {
    male: number;
    female: number;
    total: number;
  };
}

export function VotersGender({ population }: PopulationProps) {
  return (
    <div className="Container flex flex-col">
      <div className="CellContent flex items-start justify-between p-4 md:p-8">
        <strong>Homens</strong>
        <div className="CellInfo flex flex-col items-center gap-2 p-2 text-sm">
          <Slider
            fill={`${population?.male}%`}
            empty={`${population?.female}%`}
            fillColor="linear-gradient(270deg, #0D123C 0%, rgba(13, 18, 60, 0.40) 106.97%)"
            emptyColor="#CFD0D8"
          />
          <strong>{population?.male}</strong>
        </div>
      </div>

      <div className="border-t border-b border-solid border-[#C8C8C8] w-full" />

      <div className="CellContent flex items-start justify-between p-4 md:p-8">
        <strong>Mulheres</strong>
        <div className="CellInfo flex flex-col items-center gap-2 p-2 text-sm">
          <Slider
            fill={`${population?.female}%`}
            empty={`${population?.male}%`}
            fillColor="linear-gradient(270deg, #E7298A 0%, rgba(231, 41, 138, 0.40) 106.97%)"
            emptyColor="#FAD4E8"
          />
          <strong>{population?.female}</strong>
        </div>
      </div>

      <div className="border-t border-b border-solid border-[#C8C8C8] w-full" />

      <div className="CellContent flex items-start justify-between p-4 md:p-8">
        <strong>Total</strong>
        <div className="CellInfo flex flex-col items-center gap-2 p-2 text-sm">
          <Slider
            fill="100%"
            empty="0%"
            fillColor="linear-gradient(270deg, #18432A 0%, rgba(24, 67, 42, 0.40) 106.97%)"
            emptyColor="#9BE0AF"
          />
          <strong>{population?.total}</strong>
        </div>
      </div>
    </div>
  );
}
