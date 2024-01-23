import { useRouter } from "next/router";

interface ItemProps {
  href: string;
  name: string;
  fadeOut: any;
  selectedPage?: string;
  setSelectedPage?: any;
  click?: boolean;
}

export function MenuItemComponent({
  href,
  name,
  fadeOut,
  selectedPage,
  setSelectedPage,
  click,
}: ItemProps) {
  const router = useRouter();

  const isActive = `/${router.asPath.split("/")[2]}` === href;

  const navigate = () => {
    if (selectedPage) {
      if (isActive && selectedPage !== "initial") {
        return setSelectedPage("initial");
      }
      if (!isActive && selectedPage !== href) {
        fadeOut();
      }
      return router.push(`/home/${href}`);
    } else {
      return router.push(`/home/${href}`);
    }
  };

  return (
    <div
      className={`MenuItem relative flex justify-center items-center cursor-pointer w-52 h-24 rounded-xl shadow-lg transition duration-200 ${
        isActive ? "opacity-100" : "opacity-40"
      }
      bg-no-repeat bg-center ${
        name === "SEU ELEITORADO"
          ? "bg-[url(/dashboard/seu-eleitorado-menu.png)]"
          : name === "MÍDIAS SOCIAIS"
            ? "bg-[url(/dashboard/midias-sociais-menu.png)]"
            : name === "JURÍDICO"
              ? "bg-[url(/dashboard/juridico-menu.png)]"
              : name === "MENÇÕES"
                ? "bg-[url(/dashboard/suas-noticias-menu.png)]"
                : "bg-[url(/dashboard/inteligencia-artificial-menu.png)]"
      }
      bg-cover
       hover:opacity-90 hover:scale-110
       ${click ? "scale-105" : "scale-100"} ${click ? "border-[1px]" : "border-0"} ${click ? "border-darkBlueAxion" : "border-gray-10"}
       `}
      onClick={navigate}
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
