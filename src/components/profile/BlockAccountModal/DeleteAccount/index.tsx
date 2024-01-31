import { GlobalButton } from "@/components/Global/Button";
import { CloseButton } from "@/components/Global/Close";
import { Modal } from "react-bootstrap";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  closePreviousModal: () => void;
}

export function DeleteAccountModal({
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
          src="/profile/trashcan.svg"
          alt=""
        />
        <h2 className="text-gray-100 text-2xl text-center">
          Confirme a exclusão da sua conta
        </h2>
        <span className="text-center text-gray-100">
          Ao excluir sua conta você perde automaticamento o acesso a conta, e
          para acessa a plataforma novamente você deve realizar uma nova
          assinatura. <br /> <strong>Tem certeza dessa decisão?</strong>
        </span>
        <GlobalButton
          hover
          background="darkBlueAxion"
          color="white"
          content="Excluir Conta"
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
