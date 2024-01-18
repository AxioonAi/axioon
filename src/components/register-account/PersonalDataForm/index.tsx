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
    <div>
      <div className="registerFormHeader flex flex-col items-center mb-8">
        <strong className="text-2xl">Dados Pessoais</strong>
        <span className="text-sm text-gray-80">
          Preencha os campos logo abaixo
        </span>
      </div>

      <div className="formGroup flex flex-col mb-4">
        <label className="text-sm font-bold" htmlFor="social_name">
          Nome Social
        </label>
        <input
          className="p-2 border border-gray-40 rounded transition duration-300"
          type="text"
          id="social_name"
          placeholder="Digite seu Nome Social"
          value={formData.social_name}
          onChange={(e) =>
            setFormData({ ...formData, social_name: e.target.value })
          }
        />
      </div>

      <div className="formGroup flex flex-col mb-4">
        <label className="text-sm font-bold" htmlFor="cpf">
          Seu CPF
        </label>
        <input
          className="p-2 border border-gray-40 rounded transition duration-300"
          type="text"
          id="cpf"
          placeholder="Digite seu CPF"
          maxLength={14}
          value={formData.cpfCnpj}
          onChange={(e) =>
            setFormData({ ...formData, cpfCnpj: maskCpfCnpj(e.target.value) })
          }
        />
      </div>
      <div className="formGroup flex flex-col mb-4">
        <label className="text-sm font-bold" htmlFor="bithDate">
          Data de Nascimento
        </label>
        <input
          className="p-2 border border-gray-40 rounded transition duration-300"
          type="date"
          placeholder="Sua Data de Nascimento"
          value={formData.birth_date}
          onChange={(e) =>
            setFormData({ ...formData, birth_date: e.target.value })
          }
        />
      </div>
      <label htmlFor="sex" className="text-sm font-bold mb-4">
        Sexo
      </label>
      <div className="radioContainer flex gap-5">
        <div className="radioGroup flex gap-2 items-center">
          <label
            className="radioSelector flex items-center justify-center w-6 h-6 border border-gray-60 rounded-full"
            htmlFor="MALE"
          >
            <div
              className={`transition duration-300 w-5 h-5 rounded-full ${formData.sex === "MALE" ? "bg-gray-60" : "bg-transparent"}`}
            />
          </label>
          <input
            className="hidden"
            type="radio"
            name="sex"
            id="MALE"
            value="MALE"
            checked={formData.sex === "MALE"}
            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
          />
          <label htmlFor="MALE">Masculino</label>
        </div>

        <div className="radioGroup flex gap-2 items-center">
          <label
            className="radioSelector flex items-center justify-center w-6 h-6 border border-gray-60 rounded-full"
            htmlFor="FEMALE"
          >
            <div
              className={`transition duration-300 w-5 h-5 rounded-full ${formData.sex === "FEMALE" ? "bg-gray-60" : "bg-transparent"}`}
            />
          </label>
          <input
            className="hidden"
            type="radio"
            name="sex"
            id="FEMALE"
            value="FEMALE"
            checked={formData.sex === "FEMALE"}
            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
          />
          <label htmlFor="FEMALE">Feminino</label>
        </div>
      </div>
    </div>
  );
}
