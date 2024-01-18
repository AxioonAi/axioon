import { StyledFooter } from "./styles";

interface Props {
  type?: "light" | "dark";
}

export function Footer({ type = "light" }: Props) {
  return (
    <footer
      className={`flex px-4 justify-between items-center border-t-2 border-t-${type === "light" ? "gray-60" : "gray-10"} ${type === "light" ? "text-gray-80" : "text-gray-10"} h-16 text-xs absolute bottom-0 w-full`}
    >
      <div>
        <p>
          Copyright © 2022 Axioon. Todos os direitos reservados. CNPJ nº
          01.233.000/0001-31
        </p>
      </div>
      <div>Política de privacidade | Termos de serviço</div>
    </footer>
  );
}
