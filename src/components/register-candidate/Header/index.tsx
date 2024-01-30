import { authGetAPI } from "@/lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  type?: "light" | "dark";
}

export function RegisterCandidateHeader({ type = "light" }: Props) {
  const [newUser, setNewUser] = useState(false);
  const router = useRouter();

  async function getPoliticians() {
    const connect = await authGetAPI("/profile/monitoring");
    if (connect.body.profile.length === 0) {
      return setNewUser(true);
    }
    if (connect.body.profile.length !== 0) {
      return setNewUser(false);
    }
  }

  useEffect(() => {
    getPoliticians();
  }, []);

  const handleClick = () => {
    if (newUser) {
      router.push("/login");
    } else {
      router.push("/");
    }
  };

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
        className={`py-2 px-3 border rounded ${type === "light" ? "border-darkBlueAxion" : "border-gray-10"} ${type === "light" ? "bg-darkBlueAxion" : "bg-gray-10"} font-bold mr-[2%] transition duration-300 text-sm bg-transparent hover:bg-darkBlueAxion ${type === "light" ? "text-black" : "text-gray-10"}`}
        onClick={handleClick}
      >
        {newUser ? "Sair" : "Voltar"}
      </button>
    </header>
  );
}
