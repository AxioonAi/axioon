import { GlobalButton } from "@/components/Global/Button";
import { CloseButton } from "@/components/Global/Close";
import { Modal } from "react-bootstrap";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  closePreviousModal: () => void;
}

export function ConfirmBlockAccountModal({
  show,
  onHide,
  closePreviousModal,
}: ModalProps) {
  function handleClose() {
    closePreviousModal();
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <CloseButton onHide={handleClose} />
      <div className="Content flex flex-col items-center w-4/5 m-auto">
        <img
          className="w-[7.5rem] h-[7.5rem] mt-14 mb-6"
          src="/profile/lock.svg"
          alt=""
        />
        <h2 className="text-gray-100 text-2xl text-center">
          Confirme o bloqueio da sua conta
        </h2>
        <span className="text-center text-gray-100">
          Ao bloquear a conta você perde automaticamento o acesso a conta e para
          acessar a conta novamente você deve acionar o nosso email
          suporte@axion.com.br , tem certeza dessa decisão?
        </span>
        <GlobalButton
          hover
          background="darkBlueAxion"
          color="white"
          content="Bloquear Conta"
          width="auto"
          padding="2"
          margin="2"
        />

        <GlobalButton
          hover
          background="white"
          color="darkBlueAxion"
          content="Cancelar"
          width="auto"
          padding="2"
          margin="2"
          onClick={handleClose}
        />
      </div>
    </Modal>
  );
}
