import { useRouter } from "next/router";
import { RegisterHeader } from "./styles";

interface Props {
  type?: "light" | "dark";
  logged: boolean;
}

export function RegisterAccountHeader({ type = "light", logged }: Props) {
  const handleClick = () => {
    logged ? router.push("/") : router.push("/login");
  };
  const router = useRouter();

  return (
    <RegisterHeader type={type}>
      {type === "light" ? (
        <img src="/axionLogo.png" alt="" />
      ) : (
        <img src="/sidebar/axion-white.svg" alt="" />
      )}
      <button onClick={handleClick}>
        {logged ? "Voltar" : "Já é cliente? Acessar"}
      </button>
    </RegisterHeader>
  );
}
