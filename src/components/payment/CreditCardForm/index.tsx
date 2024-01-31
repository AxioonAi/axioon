import Theme from "@/styles/themes";
import {
  stripeCardExpirValidation,
  stripeCardNumberValidation,
} from "@/utils/creditCardValidation";
import {
  CreditCardHolderValidation,
  CreditCardValidation,
  isObjectEmpty,
} from "@/utils/formValidation";
import {
  maskCVC,
  maskCard,
  maskCep,
  maskCpfCnpj,
  maskExpiryDate,
  maskPhone,
  minLength,
  textWithSpacesOnly,
} from "@/utils/masks";
import ActionSheet from "actionsheet-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";

interface CreditCardFormProps {
  cardFormData: {
    creditCard: {
      holderName: string;
      number: string;
      expiryDate: string;
      ccv: string;
    };
    creditCardHolderInfo: {
      name: string;
      email: string;
      cpfCnpj: string;
      postalCode: string;
      addressNumber: string;
      phone: string;
    };
    installmentCount: number;
    saveCreditCard: boolean;
  };
  setCardFormData: any;
  step: number;
  setStep: (step: number) => void;
  handleCard: () => void;
  value: any;
  loading: boolean;
  setLoading: (value: boolean) => void;
}
export function CreditCardForm({
  cardFormData,
  setCardFormData,
  step,
  setStep,
  handleCard,
  value,
  loading,
  setLoading,
}: CreditCardFormProps) {
  const [error, setError] = useState<any>({});
  const [installment, setInstallment] = useState({
    value: 1,
  });
  const [installments, setInstallments] = useState([
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
    {
      value: 5,
    },
    {
      value: 6,
    },
    {
      value: 7,
    },
    {
      value: 8,
    },
    {
      value: 9,
    },
    {
      value: 10,
    },
    {
      value: 11,
    },
    {
      value: 12,
    },
  ]);
  const ref = useRef<any>();
  const handleOpen = () => {
    ref.current.open();
  };
  const handleClose = (item: any) => {
    setCardFormData({
      ...cardFormData,
      installmentCount: item.value,
    });
    setInstallment(item);
    ref.current.close();
  };

  const handleClick = () => {
    if (
      (step === 1 && cardFormData.creditCard.holderName === "") ||
      cardFormData.creditCard.number === "" ||
      cardFormData.creditCard.expiryDate === "" ||
      cardFormData.creditCard.ccv === ""
    ) {
      return alert("Preencha todos os campos");
    }
    if (
      step === 1 &&
      cardFormData.creditCard.holderName !== "" &&
      cardFormData.creditCard.number !== "" &&
      cardFormData.creditCard.expiryDate !== "" &&
      cardFormData.creditCard.ccv !== "" &&
      isObjectEmpty(CreditCardValidation(cardFormData.creditCard))
    ) {
      return setStep(2);
    }
    if (
      (step === 2 && cardFormData.creditCardHolderInfo.name === "") ||
      cardFormData.creditCardHolderInfo.email === "" ||
      cardFormData.creditCardHolderInfo.cpfCnpj === "" ||
      cardFormData.creditCardHolderInfo.postalCode === "" ||
      cardFormData.creditCardHolderInfo.addressNumber === "" ||
      cardFormData.creditCardHolderInfo.phone === ""
    ) {
      return alert("Preencha todos os campos");
    }
    if (
      step === 2 &&
      cardFormData.creditCardHolderInfo.name !== "" &&
      cardFormData.creditCardHolderInfo.email !== "" &&
      cardFormData.creditCardHolderInfo.cpfCnpj !== "" &&
      cardFormData.creditCardHolderInfo.postalCode !== "" &&
      cardFormData.creditCardHolderInfo.addressNumber !== "" &&
      cardFormData.creditCardHolderInfo.phone !== "" &&
      isObjectEmpty(
        CreditCardHolderValidation(cardFormData.creditCardHolderInfo),
      )
    ) {
      return setStep(3);
    }
    handleCard();
  };

  const handleValidations = (type: any, value: any) => {
    let errorText;
    switch (type) {
      case "holderName":
        errorText =
          value === "" ? "Campo Obrigatório" : textWithSpacesOnly(value);
        setError({ ...error, holderNameError: errorText });
        break;
      case "number":
        errorText =
          value === ""
            ? "Campo Obrigatório"
            : stripeCardNumberValidation(value);
        setError({ ...error, numberError: errorText });
        break;
      case "expiryDate":
        errorText =
          value === "" ? "Campo Obrigatório" : stripeCardExpirValidation(value);
        setError({ ...error, expiryDateError: errorText });
        break;
      case "CCV":
        errorText = value === "" ? "Campo Obrigatório" : value.length < 3;
        setError({ ...error, CCVError: errorText });
        break;
      case "name":
        errorText =
          value === "" ? "Campo Obrigatório" : textWithSpacesOnly(value);
        setError({ ...error, nameError: errorText });
        break;
      case "email":
        errorText = value === "" ? "Campo Obrigatório" : "";
        setError({ ...error, emailError: errorText });
        break;
      case "cpfCnpj":
        errorText = value === "" ? "Campo Obrigatório" : minLength(11)(value);
        setError({ ...error, cpfCnpjError: errorText });
        break;
      case "postalCode":
        errorText = value === "" ? "Campo Obrigatório" : minLength(8)(value);
        setError({ ...error, postalCodeError: errorText });
        break;
      case "addressNumber":
        errorText = value === "" ? "Campo Obrigatório" : "";
        setError({ ...error, addressNumberError: errorText });
        break;
      case "phone":
        errorText = value === "" ? "Campo Obrigatório" : "";
        setError({ ...error, phoneError: errorText });
        break;
    }
  };

  const handleBlur = (e: any) => {
    handleValidations(e.target.name, e.target.value);
  };

  return (
    <div className="formContainer flex flex-col w-full gap-2 mt-8">
      {step === 1 ? (
        <div className="formDiv flex flex-col gap-2 md:flex-row justify-between flex-wrap">
          <div className="formGroup flex flex-col focus:outline-none mt-2 w-full">
            <label htmlFor="holderName">Nome</label>
            <input
              required
              className="border-[1px] rounded p-2 lg:w-1/2"
              type="text"
              id="holderName"
              name="holderName"
              placeholder="Digite o nome no cartão"
              value={cardFormData.creditCard.holderName}
              onChange={(e) =>
                setCardFormData({
                  ...cardFormData,
                  creditCard: {
                    ...cardFormData.creditCard,
                    holderName: e.target.value,
                  },
                })
              }
              autoFocus
              onBlur={handleBlur}
            />
            {error &&
              error.holderNameError &&
              error.holderNameError.length > 1 && (
                <p className="text-red-500">{error.holderNameError}</p>
              )}
          </div>
          <div className="formGroup flex flex-col focus:outline-none mt-2 w-full">
            <label htmlFor="number">Número do Cartão</label>
            <input
              required
              className="border-[1px] rounded p-2 lg:w-1/2"
              id="number"
              name="number"
              placeholder="Digite o número do cartão"
              value={cardFormData.creditCard.number}
              onChange={(e) =>
                setCardFormData({
                  ...cardFormData,
                  creditCard: {
                    ...cardFormData.creditCard,
                    number: maskCard(e.target.value),
                  },
                })
              }
              maxLength={19}
              onBlur={handleBlur}
            />
            {error && error.numberError && error.numberError.length > 1 && (
              <p className="text-red-500">{error.numberError}</p>
            )}
          </div>
          <div className="formGroup flex flex-col focus:outline-none mt-2 w-full">
            <label htmlFor="expiryDate">Validade</label>
            <input
              required
              className="border-[1px] rounded p-2 lg:w-1/2"
              id="expiryDate"
              name="expiryDate"
              placeholder="Digite a validade do cartão"
              value={cardFormData.creditCard.expiryDate}
              onChange={(e) =>
                setCardFormData({
                  ...cardFormData,
                  creditCard: {
                    ...cardFormData.creditCard,
                    expiryDate: maskExpiryDate(e.target.value),
                  },
                })
              }
              maxLength={5}
              onBlur={handleBlur}
            />
            {error &&
              error.expiryDateError &&
              error.expiryDateError.length > 1 && (
                <p className="text-red-500">{error.expiryDateError}</p>
              )}
          </div>
          <div className="formGroup flex flex-col focus:outline-none mt-2 w-full">
            <label htmlFor="CCV">CVC do Cartão</label>
            <input
              required
              className="border-[1px] rounded p-2 lg:w-1/2"
              id="CCV"
              name="CCV"
              placeholder="Digite o CVC do cartão"
              value={cardFormData.creditCard.ccv}
              onChange={(e) =>
                setCardFormData({
                  ...cardFormData,
                  creditCard: {
                    ...cardFormData.creditCard,
                    ccv: maskCVC(e.target.value),
                  },
                })
              }
              maxLength={3}
              onBlur={handleBlur}
            />
            {error && error.CCVError && error.CCVError.length > 1 && (
              <p className="text-red-500">{error.CCVError}</p>
            )}
          </div>
        </div>
      ) : step === 2 ? (
        <div className="formDiv flex flex-col gap-2 md:flex-row justify-between flex-wrap">
          <div className="formGroup flex flex-col focus:outline-none mt-2 w-full">
            <label htmlFor="name">Nome</label>
            <input
              required
              className="border-[1px] rounded p-2 lg:w-1/2"
              type="text"
              id="name"
              name="name"
              placeholder="Digite o seu nome"
              value={cardFormData.creditCardHolderInfo.name}
              onChange={(e) =>
                setCardFormData({
                  ...cardFormData,
                  creditCardHolderInfo: {
                    ...cardFormData.creditCardHolderInfo,
                    name: e.target.value,
                  },
                })
              }
              autoFocus
              onBlur={handleBlur}
            />
            {error && error.nameError && error.nameError.length > 1 && (
              <p className="text-red-500">{error.nameError}</p>
            )}
          </div>
          <div className="formGroup flex flex-col focus:outline-none mt-2 w-full">
            <label htmlFor="email">Email</label>
            <input
              required
              className="border-[1px] rounded p-2 lg:w-1/2"
              type="text"
              id="email"
              name="email"
              placeholder="Digite o seu email"
              value={cardFormData.creditCardHolderInfo.email}
              onChange={(e) =>
                setCardFormData({
                  ...cardFormData,
                  creditCardHolderInfo: {
                    ...cardFormData.creditCardHolderInfo,
                    email: e.target.value,
                  },
                })
              }
              onBlur={handleBlur}
            />
            {error && error.emailError && error.emailError.length > 1 && (
              <p className="text-red-500">{error.emailError}</p>
            )}
          </div>
          <div className="formGroup flex flex-col focus:outline-none mt-2 w-full">
            <label htmlFor="cpfCnpj">CPF/CNPJ</label>
            <input
              required
              className="border-[1px] rounded p-2 lg:w-1/2"
              id="cpfCnpj"
              name="cpfCnpj"
              placeholder="Digite o seu CPF ou CNPJ"
              value={cardFormData.creditCardHolderInfo.cpfCnpj}
              onChange={(e) =>
                setCardFormData({
                  ...cardFormData,
                  creditCardHolderInfo: {
                    ...cardFormData.creditCardHolderInfo,
                    cpfCnpj: maskCpfCnpj(e.target.value),
                  },
                })
              }
              maxLength={18}
              onBlur={handleBlur}
            />
            {error && error.cpfCnpjError && error.cpfCnpjError.length > 1 && (
              <p className="text-red-500">{error.cpfCnpjError}</p>
            )}
          </div>
          <div className="formGroup flex flex-col focus:outline-none mt-2 w-full">
            <label htmlFor="postalCode">CEP</label>
            <input
              required
              className="border-[1px] rounded p-2 lg:w-1/2"
              id="postalCode"
              name="postalCode"
              placeholder="Digite o CEP"
              value={cardFormData.creditCardHolderInfo.postalCode}
              onChange={(e) =>
                setCardFormData({
                  ...cardFormData,
                  creditCardHolderInfo: {
                    ...cardFormData.creditCardHolderInfo,
                    postalCode: maskCep(e.target.value),
                  },
                })
              }
              maxLength={9}
              onBlur={handleBlur}
            />
            {error &&
              error.postalCodeError &&
              error.postalCodeError.length > 1 && (
                <p className="text-red-500">{error.postalCodeError}</p>
              )}
          </div>
          <div className="formGroup flex flex-col focus:outline-none mt-2 w-full">
            <label htmlFor="addressNumber">Número</label>
            <input
              required
              className="border-[1px] rounded p-2 lg:w-1/2"
              id="addressNumber"
              name="addressNumber"
              placeholder="Digite o número"
              value={cardFormData.creditCardHolderInfo.addressNumber}
              onChange={(e) =>
                setCardFormData({
                  ...cardFormData,
                  creditCardHolderInfo: {
                    ...cardFormData.creditCardHolderInfo,
                    addressNumber: e.target.value,
                  },
                })
              }
              onBlur={handleBlur}
            />
            {error &&
              error.addressNumberError &&
              error.addressNumberError.length > 1 && (
                <p className="text-red-500">{error.addressNumberError}</p>
              )}
          </div>
          <div className="formGroup flex flex-col focus:outline-none mt-2 w-full">
            <label htmlFor="phone">Telefone</label>
            <input
              required
              className="border-[1px] rounded p-2 lg:w-1/2"
              id="phone"
              name="phone"
              placeholder="Digite o número do celular"
              value={cardFormData.creditCardHolderInfo.phone}
              onChange={(e) =>
                setCardFormData({
                  ...cardFormData,
                  creditCardHolderInfo: {
                    ...cardFormData.creditCardHolderInfo,
                    phone: maskPhone(e.target.value),
                  },
                })
              }
              maxLength={15}
              onBlur={handleBlur}
            />
            {error && error.phoneError && error.phoneError.length > 1 && (
              <p className="text-red-500">{error.phoneError}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="formDiv flex flex-col gap-2 md:flex-row justify-between flex-wrap">
          <button
            onClick={handleOpen}
            className="bg-darkBlueAxion text-white rounded p-2 w-full lg:w-1/2"
          >{`${installment.value} x R$ ${Number(
            Number(value) / installment.value,
          ).toFixed(2)}`}</button>
          <ActionSheet
            ref={ref}
            sheetStyle={{
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              background: Theme.color.darkBlueAxion,
              color: Theme.color.gray_10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
              padding: 20,
            }}
            bgStyle={{
              background: "rgba(1, 1, 1, 0.8)",
            }}
          >
            {installments.map((item: { value: any }) => (
              <div
                onClick={() => handleClose(item)}
                className="border-b border-b-white w-full rounded text-2xl mt-2 text-center transition duration-100 ease-in-out hover:bg-gray-10 hover:text-darkBlueAxion"
              >
                {`${item.value} x R$ ${Number(
                  Number(value) / item.value,
                ).toFixed(2)}`}
              </div>
            ))}
          </ActionSheet>
        </div>
      )}

      <div style={{ margin: "1rem auto 0" }}>
        <Image
          width={259}
          height={56}
          src={"/payment/compraSegura.png"}
          alt=""
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-2 my-4">
        {step !== 1 && (
          <button
            className={`text-darkBlueAxion border-[1px] border-darkBlueAxion p-2 rounded ${step === 1 && "hidden"} hover:bg-darkBlueAxion hover:text-white transition duration-200 ease-in`}
            onClick={() => setStep(step - 1)}
          >
            Voltar
          </button>
        )}
        <button
          className=" text-darkBlueAxion border-[1px] border-darkBlueAxion p-2 rounded w-full lg:w-1/3 text-xl font-bold hover:bg-darkBlueAxion hover:text-white transition duration-200 ease-in"
          onClick={() => handleClick()}
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" />
          ) : step !== 3 ? (
            "Prosseguir"
          ) : (
            "Finalizar Compra"
          )}
        </button>
      </div>
    </div>
  );
}
