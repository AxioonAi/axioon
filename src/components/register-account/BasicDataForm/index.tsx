import { maskPhone } from "@/utils/masks";

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
    <div>
      <div className="registerFormHeader flex flex-col items-center mb-8">
        <strong className="text-2xl">Dados Básicos</strong>
        <span className="text-sm text-gray-80">
          Preencha os campos logo abaixo
        </span>
      </div>

      <div className="formGroup flex flex-col mb-4">
        <label className="text-sm font-bold" htmlFor="name">
          Nome Completo
        </label>
        <input
          className="p-2 border border-gray-40 rounded transition duration-300"
          type="text"
          id="name"
          placeholder="Seu nome"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="formGroup flex flex-col mb-4">
        <label className="text-sm font-bold" htmlFor="email">
          Email
        </label>
        <input
          className="p-2 border border-gray-40 rounded transition duration-300"
          type="email"
          placeholder="Digite seu email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="formGroup flex flex-col mb-4">
        <label className="text-sm font-bold" htmlFor="phoneNumber">
          Telefone
        </label>
        <input
          className="p-2 border border-gray-40 rounded transition duration-300"
          type="text"
          id="phoneNumber"
          maxLength={14}
          value={formData.mobilePhone}
          placeholder="Digite seu telefone"
          onChange={(e) =>
            setFormData({ ...formData, mobilePhone: maskPhone(e.target.value) })
          }
        />
      </div>
      <div className="formGroup flex flex-col mb-4">
        <label className="text-sm font-bold" htmlFor="password">
          Crie uma senha
        </label>
        <input
          className="p-2 border border-gray-40 rounded transition duration-300"
          type="password"
          placeholder="Crie uma senha segura"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>

      <div className="termsContainer flex gap-1 items-center text-sm">
        <input
          type="checkbox"
          id="terms"
          checked={terms}
          onChange={() => setTerms(!terms)}
        />
        <label htmlFor="terms">
          Ao informar meus dados, tenho ciência dos{" "}
          <span className="text-darkBlueAxion cursor-pointer transition duration-300 hover:text-purpleAxion">
            Termos de Uso
          </span>{" "}
          e da{" "}
          <span className="text-darkBlueAxion cursor-pointer transition duration-300 hover:text-purpleAxion">
            Política de Privacidade
          </span>
          .
        </label>
      </div>
    </div>
  );
}
