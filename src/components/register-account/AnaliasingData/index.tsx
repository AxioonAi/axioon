import { windowWidth } from "@/utils/windowWidth";
import { useEffect, useState } from "react";

export function AnialiasingFormData() {
  const [dotsValue, setDotsValue] = useState(".");

  const [pontos, setPontos] = useState(".");
  function AlternarPontos() {
    useEffect(() => {
      const interval = setInterval(() => {
        if (pontos === ".") {
          setPontos("..");
        } else if (pontos === "..") {
          setPontos("...");
        } else {
          setPontos(".");
        }
      }, 500); // Altere o intervalo de tempo conforme desejado (em milissegundos)

      return () => clearInterval(interval);
    }, [pontos]);
  }

  AlternarPontos();

  return (
    <>
      <div className="Container relative flex flex-col min-h-screen items-center justifyc-center pb-20">
        <strong className="text-3xl md:text-5xl">Estamos analisando!</strong>
        <span className="mt-3 mb-5 text-lg md:text-2xl text-gray-80 max-w-[400px] text-center">
          Isso leva menos de 1 minuto, aguarde aqui mesmo.
        </span>
        {windowWidth(768) ? (
          <div className="custom-loader-small mt-3 mb-5" />
        ) : (
          <div className="custom-loader-big mt-3 mb-5" />
        )}
        <span className="text-lg md:text-2xl text-darkBlueAxion relative">
          CARREGANDO
          <span className="text-lg md:text-2xl absolute -right-5 w-5">
            {pontos}
          </span>
        </span>
      </div>
      ;
    </>
  );
}
