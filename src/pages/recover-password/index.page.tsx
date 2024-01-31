import { Messages } from "@/components/Global/Messages";
import { Footer } from "@/components/register-account/Footer";
import { PostAPI, PutAPI } from "@/lib/axios";
import { useRouter } from "next/router";
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
    <div className="Container min-h-screen relative pb-16">
      <main className="Main w-full flex flex-col lg:flex-row mb-0 md:mb-24 justify-around items-center">
        <div className="LoginForm w-[calc(100%-3vw)] lg:w-[50vw] px-8">
          <div className="Logo flex justify-center p-5">
            <img className="w-48 lg:w-auto" src="/axionLogo.png" alt="" />
          </div>
          {!step ? (
            <>
              <div className="flex flex-col">
                <strong className="text-xl">Esqueceu sua senha?</strong>
                <span className="text-sm">
                  Digite seu email e receba um novo acesso por email.
                </span>
              </div>

              <div className="FormGroup flex flex-col my-4">
                <label className="font-semibold text-gray-80" htmlFor="email">
                  Digite o e-mail cadastrado
                </label>
                <input
                  className="p-2 border-[1px] rounded transition duration-300"
                  type="email"
                  value={forgotPassword}
                  onChange={(e) => setForgotPassword(e.target.value)}
                />
              </div>

              <button
                className="RecoveryButton w-full p-3 rounded my-3 border-0 bg-darkBlueAxion text-white font-bold"
                onClick={recoverPassword}
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Enviar Código"
                )}
              </button>
            </>
          ) : (
            <>
              <div className="LoginFormHeader flex flex-col">
                <strong className="text-xl">
                  Insira o código de recuperação
                </strong>
                <span className="text-sm">
                  Digite o código enviado no seu e-mail.
                </span>
              </div>

              <div className="FormGroup flex flex-col my-4">
                <label className="font-semibold text-gray-80" htmlFor="code">
                  Digite o código recebido
                </label>
                <input
                  className="p-2 border-[1px] rounded transition duration-300"
                  type="text"
                  autoFocus
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="FormGroup flex flex-col my-4">
                <label
                  className="font-semibold text-gray-80"
                  htmlFor="password"
                >
                  Digite sua nova senha
                </label>
                <input
                  className="p-2 border-[1px] rounded transition duration-300"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="RecoveryButton w-full p-3 rounded my-3 border-0 bg-darkBlueAxion text-white font-bold"
                onClick={redefinePassword}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Alterar Senha"
                )}
              </button>
            </>
          )}

          <p className="text-sm font-bold">
            Lembrou a senha?{" "}
            <span
              onClick={() => {
                router.push("/login");
              }}
              className="no-underline text-darkBlueAxion cursor-pointer"
            >
              Faça o login agora.
            </span>
          </p>

          <div className="LoginFormHeader flex flex-col">
            <strong className="text-xl">Veja o passo a passo:</strong>
            <span className="text-sm">
              O vídeo abaixo vai te ajudar a resolver em poucos minutos.
            </span>
          </div>

          <div className="IframeContainer relative w-full pb-[56.25%] h-0 mb-4">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/LXb3EKWsInQ?si=aD2Nlsj93iw4cQgB"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        <div
          className="ArtSection relative self-start min-h-screen h-full w-full bg-cover bg-no-repeat bg-top-center lg:w-1/2"
          style={{ backgroundImage: 'url("/foto.png")' }}
        >
          <Messages />
        </div>
      </main>
      <Footer />
    </div>
  );
}
