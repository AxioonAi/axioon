import { useRouter } from "next/router";

interface ItemProps {
  name: string;
  fadeOut: any;
  selectedComparison: string;
  setSelectedComparison: any;
}

export function ComparisonItemComponent({
  name,
  fadeOut,
  selectedComparison,
  setSelectedComparison,
}: ItemProps) {
  const handleClick = () => {
    if (selectedComparison === name) {
      return;
    }
    if (selectedComparison !== name) {
      return setSelectedComparison(name);
    }
  };

  return (
    <div
      className={`MenuItem relative flex justify-center items-center cursor-pointer w-52 h-24 rounded-xl shadow-lg transition duration-200 bg-no-repeat bg-center ${
        name === "SEU ELEITORADO"
          ? "bg-[url(/dashboard/seu-eleitorado-menu.png)]"
          : name === "MÍDIAS SOCIAIS"
            ? "bg-[url(/dashboard/midias-sociais-menu.png)]"
            : name === "MENÇÕES"
              ? "bg-[url(/dashboard/suas-noticias-menu.png)]"
              : "bg-[url(/dashboard/inteligencia-artificial-menu.png)]"
      }
      bg-cover
      ${selectedComparison === name ? "opacity-100" : "opacity-40"}
       hover:opacity-90 hover:scale-110 hover:cursor-pointer`}
      onClick={handleClick}
    >
      <div className="title flex justify-center py2 border border-gray-10 rounded text-bold text-white bg-[rgba(0,0,0,0.5)] w-[92%]">
        <strong className="text-sm">{name}</strong>
      </div>

      <img
        src="/sidebar/axion-white.svg"
        alt=""
        className="absolute bottom-3 w-20"
      />
    </div>
  );
}
