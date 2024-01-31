import { GlobalButton } from "@/components/Global/Button";
import { CloseButton } from "@/components/Global/Close";
import { Modal } from "react-bootstrap";

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
  async function handleUpdatePassword() {
    await changePassword();
  }

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        {show && (
          <main className="m-auto">
            <CloseButton onHide={onHide} />
            <div className="formHeader mb-8">
              <div className="flex justify-center my-2">
                <img
                  src="/profile/security-safe.svg"
                  className="w-20 h-20"
                  alt=""
                />
              </div>
              <h1 className="text-2xl text-bold text-center">
                Atualizar Senha
              </h1>
              <span className="text-sm text-center text-gray-80">
                Preencha os campos abaixo para atualizar sua senha.
              </span>
            </div>
            <div className="Form flex flex-col gap-2">
              <div className="formGroup flex flex-col gap-2">
                <label htmlFor="current-password" className="font-semibold">
                  Senha Atual
                </label>
                <input
                  className="py-2 px-2 rounded border border-gray-20 outline-none text-gray-100"
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
                  borderTop: "1px solid #C8C8C8",
                  marginTop: "1rem",
                }}
              />
              <div className="formGroup flex flex-col gap-2">
                <label className="font-semibold" htmlFor="new-password">
                  Nova Senha
                </label>
                <input
                  className="py-2 px-2 rounded border border-gray-20 outline-none text-gray-100"
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
                  className="py-2 px-2 rounded border border-gray-20 outline-none text-gray-100"
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
                hover
                content="Atualizar Senha"
                background="darkBlueAxion"
                color="white"
                width="auto"
                height="auto"
                fontSize="lg"
                margin="4"
                padding="2"
                onClick={handleUpdatePassword}
                loading={loadingButton}
              />
            </div>
          </main>
        )}
      </Modal>
    </>
  );
}
