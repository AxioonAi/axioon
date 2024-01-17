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
          <main className="m-auto">
            <CloseButton onHide={onHide} />
            <div className="formHeader mb-8">
              <div className="flex justify-center mt-14 mb-6">
                <img src="/profile/security-safe.svg" alt="" />
              </div>
              <h1 className="text-2xl text-bold text-center">
                Atualizar Senha
              </h1>
              <span className="text-sm text-center text-gray-80">
                Preencha os campos abaixo para atualizar sua senha.
              </span>
            </div>
            <div className="Form flex flex-col gap-6">
              <div className="formGroup flex flex-col gap-2">
                <label htmlFor="current-password" className="font-semibold">
                  Senha Atual
                </label>
                <input
                  className="py-4 px-2 rounded border border-gray-20 outline-none text-gray-100"
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
              </div>
              <div
                style={{
                  borderTop: "1px solid" + Theme.color.gray_20,
                  marginTop: "1rem",
                }}
              />
              <div className="formGroup flex flex-col gap-2">
                <label className="font-semibold" htmlFor="new-password">
                  Nova Senha
                </label>
                <input
                  className="py-4 px-2 rounded border border-gray-20 outline-none text-gray-100"
                  type="password"
                  placeholder="Digite sua nova senha"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                />
              </div>
              <div className="formGroup flex flex-col gap-2">
                <label className="font-semibold" htmlFor="confirm-password">
                  Repetir Senha
                </label>
                <input
                  className="py-4 px-2 rounded border border-gray-20 outline-none text-gray-100"
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
              </div>
              <GlobalButton
                content="Atualizar Senha"
                background={Theme.color.darkBlueAxion}
                color={Theme.color.gray_10}
                width="auto"
                height="auto"
                fontSize={12}
                className="mb-5 p-2 rounded"
                onClick={handleUpdatePassword}
                loading={loadingButton}
              />
            </div>
          </main>
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
