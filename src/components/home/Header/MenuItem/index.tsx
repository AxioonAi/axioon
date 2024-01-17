import { useRouter } from "next/router";

interface ItemProps {
  href: string;
  name: string;
  fadeOut: any;
  selectedPage?: string;
  setSelectedPage?: any;
}

export function MenuItemComponent({
  href,
  name,
  fadeOut,
  selectedPage,
  setSelectedPage,
}: ItemProps) {
  const router = useRouter();

  const isActive = `/${router.asPath.split("/")[2]}` === href;

  const navigate = () => {
    if (isActive && selectedPage !== "initial") {
      return setSelectedPage("initial");
    }
    if (!isActive && selectedPage !== href) {
      fadeOut();
    }
    router.push(`/home/${href}`);
  };

  return (
    <div
      className={`MenuItem relative flex justify-center items-center cursor-pointer w-64 h-32 rounded-xl shadow-lg transition duration-200 ${
        isActive ? "opacity-100" : "opacity-40"
      }
      bg-no-repeat bg-center ${
        name === "SEU ELEITORADO"
          ? "bg-[url(/dashboard/seu-eleitorado-menu.png)]"
          : name === "MÍDIAS SOCIAIS"
            ? "bg-[url(/dashboard/midias-sociais-menu.png)]"
            : name === "MENÇÕES"
              ? "bg-[url(/dashboard/suas-noticias-menu.png)]"
              : "bg-[url(/dashboard/inteligencia-artificial-menu.png)]"
      }
      bg-cover
      third:bg-[url(/dashboard/axion-menu.png)]
       hover:opacity-90 hover:scale-110`}
      onClick={navigate}
    >
      <div className="title flex justify-center py2 border border-gray-10 rounded text-bold text-white bg-[rgba(0,0,0,0.5)] w-[92%]">
        <strong className="text-base">{name}</strong>
      </div>

      <img
        src="/sidebar/axion-white.svg"
        alt=""
        className="absolute bottom-3 w-20"
      />
    </div>
  );
}
