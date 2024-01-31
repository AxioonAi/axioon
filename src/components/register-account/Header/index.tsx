import { useRouter } from "next/router";

interface Props {
  type?: "light" | "dark";
  where?: string;
}

export function RegisterAccountHeader({ type = "light", where }: Props) {
  const handleClick = () => {
    return router.push(where ? `/${where}` : "/login");
  };
  const router = useRouter();

  return (
    <header className="registerHeader flex items-center justify-between h-16 border-b border-gray-60">
      {type === "light" ? (
        <img
          className="w-28 md:w-40 h-auto ml-[2%]"
          src="/axionLogo.png"
          alt=""
        />
      ) : (
        <img
          className="w-28 md:w-40 h-auto ml-[2%]"
          src="/sidebar/axion-white.svg"
          alt=""
        />
      )}
      <button
        className={`py-2 px-3 border ${type === "light" ? "border-darkBlueAxion" : "border-gray-10"} ${type === "light" ? "bg-darkBlueAxion" : "bg-gray-10"} font-bold mr-[2%] transition duration-300 text-sm bg-transparent hover:bg-darkBlueAxion ${type === "light" ? "text-black" : "text-gray-10"}`}
        onClick={handleClick}
      >
        Voltar
      </button>
    </header>
  );
}
