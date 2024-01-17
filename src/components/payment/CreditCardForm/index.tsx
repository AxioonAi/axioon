import { useRef, useState } from "react";
import {
  FinishPayment,
  FormContainer,
  FormDiv,
  FormGroup,
  RadioDiv,
  RadioGroup,
  RadioSelector,
} from "./styles";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  maskCVC,
  maskCard,
  maskCep,
  maskCpfCnpj,
  maskExpiryDate,
  maskPhone,
} from "@/utils/masks";
import ActionSheet from "actionsheet-react";
import Theme from "@/styles/themes";

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
}
export function CreditCardForm({
  cardFormData,
  setCardFormData,
  step,
  setStep,
  handleCard,
  value,
}: CreditCardFormProps) {
  const [person, setPerson] = useState("");
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

  const router = useRouter();

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
      cardFormData.creditCard.ccv !== ""
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
      cardFormData.creditCardHolderInfo.phone !== ""
    ) {
      return setStep(3);
    }
    handleCard();
  };

  return (
    <FormContainer>
      {step === 1 ? (
        <FormDiv className="flex flex-wrap">
          <FormGroup className="mt-3">
            <label htmlFor="holderName">Nome</label>
            <input
              type="text"
              id="holderName"
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
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <label htmlFor="number">Número do Cartão</label>
            <input
              id="number"
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
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <label htmlFor="expiryDate">Validade</label>
            <input
              id="expiryDate"
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
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <label htmlFor="CCV">CVC do Cartão</label>
            <input
              id="CCV"
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
            />
          </FormGroup>
        </FormDiv>
      ) : step === 2 ? (
        <FormDiv className="flex flex-wrap">
          <FormGroup className="mt-3">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
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
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
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
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <label htmlFor="cpfCnpj">CPF/CNPJ</label>
            <input
              id="cpfCnpj"
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
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <label htmlFor="postalCode">CEP</label>
            <input
              id="postalCode"
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
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <label htmlFor="addressNumber">Número</label>
            <input
              id="addressNumber"
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
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <label htmlFor="phone">Telefone</label>
            <input
              id="phone"
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
            />
          </FormGroup>
        </FormDiv>
      ) : (
        // <Select
        //   name="state"
        //   options={installments}
        //   placeholder={`${installments[0].label}`}
        //   className="self-center"
        //   menuPlacement="auto"
        //   styles={{
        //     control: (base) => ({
        //       ...base,
        //       height: 53,
        //       width: 220,
        //     }),
        //     indicatorSeparator: (base) => ({
        //       ...base,
        //       display: "none",
        //     }),
        //     input: (base) => ({
        //       ...base,
        //       height: 53,
        //       width: 220,
        //     }),
        //   }}
        // />
        <>
          <button onClick={handleOpen}>{`${installment.value} x R$ ${Number(
            Number(value.toLocaleString("pt-BR")) / installment.value
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
                className="border-b border-b-white w-full text-2xl mt-2 text-center transition duration-100 ease-in-out hover:bg-gray-10 hover:text-darkBlueAxion"
              >
                {`${item.value} x R$ ${Number(
                  Number(value.toLocaleString("pt-BR")) / item.value
                ).toFixed(2)}`}
              </div>
            ))}
          </ActionSheet>
        </>
      )}

      <div style={{ margin: "1rem auto 0" }}>
        <Image
          width={259}
          height={56}
          src={"/payment/compraSegura.png"}
          alt=""
        />
      </div>

      <FinishPayment>
        {step !== 1 && (
          <button onClick={() => setStep(step - 1)}>Voltar</button>
        )}
        <button onClick={handleClick}>
          {step !== 3 ? "Prosseguir" : "Finalizar Compra"}
        </button>
      </FinishPayment>
    </FormContainer>
  );
}
