import { useState } from "react";
import {
  BackButton,
  FormGroup,
  NextButton,
  RadioContainer,
  RadioGroup,
  RadioSelector,
  RegisterForm,
  RegisterFormHeader,
} from "./styles";
import { maskCpfCnpj } from "@/utils/masks";

interface FormDataProps {
  formData: {
    social_name: string;
    cpfCnpj: string;
    birth_date: string;
    sex: string;
  };
  setFormData: any;
}

export function PersonalDataForm({ formData, setFormData }: FormDataProps) {
  return (
    <RegisterForm>
      <RegisterFormHeader>
        <strong>Dados Pessoais</strong>
        <span>Preencha os campos logo abaixo</span>
      </RegisterFormHeader>

      <FormGroup>
        <label htmlFor="social_name">Nome Social</label>
        <input
          type="text"
          id="social_name"
          placeholder="Digite seu Nome Social"
          value={formData.social_name}
          onChange={(e) =>
            setFormData({ ...formData, social_name: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="cpf">Seu CPF</label>
        <input
          type="text"
          id="cpf"
          placeholder="Digite seu CPF"
          maxLength={14}
          value={formData.cpfCnpj}
          onChange={(e) =>
            setFormData({ ...formData, cpfCnpj: maskCpfCnpj(e.target.value) })
          }
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="bithDate">Data de Nascimento</label>
        <input
          type="date"
          placeholder="Sua Data de Nascimento"
          value={formData.birth_date}
          onChange={(e) =>
            setFormData({ ...formData, birth_date: e.target.value })
          }
        />
      </FormGroup>
      <label htmlFor="sex" style={{ fontWeight: "bold", marginBottom: "1rem" }}>
        Sexo
      </label>
      <RadioContainer>
        <RadioGroup>
          <RadioSelector htmlFor="MALE" checked={formData.sex === "MALE"}>
            <div />
          </RadioSelector>
          <input
            type="radio"
            name="sex"
            id="MALE"
            value="MALE"
            checked={formData.sex === "MALE"}
            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
          />
          <label htmlFor="MALE">Masculino</label>
        </RadioGroup>

        <RadioGroup>
          <RadioSelector htmlFor="FEMALE" checked={formData.sex === "FEMALE"}>
            <div />
          </RadioSelector>
          <input
            type="radio"
            name="sex"
            id="FEMALE"
            value="FEMALE"
            checked={formData.sex === "FEMALE"}
            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
          />
          <label htmlFor="FEMALE">Feminino</label>
        </RadioGroup>
      </RadioContainer>
    </RegisterForm>
  );
}
