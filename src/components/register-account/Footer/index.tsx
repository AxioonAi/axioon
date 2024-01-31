interface Props {
  type?: "light" | "dark";
}

export function Footer({ type = "light" }: Props) {
  return (
    <footer
      className={`flex relative lg:absolute px-4 justify-between items-center border-t border-t-${type === "light" ? "gray-60" : "gray-10"} ${type === "light" ? "text-gray-80" : "text-gray-10"} h-16 text-xs bottom-0 w-full`}
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
