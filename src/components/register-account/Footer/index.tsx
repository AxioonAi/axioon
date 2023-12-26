import { StyledFooter } from "./styles";

interface Props {
  type?: 'light' | 'dark';
}

export function Footer({ type = 'light' }: Props) {
  return (
    <StyledFooter type={type}>
      <div>
        <p>
          Copyright © 2022 Axioon. Todos os direitos reservados. CNPJ nº
          01.233.000/0001-31
        </p>
      </div>
      <div>Política de privacidade | Termos de serviço</div>
    </StyledFooter>
  );
}
