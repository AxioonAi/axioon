import { getAPI } from "@/lib/axios";
import { m } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

export default function Plan() {
  const router = useRouter();
  const [selected, setSelected] = useState("none");
  const [flash, setFlash] = useState(false);
  const [query, setQuery] = useState({
    id: "",
    value: 0,
  });
  const [plans, setPlans] = useState([
    {
      benefits: [
        {
          name: "",
          description: "",
        },
      ],
      description: "",
      id: "",
      title: "",
      value: 0,
    },
    {
      benefits: [
        {
          name: "",
          description: "",
        },
      ],
      description: "",
      id: "",
      title: "",
      value: 0,
    },
    {
      benefits: [
        {
          name: "",
          description: "",
        },
      ],
      description: "",
      id: "",
      title: "",
      value: 0,
    },
  ]);
  async function getPlans() {
    const connect = await getAPI("/plans");
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setPlans(connect.body.plans);
    setQuery({
      id: connect.body.plans[0].id,
      value: connect.body.plans[0].value,
    });
  }

  const handleSelect = (item: any) => {
    setSelected(item.title);
    setQuery({
      id: item.id,
      value: item.value,
    });
  };

  useEffect(() => {
    getPlans();
  }, []);

  const handleClick = () => {
    if (selected === "none") {
      setFlash(true);
      return setTimeout(() => {
        setFlash(false);
      }, 200);
      // return alert("Selecione um plano");
    }
    return router.push(`/payment?id=${query.id}&value=${query.value}`);
  };

  return (
    <div className="Background flex flex-col items-center w-screen h-screen">
      <img
        src={"AxioonLogo.svg"}
        alt=""
        className={`w-1/2 md:w-1/4 xl:w-1/5 mt-20`}
      />
      <div className="flex flex-col w-full h-full items-center justify-center p-2">
        <div className="PlanContainer flex w-full md:w-4/5 mt-5 lg:gap-2 justify-between">
          {plans &&
            plans.map((item: any, index: number) => (
              <button
                onClick={() => handleSelect(item)}
                className={`PlanCard flex flex-col lg:w-3/12 h-16 lg:h-auto lg:min-h-[60vh] justify-between ${flash ? "scale-105" : ""} ${selected === item.title && index === 0 ? "bg-gradient-to-br from-gray-20 to-[rgba(168,21,21,0.5)] from-50%" : selected === item.title && index === 1 ? "bg-gradient-to-br from-gray-20 to-[rgba(195,195,51,0.5)] from-50%" : selected === item.title && index === 2 ? "bg-gradient-to-br from-gray-20 to-[rgba(21,112,40,0.5)] from-50%" : ""} hover:scale-[1.01] lg:p-1 rounded-xl border shadow-xl transition duration-200 ease-in-out`}
              >
                <div
                  className={`PlanCardHeader flex flex-col lg:justify-between rounded-xl w-24 sm:w-28 md:w-40 lg:w-full h-full lg:h-20 p-2 bg-darkBlueAxion text-white ${selected === item.title && index === 0 ? "bg-gradient-to-br from-[#0D123C] to-[#a81515]" : selected === item.title && index === 1 ? "bg-gradient-to-br from-[#0D123C] to-[#c3c333]" : selected === item.title && index === 2 ? "bg-gradient-to-br from-[#0D123C] to-[#157028]" : ""} text-xs transition duration-200 ease-in-out`}
                >
                  <div className="flex flex-col lg:gap-2 items-center self-center w-full h-full text-center justify-center">
                    <span className="font-bold">
                      {item.title ? (
                        item.title
                      ) : (
                        <Spinner
                          animation="border"
                          size="sm"
                          className="self-center"
                        />
                      )}
                    </span>
                    <span className="hidden lg:flex">{item.description}</span>
                  </div>
                  {selected === item.title && (
                    <Image
                      src="/Checked.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="bg-white rounded-full absolute"
                    />
                  )}
                </div>
                <div className="PlanCardBody hidden lg:flex flex-col w-11/12 lg:h-5/6 lg:mt-5 justify-between items-start self-center">
                  {item.benefits.map((benefit: any) => (
                    <div className="flex flex-col w-full text-left border-b-2 pb-2">
                      <span className="text-xs">
                        {benefit.name ? (
                          benefit.name
                        ) : (
                          <Spinner
                            animation="border"
                            size="sm"
                            className="self-center"
                          />
                        )}
                      </span>
                      <span className="text-xs font-semibold">
                        {benefit.description}
                      </span>
                    </div>
                  ))}
                  <div className="flex flex-col w-full text-left border-b-2 pb-2">
                    <span className="text-xs">Investimento:</span>
                    <span className="text-xs font-semibold">
                      {item.value ? (
                        `R$ ${item.value.toLocaleString("pt-BR")}`
                      ) : (
                        <Spinner
                          animation="border"
                          size="sm"
                          className="self-center"
                        />
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col w-full text-left pb-2">
                    <span
                      className={`text-center ${selected === item.title ? "bg-white border-[1px] border-darkBlueAxion text-black" : "bg-darkBlueAxion text-white"} rounded p-2`}
                    >
                      Selecionar Plano
                    </span>
                  </div>
                </div>
              </button>
            ))}
        </div>
        {plans && plans.length > 0 && (
          <div className="mt-2 flex items-center justify-center text-center lg:hidden">
            {selected === plans[0].title ? (
              <span className="text-black text-xs">
                {plans && plans[0].description}
              </span>
            ) : selected === plans[1].title ? (
              <span className="text-black text-xs">
                {plans && plans[1].description}
              </span>
            ) : selected === plans[2].title ? (
              <span className="text-black text-xs">
                {plans && plans[2].description}
              </span>
            ) : (
              <></>
            )}
          </div>
        )}
        <div className="PlanDescription flex flex-col lg:hidden w-full md:w-4/5 h-3/5 mt-5 justify-between">
          {selected === plans[0].title
            ? plans[0].benefits.map((item: any) => (
                <div className="flex w-full justify-between border-b">
                  <span className="text-black text-sm">
                    {item.name ? (
                      item.name
                    ) : (
                      <Spinner animation="border" size="sm" />
                    )}
                  </span>
                  <span className="font-bold text-black">
                    {item.description}
                  </span>
                </div>
              ))
            : selected === plans[1].title
              ? plans[1].benefits.map((item: any) => (
                  <div className="flex w-full justify-between border-b">
                    <span className="text-black text-sm">
                      {item.name ? (
                        item.name
                      ) : (
                        <Spinner animation="border" size="sm" />
                      )}
                    </span>
                    <span className="font-bold text-black">
                      {item.description}
                    </span>
                  </div>
                ))
              : selected === plans[2].title
                ? plans[2].benefits.map((item: any) => (
                    <div className="flex w-full justify-between border-b">
                      <span className="text-black text-sm">
                        {item.name ? (
                          item.name
                        ) : (
                          <Spinner animation="border" size="sm" />
                        )}
                      </span>
                      <span className="font-bold text-black">
                        {item.description}
                      </span>
                    </div>
                  ))
                : plans[0].benefits.map((item: any) => (
                    <div className="flex w-full justify-between border-b">
                      <span
                        className={`text-black text-sm ${flash ? "translate-x-[1px]" : ""} transition duration-75 ease-linear`}
                      >
                        {item.name ? (
                          item.name
                        ) : (
                          <Spinner animation="border" size="sm" />
                        )}
                      </span>
                      <span
                        className={`text-black text-sm ${flash ? "translate-x-[1px]" : ""} transition duration-75 ease-linear`}
                      >
                        ...
                      </span>
                    </div>
                  ))}
          {selected === plans[0].title ||
            selected === plans[1].title ||
            (selected === plans[2].title && (
              <div className="flex w-full justify-between border-b">
                <span className="text-black text-sm">Investimento:</span>
                <span className="font-bold text-black">
                  {selected === plans[0].title ? (
                    plans[0].value ? (
                      `R$ ${plans[0].value.toLocaleString("pt-BR")}`
                    ) : (
                      <Spinner animation="border" size="sm" />
                    )
                  ) : selected === plans[1].title ? (
                    plans[1].value ? (
                      `R$ ${plans[1].value.toLocaleString("pt-BR")}`
                    ) : (
                      <Spinner animation="border" size="sm" />
                    )
                  ) : plans[2].value ? (
                    `R$ ${plans[2].value.toLocaleString("pt-BR")}`
                  ) : (
                    <Spinner animation="border" size="sm" />
                  )}
                </span>
              </div>
            ))}
        </div>
        <button
          className="Select self-center md:w-2/5 w-4/5 h-12 xl:h-16 bg-white text-darkBlueAxion border-[1px] border-darkBlueAxion rounded-xl mt-10 font-bold md:text-2xl"
          onClick={() => handleClick()}
        >
          {selected === "none"
            ? "Selecione um plano para prosseguir"
            : "Prosseguir"}
        </button>
      </div>
    </div>
  );
}
