import { GlobalButton } from "@/components/Global/Button";
import { CloseButton } from "@/components/Global/Close";
import Theme from "@/styles/themes";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Content, Form, FormGroup, FormHeader, SuccessModal } from "./styles";

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

export function NewUserModal({ show, onHide }: ModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, [show]);

  function handleUpdatePassword() {
    setShowSuccess(true);
    // setShowError(true);
    setIsVisible(false);
  }

  function handleClose() {
    setShowSuccess(false);
    setShowError(false);
    onHide();
  }

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        {show && (
          <Content isVisible={isVisible}>
            <CloseButton onHide={onHide} />
            <FormHeader>
              <div>
                <img src="/axionLogo.png" alt="" />
              </div>
              <h1>Cadastrar novo Usuário</h1>
              <span>Preencha os campos abaixo</span>
            </FormHeader>
            <Form>
              <FormGroup>
                <label htmlFor="current-password">Email do novo usuário</label>
                <input type="password" placeholder="******************" />
              </FormGroup>
              <div
                style={{
                  borderTop: "1px solid" + Theme.color.gray_20,
                  marginTop: "1rem",
                }}
              />
              <FormGroup>
                <label htmlFor="new-password">Senha do novo usuário</label>
                <input type="password" placeholder="******************" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="confirm-password">Repetir Senha</label>
                <input type="password" placeholder="******************" />
              </FormGroup>
              <GlobalButton
                background={Theme.color.darkBlueAxion}
                color={Theme.color.gray_10}
                width="auto"
                height="auto"
                content="Cadastrar Novo Usuário"
                onClick={handleUpdatePassword}
                className="rounded mb-4 py-2"
              />
            </Form>
          </Content>
        )}
      </Modal>

      <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
        <CloseButton onHide={handleClose} />
        <SuccessModal>
          <img src="/verify.svg" alt="" />
          <h2>Cadastrado!</h2>
          <span>Seu acesso foi adicionado com sucesso, parabéns!</span>
          <GlobalButton
            background={Theme.color.darkBlueAxion}
            color={Theme.color.gray_10}
            content="Finalizar"
            onClick={handleClose}
            className="my-5 rounded w-1/5"
          />
        </SuccessModal>
      </Modal>
      <Modal show={showError} onHide={() => setShowError(false)}>
        <CloseButton onHide={handleClose} />
        <SuccessModal>
          <img src="/Denied.svg" alt="" />
          <h2>Você chegou no Limite de Cadastros!</h2>
          <span>
            Você não pode cadastrar mais Usuário neste plano, porém pode alterar
            seu plano para poder inserir mais um cadastro.
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <GlobalButton
              background={Theme.color.gray_10}
              color={Theme.color.darkBlueAxion}
              content="Voltar"
              onClick={handleClose}
              fontSize={10}
              className="my-5 rounded w-2/5"
            />
            <GlobalButton
              background={Theme.color.darkBlueAxion}
              color={Theme.color.gray_10}
              content="Mais um Cadastro"
              onClick={handleClose}
              fontSize={10}
              className="my-5 rounded w-2/5"
            />
          </div>
        </SuccessModal>
      </Modal>
    </>
  );
}
