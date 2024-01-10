import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Plan() {
  const router = useRouter();
  const [selected, setSelected] = useState("Plan1");
  const plans = [
    {
      plan: "Plan1",
      name: "Essencial",
      description: "Essencial",
      benefits: [
        {
          title: "Benefício1 1",
          description: "Benefício1 1",
        },
        {
          title: "Benefício1 2",
          description: "Benefício1 2",
        },
        {
          title: "Benefício1 3",
          description: "Benefício1 3",
        },
        {
          title: "Benefício1 4",
          description: "Benefício1 4",
        },
        {
          title: "Benefício1 5",
          description: "Benefício1 5",
        },
      ],
    },
    {
      plan: "Plan2",
      name: "Essencial2",
      description: "Essencial2",
      benefits: [
        {
          title: "Benefício2 1",
          description: "Benefício2 1",
        },
        {
          title: "Benefício2 2",
          description: "Benefício2 2",
        },
        {
          title: "Benefício2 3",
          description: "Benefício2 3",
        },
        {
          title: "Benefício2 4",
          description: "Benefício2 4",
        },
        {
          title: "Benefício2 5",
          description: "Benefício2 5",
        },
      ],
    },
    {
      plan: "Plan3",
      name: "Essencial3",
      description: "Essencial3",
      benefits: [
        {
          title: "Benefício3 1",
          description: "Benefício3 1",
        },
        {
          title: "Benefício3 2",
          description: "Benefício3 2",
        },
        {
          title: "Benefício3 3",
          description: "Benefício3 3",
        },
        {
          title: "Benefício3 4",
          description: "Benefício3 4",
        },
        {
          title: "Benefício3 5",
          description: "Benefício3 5",
        },
      ],
    },
    {
      plan: "Plan4",
      name: "Essencial4",
      description: "Essencial4",
      benefits: [
        {
          title: "Benefício4 1",
          description: "Benefício4 1",
        },
        {
          title: "Benefício4 2",
          description: "Benefício4 2",
        },
        {
          title: "Benefício4 4",
          description: "Benefício4 4",
        },
        {
          title: "Benefício4 4",
          description: "Benefício4 4",
        },
        {
          title: "Benefício4 5",
          description: "Benefício4 5",
        },
      ],
    },
  ];
  return (
    <div className="Background flex flex-col items-center bg-gradient-to-br from-[#0D123C] to-[#34374C] w-screen h-screen lg:p-10 md:p-5 p-3">
      <img src={"AxioonLogoWhite.svg"} alt="" className={`w-1/2 md:w-1/4`} />
      <div className="PlanContainer flex w-full md:w-4/5 lg:h-3/5 mt-5 lg:gap-2 justify-between">
        {plans.map((item) => (
          <button
            onClick={() => setSelected(item.plan)}
            className={`PlanCard flex flex-col lg:w-3/12 h-24 lg:h-auto justify-between bg-white lg:p-2 rounded-xl border ${
              selected === item.plan ? "drop-shadow-xl" : ""
            }`}
          >
            <div className="PlanCardHeader flex flex-col justify-between rounded-xl md:w-28 lg:w-full w-20 lg:h-1/6 h-full p-2 lg:p-3 bg-black text-xs">
              <div className="flex flex-col">
                <span className="text-white font-bold">{item.name}</span>
                <span className="text-white">{item.description}</span>
              </div>
              {selected === item.plan && (
                <Image
                  src="/Checked.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="bg-white rounded-full self-end"
                />
              )}
            </div>
            <div className="PlanCardBody hidden lg:flex flex-col w-full lg:h-5/6 lg:mt-5 justify-between items-start">
              {item.benefits.map((benefit) => (
                <div className="flex flex-col w-full text-left border-b-2">
                  <span className="font-bold">{benefit.title}</span>
                  <span>{benefit.description}</span>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
      <div className="PlanDescription flex flex-col lg:hidden w-full md:w-4/5 h-3/5 mt-5 justify-between">
        {selected === "Plan1"
          ? plans[0].benefits.map((item) => (
              <div className="flex w-full justify-between border-b">
                <span className="text-white">{item.title}</span>
                <span className="font-bold text-white">{item.description}</span>
              </div>
            ))
          : selected === "Plan2"
            ? plans[1].benefits.map((item) => (
                <div className="flex w-full justify-between border-b">
                  <span className="text-white">{item.title}</span>
                  <span className="font-bold text-white">
                    {item.description}
                  </span>
                </div>
              ))
            : selected === "Plan3"
              ? plans[2].benefits.map((item) => (
                  <div className="flex w-full justify-between border-b">
                    <span className="text-white">{item.title}</span>
                    <span className="font-bold text-white">
                      {item.description}
                    </span>
                  </div>
                ))
              : plans[3].benefits.map((item) => (
                  <div className="flex w-full justify-between border-b">
                    <span className="text-white">{item.title}</span>
                    <span className="font-bold text-white">
                      {item.description}
                    </span>
                  </div>
                ))}
      </div>
      <button
        className="Select self-center md:w-2/5 w-4/5 h-12 md:h-20 bg-white rounded-xl mt-10 font-bold text-lg md:text-2xl"
        onClick={() => router.push("/finish-payment")}
      >
        Selecionar Plano
      </button>
    </div>
  );
}
