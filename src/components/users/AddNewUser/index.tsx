import { CloseButton } from "@/components/Global/Close";
import { Modal } from "react-bootstrap";
import { Content, EmailInputContainer, SuccessModal } from "./styles";
import { GlobalButton } from "@/components/Global/Button";
import { useEffect, useState } from "react";
import Theme from "@/styles/themes";

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

export function AddNewUserModal({ show, onHide }: ModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  function handleClose() {
    setShowSuccess(false);
    onHide();
  }

  function handleSendInvite() {
    setShowSuccess(true);
    setIsVisible(false);
  }

  useEffect(() => {
    setIsVisible(true);
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        {show && (
          <Content isVisible={isVisible}>
            <CloseButton onHide={onHide} />
            <img src="/users/user.svg" alt="" />
            <h2>Adicionar um novo usuário</h2>
            <span>
              Digite o email do novo usuário e defina a permissão dele
            </span>

            <EmailInputContainer>
              <label htmlFor="email">Digite o email</label>
              <input type="email" id="email" />
              <select name="permission" id="permission">
                <option value="view" selected>
                  Visualizador
                </option>
              </select>
            </EmailInputContainer>

            <GlobalButton
              background={Theme.color.darkBlueAxion}
              content="Enviar Convite"
              color={Theme.color.gray_10}
              className="button1"
              onClick={handleSendInvite}
            />

            <p className="users-count">
              <span>
                Você pode convidar <strong>+10 Usuários</strong>
              </span>
            </p>
          </Content>
        )}
      </Modal>

      <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
        <CloseButton onHide={handleClose} />
        <SuccessModal>
          <img src="/verify.svg" alt="" />
          <h2>Senha Alterada!</h2>
          <span>Sua senha foi alterada com sucesso, parabéns!</span>
          <GlobalButton
            background={Theme.color.darkBlueAxion}
            color={Theme.color.gray_10}
            content="Finalizar"
            className="button"
            onClick={handleClose}
          />
        </SuccessModal>
      </Modal>
    </>
  );
}
