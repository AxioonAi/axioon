import { useEffect, useState } from "react";
import {
  ArtSection,
  AxionLogo,
  Container,
  FormGroup,
  GoogleLogin,
  LoginButton,
  LoginForm,
  LoginFormHeader,
  Main,
  PasswordRecovery,
} from "./styles";
import Theme from "@/styles/themes";
import { Footer } from "@/components/register-account/Footer";
import { useRouter } from "next/router";
import { Messages } from "@/components/Global/Messages";
import { PostAPI, getAPI } from "@/lib/axios";
import { GlobalButton } from "@/components/Global/Button";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState("password");
  const [buttonLoading, setButtonLoading] = useState(false);
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
    const connect = await PostAPI("/login", {
      email: formData.email,
      password: formData.password,
    });
    console.log("connect: ", connect);
    if (connect.status !== 200) {
      alert(connect.body);
      return setButtonLoading(false);
    }
    router.push("/");
    return setButtonLoading(false);
  }

  return (
    <Container>
      <Main>
        <LoginForm>
          <AxionLogo>
            <img src="/axionLogo.png" alt="" />
          </AxionLogo>
          <LoginFormHeader>
            <strong>Faça seu login para utilizar a plataforma.</strong>
            <span>Acesse aqui todas as suas contas pelo painel principal.</span>
          </LoginFormHeader>
          <GoogleLogin>
            <img src="/Google.svg" alt="" />
            <strong>Entrar com conta Google</strong>
          </GoogleLogin>
          <div
            style={{
              position: "relative",
              margin: "5vh 0",
            }}
          >
            <div style={{ border: "1px solid lightgray" }} />
            <p
              style={{
                color: "lightgray",
                textAlign: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "0 2rem",
                backgroundColor: "white",
              }}
            >
              ou
            </p>
          </div>

          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup style={{ position: "relative" }}>
            <label htmlFor="password">Senha</label>
            <input
              type={showPassword}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <img src="/eye-slash.svg" alt="" onClick={toggleShowPassword} />
          </FormGroup>
          <PasswordRecovery>
            <button onClick={() => router.push("/recover-password")}>
              Esqueceu sua senha?
            </button>
          </PasswordRecovery>
          <GlobalButton
            background={Theme.color.darkBlueAxion}
            color="white"
            width="100%"
            height="5vh"
            content="Entrar"
            className="loginButton"
            onClick={handleLogin}
            loading={buttonLoading}
          />
          <p style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
            Não tem uma conta?{" "}
            <span
              style={{ color: Theme.color.brand_blue, cursor: "pointer" }}
              onClick={() => router.push("/register-account")}
            >
              Cadastre-se
            </span>
          </p>
        </LoginForm>
        <ArtSection>
          <Messages />
        </ArtSection>
      </Main>
      <Footer />
    </Container>
  );
}
