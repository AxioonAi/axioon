import { TitleWithBar } from "@/components/Global/TitleWithBar";

interface Props {
  title?: string;
  value?: number | string;
  firstDate?: string;
  lastDate?: string;
  type?: string;
}

export function TotalQuotes({
  title,
  value,
  firstDate,
  lastDate,
  type,
}: Props) {
  return (
    <div className="Container flex flex-col items-center justify-center rounded-lg p-2 text-3xl w-64">
      <TitleWithBar
        content={title === undefined ? "Citações Totais" : title}
        barColor="#8FC96A"
      />
      <div className="flex flex-col items-center justify-between">
        <strong>
          {value === undefined || value === null ? "340.120" : value}
        </strong>
      </div>
      <div className="flex flex-col gap-2 px-2">
        <span className="text-sm text-[#8790AB]">
          {firstDate === undefined || firstDate === null
            ? "30/09/2022"
            : firstDate}
          - {!lastDate ? "Indefinido" : lastDate}
        </span>
      </div>
    </div>
  );
}
