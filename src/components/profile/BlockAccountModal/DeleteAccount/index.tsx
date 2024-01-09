import { CloseButton } from "@/components/Global/Close";
import { Modal } from "react-bootstrap";
import { Content } from "./styles";
import { GlobalButton } from "@/components/Global/Button";
import Theme from "@/styles/themes";

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
      <Content>
        <img src="/profile/trashcan.svg" alt="" />
        <h2>Confirme a exclusão da sua conta</h2>
        <span>
          Ao excluir sua conta você perde automaticamento o acesso a conta, e
          para acessa a plataforma novamente você deve realizar uma nova
          assinatura. <br /> <strong>Tem certeza dessa decisão?</strong>
        </span>
        <GlobalButton
          background={Theme.color.darkBlueAxion}
          color={Theme.color.gray_10}
          content="Bloquear Conta"
          className="button1"
        />

        <GlobalButton
          background={Theme.color.gray_10}
          color={Theme.color.darkBlueAxion}
          content="Cancelar"
          className="button2"
          onClick={handleClose}
        />
      </Content>
    </Modal>
  );
}
