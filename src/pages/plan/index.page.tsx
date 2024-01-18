import { getAPI } from "@/lib/axios";
import { m } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

export default function Plan() {
  const router = useRouter();
  const [selected, setSelected] = useState("none");
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
    setSelected(connect.body.plans[0].title);
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

  return (
    <div className="Background flex flex-col items-center bg-gradient-to-br from-[#0D123C] to-[#34374C] w-screen h-screen lg:p-10 md:p-5 p-3">
      <img src={"AxioonLogoWhite.svg"} alt="" className={`w-1/2 md:w-1/4`} />
      <>
        <div className="PlanContainer flex w-full md:w-4/5 mt-5 lg:gap-2 justify-between">
          {plans &&
            plans.map((item: any) => (
              <button
                onClick={() => handleSelect(item)}
                className={`PlanCard flex flex-col lg:w-3/12 h-16 lg:h-auto lg:min-h-[60vh] justify-between bg-white lg:p-1 rounded-xl border ${
                  selected === item.plan ? "drop-shadow-xl" : ""
                }`}
              >
                <div className="PlanCardHeader flex flex-col lg:justify-between rounded-xl w-24 sm:w-28 md:w-40 lg:w-full h-full lg:h-20 p-2 bg-black text-xs">
                  <div className="flex flex-col lg:gap-2 items-center self-center w-full h-full text-center justify-center">
                    <span className="text-white font-bold">
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
                    <span className="text-white hidden lg:flex">
                      {item.description}
                    </span>
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
                </div>
              </button>
            ))}
        </div>
        {plans && plans.length > 0 && (
          <div className="mt-2 flex items-center justify-center text-center lg:hidden">
            {selected === plans[0].title ? (
              <span className="text-white text-sm">
                {plans && plans[0].description}
              </span>
            ) : selected === plans[1].title ? (
              <span className="text-white text-sm">
                {plans && plans[1].description}
              </span>
            ) : (
              <span className="text-white text-sm">
                {plans && plans[2].description}
              </span>
            )}
          </div>
        )}
        <div className="PlanDescription flex flex-col lg:hidden w-full md:w-4/5 h-3/5 mt-5 justify-between">
          {selected === plans[0].title
            ? plans[0].benefits.map((item: any) => (
                <div className="flex w-full justify-between border-b">
                  <span className="text-white text-sm">
                    {item.name ? (
                      item.name
                    ) : (
                      <Spinner animation="border" size="sm" />
                    )}
                  </span>
                  <span className="font-bold text-white">
                    {item.description}
                  </span>
                </div>
              ))
            : selected === plans[1].title
              ? plans[1].benefits.map((item: any) => (
                  <div className="flex w-full justify-between border-b">
                    <span className="text-white text-sm">
                      {item.name ? (
                        item.name
                      ) : (
                        <Spinner animation="border" size="sm" />
                      )}
                    </span>
                    <span className="font-bold text-white">
                      {item.description}
                    </span>
                  </div>
                ))
              : plans[2].benefits.map((item: any) => (
                  <div className="flex w-full justify-between border-b">
                    <span className="text-white text-sm">
                      {item.name ? (
                        item.name
                      ) : (
                        <Spinner animation="border" size="sm" />
                      )}
                    </span>
                    <span className="font-bold text-white">
                      {item.description}
                    </span>
                  </div>
                ))}
        </div>
      </>
      <button
        className="Select self-center md:w-2/5 w-4/5 h-12 md:h-20 bg-white rounded-xl mt-10 font-bold text-lg md:text-2xl"
        onClick={() =>
          router.push(`/payment?id=${query.id}&value=${query.value}`)
        }
      >
        Selecionar Plano
      </button>
    </div>
  );
}
