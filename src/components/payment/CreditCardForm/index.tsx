import { useState } from "react";
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

export function CreditCardForm() {
  const [person, setPerson] = useState("");
  const router = useRouter();

  const handleRadioChange = (event: { target: { value: string } }) => {
    setPerson(event.target.value);
  };
  return (
    <FormContainer>
      <FormDiv>
        <FormGroup>
          <label htmlFor="validity">Validade</label>
          <input
            type="text"
            id="validity"
            placeholder="Digite a validade do cartão"
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="cvc">CVV do Cartão</label>
          <input type="text" id="cvc" placeholder="Digite o CVV do cartão" />
        </FormGroup>
      </FormDiv>
      <RadioDiv>
        <RadioGroup>
          <RadioSelector
            htmlFor="juridicalPerson"
            checked={person === "juridicalPerson"}
          >
            <div />
          </RadioSelector>
          <input
            type="radio"
            name="personType"
            id="juridicalPerson"
            value="juridicalPerson"
            checked={person === "juridicalPerson"}
            onChange={handleRadioChange}
          />
          <label htmlFor="juridicalPerson">Pessoa Jurídica</label>
        </RadioGroup>
        <RadioGroup>
          <RadioSelector
            htmlFor="fisicalPerson"
            checked={person === "fisicalPerson"}
          >
            <div />
          </RadioSelector>
          <input
            type="radio"
            name="personType"
            id="fisicalPerson"
            value="fisicalPerson"
            checked={person === "fisicalPerson"}
            onChange={handleRadioChange}
          />
          <label htmlFor="fisicalPerson">Pessoa Física</label>
        </RadioGroup>
      </RadioDiv>
      <FormDiv>
        <FormGroup>
          <label htmlFor="city">Cidade</label>
          <input type="text" id="city" placeholder="Digite sua cidade" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="cep">CEP</label>
          <input type="text" id="cep" placeholder="Digite seu CEP" />
        </FormGroup>
      </FormDiv>
      <FormDiv>
        <FormGroup>
          <label htmlFor="address">Endereço</label>
          <input type="text" id="address" placeholder="Digite seu endereço" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="number">Número</label>
          <input type="text" id="number" placeholder="Digite seu número" />
        </FormGroup>
      </FormDiv>

      <div style={{ margin: "1rem auto 0" }}>
        <Image
          width={259}
          height={56}
          src={"/payment/compraSegura.png"}
          alt=""
        />
      </div>

      <FinishPayment>
        <button onClick={() => router.push("/finish-payment")}>Finalizar Pagamento</button>
      </FinishPayment>
    </FormContainer>
  );
}
