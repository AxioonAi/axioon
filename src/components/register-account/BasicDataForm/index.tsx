import { maskPhone } from "@/utils/masks";
import {
  FormGroup,
  RegisterForm,
  RegisterFormHeader,
  TermsContainer,
} from "./styles";
import { useState } from "react";

interface FormDataProps {
  formData: {
    name: string;
    email: string;
    mobilePhone: string;
    password: string;
  };
  setFormData: any;
  terms: boolean;
  setTerms: any;
}

export function BasicDataForm({
  formData,
  setFormData,
  terms,
  setTerms,
}: FormDataProps) {
  return (
    <RegisterForm>
      <RegisterFormHeader>
        <strong>Dados Básicos</strong>
        <span>Preencha os campos logo abaixo</span>
      </RegisterFormHeader>

      <FormGroup>
        <label htmlFor="name">Nome Completo</label>
        <input
          type="text"
          id="name"
          placeholder="Seu nome"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Digite seu email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="phoneNumber">Telefone</label>
        <input
          type="text"
          id="phoneNumber"
          maxLength={14}
          value={formData.mobilePhone}
          placeholder="Digite seu telefone"
          onChange={(e) =>
            setFormData({ ...formData, mobilePhone: maskPhone(e.target.value) })
          }
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Crie uma senha</label>
        <input
          type="password"
          placeholder="Crie uma senha segura"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </FormGroup>

      <TermsContainer>
        <input
          type="checkbox"
          id="terms"
          checked={terms}
          onChange={() => setTerms(!terms)}
        />
        <label htmlFor="terms">
          Ao informar meus dados, tenho ciência dos <span>Termos de Uso</span> e
          da <span>Política de Privacidade</span>.
        </label>
      </TermsContainer>
    </RegisterForm>
  );
}
