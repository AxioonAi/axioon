import { GlobalButton } from "@/components/Global/Button";
import { CloseButton } from "@/components/Global/Close";
import Theme from "@/styles/themes";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Content, Form, FormGroup, FormHeader, SuccessModal } from "./styles";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<ModalProps["formData"]>>;
  changePassword: () => void;
  loadingButton: boolean;
}

export function NewPasswordModal({
  show,
  onHide,
  formData,
  setFormData,
  changePassword,
  loadingButton,
}: ModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, [show]);

  async function handleUpdatePassword() {
    await changePassword();
  }

  function handleClose() {
    setShowSuccess(false);
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
                <img src="/profile/security-safe.svg" alt="" />
              </div>
              <h1>Atualizar Senha</h1>
              <span>Preencha os campos abaixo para atualizar sua senha.</span>
            </FormHeader>
            <Form>
              <FormGroup>
                <label htmlFor="current-password">Senha Atual</label>
                <input
                  type="password"
                  placeholder="Digite sua senha atual"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <div
                style={{
                  borderTop: "1px solid" + Theme.color.gray_20,
                  marginTop: "1rem",
                }}
              />
              <FormGroup>
                <label htmlFor="new-password">Nova Senha</label>
                <input
                  type="password"
                  placeholder="Digite sua nova senha"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="confirm-password">Repetir Senha</label>
                <input
                  type="password"
                  placeholder="Confirme sua nova senha"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <GlobalButton
                content="Atualizar Senha"
                background={Theme.color.darkBlueAxion}
                color={Theme.color.gray_10}
                width="auto"
                height="auto"
                fontSize={12}
                className="mb-5 p-2 rounded"
                onClick={handleUpdatePassword}
              />
            </Form>
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
            content="Finalizar"
            className="button"
            onClick={handleClose}
            loading={loadingButton}
            background={Theme.color.darkBlueAxion}
            color={Theme.color.gray_10}
            width="auto"
            height="auto"
          />
        </SuccessModal>
      </Modal>
    </>
  );
}
