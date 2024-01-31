export function formatNumberWithDot(numero: number): string {
  const numeroString = numero.toString();

  const partes = numeroString.split(".");

  const parteInteiraFormatada = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const parteDecimalFormatada = partes[1] ? `.${partes[1]}` : "";

  return parteInteiraFormatada + parteDecimalFormatada;
}
