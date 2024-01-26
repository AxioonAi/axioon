import { useState } from "react";
import {
  ArtSection,
  AxionLogo,
  Container,
  FormGroup,
  LoginForm,
  LoginFormHeader,
  Main,
  PasswordRecovery,
} from "./styles";
import Theme from "@/styles/themes";
import { Footer } from "@/components/register-account/Footer";
import { useRouter } from "next/router";
import { Messages } from "@/components/Global/Messages";
import { PostAPI, getAPI, refreshToken, token, user_type } from "@/lib/axios";
import { GlobalButton } from "@/components/Global/Button";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState("password");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function toggleShowPassword() {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  }

  async function handleLogin() {
    setButtonLoading(true);
    const connect = await PostAPI(checked ? "/sub-user/login" : "/login", {
      email: formData.email,
      password: formData.password,
    });
    if (connect.status !== 200) {
      alert(connect.body);
      return setButtonLoading(false);
    }
    localStorage.setItem(token, connect.body.token);
    localStorage.setItem(refreshToken, connect.body.refreshToken);
    localStorage.setItem(user_type, connect.body.type);
    router.push("/");
    return setButtonLoading(false);
  }

  return (
    <div className="Container min-h-screen relative pb-16">
      <div className="Main w-full flex flex-col justify-around items-center mb-24 md:mb-0 lg:flex-row">
        <div className="LoginForm py-0 px-16 lg:w-1/2">
          <div className="AxionLogo flex justify-center p-5">
            <img className=" w-48 lg:w-auto" src="/axionLogo.png" alt="" />
          </div>
          <div className="LoginFormHeader flex flex-col ">
            <strong className="text-2xl">
              Faça seu login para utilizar a plataforma.
            </strong>
            <span className="text-sm">
              Acesse aqui todas as suas contas pelo painel principal.
            </span>
          </div>
          <div className="LoginTypeSelector flex flex-col lg:flex-row w-full h-20 gap-2 my-4 justify-between">
            <label
              htmlFor="loginType1"
              className={`Selector1 flex w-full lg:w-2/5 items-center justify-start gap-2 p-3 lg:px-2 border-2 rounded cursor-pointer ${
                checked ? "  " : "border-[#323452]"
              } ${checked ? "" : "bg-primary/10"}`}
            >
              <input
                type="radio"
                id="loginType1"
                name="loginType"
                defaultChecked
                onChange={() => setChecked(!checked)}
              />
              <span>Administrador</span>
            </label>
            <label
              htmlFor="loginType2"
              className={`Selector1 flex w-full lg:w-2/5 items-center justify-start gap-2 p-3 lg:px-2 border-2 rounded cursor-pointer ${
                checked ? "border-[#323452]" : ""
              } ${checked ? "bg-primary/10" : ""}`}
            >
              <input
                type="radio"
                id="loginType2"
                name="loginType"
                onChange={() => setChecked(!checked)}
              />
              <span>Convidado</span>
            </label>
          </div>
          <div className="relative mt-20 mb-8 lg:mt-8">
            <div className="border border-gray-300" />

            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 bg-white text-gray-400">
              ou
            </p>
          </div>

          <div className="relative flex flex-col mb-3">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg transition duration-200 "
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="relative flex flex-col mb-3">
            <label className="text-sm" htmlFor="password">
              Senha
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg transition duration-200 "
              type={showPassword}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {showPassword === "password" ? (
              <img
                className="absolute right-4 bottom-2.5 cursor-pointer"
                src="/eye.svg"
                alt=""
                onClick={toggleShowPassword}
              />
            ) : (
              <img
                className="absolute right-4 bottom-2.5 cursor-pointer"
                src="/eye-slash.svg"
                alt=""
                onClick={toggleShowPassword}
              />
            )}
          </div>
          <div className="flex justify-end">
            <button
              className=" border-0 text-brand_blue bg-transparent "
              onClick={() => router.push("/recover-password")}
            >
              Esqueceu sua senha?
            </button>
          </div>
          <GlobalButton
            background={Theme.color.darkBlueAxion}
            color="white"
            width="100%"
            height="auto"
            content="Entrar"
            className="loginButton"
            fontSize={15}
            onClick={handleLogin}
            loading={buttonLoading}
          />
          <p className="text-sm font-bold">
            Não tem uma conta?{" "}
            <span
              className=" text-brand_blue cursor-pointer"
              onClick={() => router.push("/register-account")}
            >
              Cadastre-se
            </span>
          </p>
        </div>
        <div
          className="ArtSection relative self-start min-h-screen h-full w-full bg-cover bg-no-repeat bg-top-center lg:w-1/2"
          style={{ backgroundImage: 'url("/foto.png")' }}
        >
          <Messages />
        </div>
      </div>
      <Footer />
    </div>
  );
}
