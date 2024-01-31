import { CreditCardForm } from "@/components/payment/CreditCardForm";
import { PixPayment } from "@/components/payment/PixPayment";
import { Footer } from "@/components/register-account/Footer";
import { RegisterAccountHeader } from "@/components/register-account/Header";
import { AuthPostAPI, getAPI, loginVerifyAPI } from "@/lib/axios";
import { windowWidth } from "@/utils/windowWidth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState("creditCard");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pix, setPix] = useState({
    encodedImage: "",
    expirationDate: "",
    payload: "",
    payment_id: "",
    value: 0,
  });
  const [cardFormData, setCardFormData] = useState({
    creditCard: {
      holderName: "",
      number: "",
      expiryDate: "",
      ccv: "",
    },
    creditCardHolderInfo: {
      name: "",
      email: "",
      cpfCnpj: "",
      postalCode: "",
      addressNumber: "",
      phone: "",
    },
    installmentCount: 1,
    saveCreditCard: false,
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
  ]);
  const router = useRouter();
  const query: any = router.query;

  const handleRadioChange = (event: { target: { value: string } }) => {
    setSelectedMethod(event.target.value);
  };

  async function getPlans() {
    const connect = await getAPI("/plans");
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setPlans(connect.body.plans.filter((plan: any) => plan.id === query.id));
  }

  async function handlePix() {
    const connect = await AuthPostAPI(`/pix/${query.id}`, {});
    if (connect.status !== 200) {
      return alert(connect.body);
    }
    setPix(connect.body.payment.payment);
  }

  async function handleCard() {
    setLoading(true);
    const connect = await AuthPostAPI(`/new-credit-card/${query.id}`, {
      ...cardFormData,
      creditCard: {
        ...cardFormData.creditCard,
        expiryMonth: cardFormData.creditCard.expiryDate.split("/")[0],
        expiryYear: cardFormData.creditCard.expiryDate.split("/")[1],
      },
    });
    if (connect.status !== 200) {
      alert(connect.body);
      return setLoading(false);
    }
    router.push("/finish-payment");
    return setLoading(false);
  }

  async function handleVerify() {
    const connect = await loginVerifyAPI();
    if (connect !== 200) {
      return router.push("/login");
    }
  }

  useEffect(() => {
    handleVerify();
    getPlans();
  }, []);

  return (
    <div className="Container relative min-h-screen pb-16 lg:pb-32">
      <RegisterAccountHeader where="plan" />
      <main className="flex flex-col lg:flex-row justify-around m-auto lg:pl-20">
        {plans && plans[0].title !== "" ? (
          <div
            className={`${plans[0].title === "Enterprise" ? "bg-gradient-to-br from-darkBlueAxion to-[rgba(168,21,21)] to-90%" : plans[0].title === "Básico" ? "bg-gradient-to-br from-darkBlueAxion to-[rgba(195,195,51)] to-90%" : "bg-gradient-to-br from-darkBlueAxion to-[rgba(21,112,40)] to-90%"} text-white flex flex-col h-48 rounded-xl lg:hidden w-full px-4 py-8 justify-between`}
          >
            <div className="flex gap-4 items-center justify-between w-11/12 self-center border-b-[1px] border-white">
              <p className="text-center font-bold text-lg">Plano</p>
              <p className="text-center text-xl">
                12 meses de {plans && plans[0].title}
              </p>
            </div>

            <div className="flex gap-4 items-center justify-between w-11/12 self-center border-b-[1px] border-white">
              <p className="text-center font-bold text-lg">Valor</p>
              <p className="text-center text-xl">
                {plans &&
                  plans[0].value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="paymentContainer flex flex-col min-h-[32rem] p-4">
          <div className="paymentSelector flex flex-col gap-8 pt-8">
            <div className="radioGroup flex gap-2 items-center">
              <label
                className="radioSelector flex items-center justify-center w-6 h-6 border border-gray-60 rounded-full"
                htmlFor="creditCard"
              >
                <div
                  className={`transition duration-300 w-5 h-5 rounded-full ${selectedMethod === "creditCard" ? "bg-gray-60" : "bg-transparent"}`}
                />
              </label>
              <input
                className="hidden"
                type="radio"
                name="payMethod"
                id="creditCard"
                value="creditCard"
                checked={selectedMethod === "creditCard"}
                onChange={handleRadioChange}
              />
              <label htmlFor="creditCard">
                {!windowWidth(768) ? (
                  <img src="/payment/cardFlags.png" />
                ) : (
                  <img src="/payment/cardFlagsMobile.png" className="w-52" />
                )}
              </label>
            </div>
            <div className="radioGroup flex gap-2 items-center">
              <label
                className="radioSelector flex items-center justify-center w-6 h-6 border border-gray-60 rounded-full"
                htmlFor="pix"
              >
                <div
                  className={`transition duration-300 w-5 h-5 rounded-full ${selectedMethod === "pix" ? "bg-gray-60" : "bg-transparent"}`}
                />
              </label>
              <input
                className="hidden"
                type="radio"
                name="payMethod"
                id="pix"
                value="pix"
                checked={selectedMethod === "pix"}
                onChange={handleRadioChange}
              />
              <label htmlFor="pix">
                <Image width={25} height={25} src={"/payment/pix.png"} alt="" />
              </label>
            </div>
          </div>

          {selectedMethod === "creditCard" ? (
            <CreditCardForm
              cardFormData={cardFormData}
              setCardFormData={setCardFormData}
              step={step}
              setStep={setStep}
              handleCard={handleCard}
              value={query.value}
              loading={loading}
              setLoading={setLoading}
            />
          ) : selectedMethod === "pix" ? (
            <PixPayment handlePix={handlePix} pix={pix} />
          ) : (
            <div style={{ paddingBottom: "14rem" }} />
          )}
        </div>
        {plans && plans[0].title !== "" ? (
          <div
            className={`${plans[0].title === "Enterprise" ? "bg-gradient-to-br from-darkBlueAxion to-[rgba(168,21,21)] to-90%" : plans[0].title === "Básico" ? "bg-gradient-to-br from-darkBlueAxion to-[rgba(195,195,51)] to-90%" : "bg-gradient-to-br from-darkBlueAxion to-[rgba(21,112,40)] to-90%"} gap-1 text-white hidden h-48 rounded-xl lg:flex lg:flex-col w-1/2 max-w-xl mt-12 px-4 py-8 justify-between`}
          >
            <div className="flex gap-4 items-center justify-between w-11/12 self-center border-b-[1px] border-white">
              <p className="text-center font-bold text-xl">Plano</p>
              <p className="text-center text-2xl">
                12 meses de {plans && plans[0].title}
              </p>
            </div>

            <div className="flex gap-4 items-center justify-between w-11/12 self-center border-b-[1px] border-white">
              <p className="text-center font-bold text-xl">Valor</p>
              <p className="text-center text-2xl">
                {plans &&
                  plans[0].value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </main>
      <Footer />
    </div>
  );
}
