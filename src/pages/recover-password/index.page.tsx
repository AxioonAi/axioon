import { Footer } from "@/components/register-account/Footer";
import Theme from "@/styles/themes";
import {
  ArtSection,
  AxionLogo,
  Container,
  FormGroup,
  Guide,
  IframeContainer,
  LoginForm,
  LoginFormHeader,
  Main,
  RecoveryButton,
} from "./styles";
import { useRouter } from "next/router";
import { Messages } from "@/components/Global/Messages";
import { PostAPI, PutAPI } from "@/lib/axios";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

export default function RecoverPassword() {
  const router = useRouter();
  const [forgotPassword, setForgotPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  async function recoverPassword() {
    setLoading(true);
    const connect = await PostAPI("/user/recover-password/code", {
      email: forgotPassword,
    });
    console.log("connect: ", connect);
    if (connect.status !== 200) {
      alert(connect.body);
      return setLoading(false);
    }
    setStep(true);
    return setLoading(false);
  }

  async function redefinePassword() {
    setLoading(true);
    const connect = await PutAPI("/user/recover-password", {
      code: code,
      password: password,
    });
    if (connect.status !== 200) {
      alert(connect.body);
      return setLoading(false);
    }
    router.push("/login");
    return setLoading(false);
  }

  return (
    <Container>
      <Main>
        <LoginForm>
          <AxionLogo>
            <img src="/axionLogo.png" alt="" />
          </AxionLogo>
          {!step ? (
            <>
              <LoginFormHeader>
                <strong>Esqueceu sua senha?</strong>
                <span>Digite seu email e receba um novo acesso por email.</span>
              </LoginFormHeader>

              <FormGroup>
                <label htmlFor="email">Digite o e-mail cadastrado</label>
                <input
                  type="email"
                  value={forgotPassword}
                  onChange={(e) => setForgotPassword(e.target.value)}
                />
              </FormGroup>

              <RecoveryButton onClick={recoverPassword} disabled={loading}>
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Enviar Código"
                )}
              </RecoveryButton>
            </>
          ) : (
            <>
              <LoginFormHeader>
                <strong>Insira o código de recuperação</strong>
                <span>Digite o código enviado no seu e-mail.</span>
              </LoginFormHeader>

              <FormGroup>
                <label htmlFor="code">Digite o código recebido</label>
                <input
                  type="text"
                  autoFocus
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="password">Digite sua nova senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <RecoveryButton onClick={redefinePassword}>
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Alterar Senha"
                )}
              </RecoveryButton>
            </>
          )}

          <p style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
            Lembrou a senha?{" "}
            <span
              onClick={() => {
                router.push("/login");
              }}
              style={{
                textDecoration: "none",
                color: Theme.color.brand_blue,
                cursor: "pointer",
              }}
            >
              Faça o login agora.
            </span>
          </p>

          <Guide>
            <strong>Veja o passo a passo:</strong>
            <span>
              O vídeo abaixo vai te ajudar a resolver em poucos minutos.
            </span>
          </Guide>

          <IframeContainer>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/LXb3EKWsInQ?si=aD2Nlsj93iw4cQgB"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </IframeContainer>
        </LoginForm>
        <ArtSection>
          <div>
            <Messages />
          </div>
        </ArtSection>
      </Main>
      <Footer />
    </Container>
  );
}
