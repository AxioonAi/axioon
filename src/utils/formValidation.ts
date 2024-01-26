import {
  stripeCardExpirValidation,
  stripeCardNumberValidation,
} from "./creditCardValidation";

export const isObjectEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export const CreditCardValidation = (form: any) => {
  let error = {};
  if (form.holderName === "") {
    error = { ...error, holderNameError: "Campo Obrigatório" };
  }
  if (form.number === "") {
    error = { ...error, numberError: "Campo Obrigatório" };
  }
  if (stripeCardNumberValidation(form.number) !== "") {
    error = {
      ...error,
      numberError: stripeCardNumberValidation(form.number),
    };
  }
  if (form.expiryDate === "") {
    error = { ...error, expiryDateError: "Campo Obrigatório" };
  }
  if (stripeCardExpirValidation(form.expiryDate)) {
    error = {
      ...error,
      expiryDateError: stripeCardExpirValidation(form.expiryDate),
    };
  }
  if (form.ccv === "" || form.ccv.length < 3) {
    error = { ...error, ccvError: "Campo Obrigatório" };
  }
  return error;
};

export const CreditCardHolderValidation = (form: any) => {
  let error = {};
  if (form.name === "") {
    error = { ...error, nameError: "Campo Obrigatório" };
  }
  if (form.email === "") {
    error = { ...error, emailError: "Campo Obrigatório" };
  }
  if (form.cpfCnpj === "") {
    error = { ...error, cpfCnpjError: "Campo Obrigatório" };
  }
  if (form.postalCode === "") {
    error = { ...error, postalCodeError: "Campo Obrigatório" };
  }
  if (form.addressNumber === "") {
    error = { ...error, addressNumberError: "Campo Obrigatório" };
  }
  if (form.phone === "") {
    error = { ...error, phoneError: "Campo Obrigatório" };
  }
  return error;
};
