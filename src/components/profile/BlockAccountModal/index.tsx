import { ConfirmBlockAccountModal } from "./ConfirmBlockAccount";
import { DeleteAccountModal } from "./DeleteAccount";
import { GlobalButton } from "@/components/Global/Button";
import { CloseButton } from "@/components/Global/Close";
import { useState } from "react";
import { Modal } from "react-bootstrap";

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

export function BlockAccountModal({ show, onHide }: ModalProps) {
  const [showBlockAccount, setShowBlockAccount] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  function handleOpenBlockAccount() {
    setShowBlockAccount(true);
  }

  function handleOpenDeleteAccount() {
    setShowDeleteAccount(true);
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <CloseButton onHide={onHide} />
      <div className="Content flex flex-col items-center w-4/5 m-auto">
        <img
          className="w-[7.5rem] h-[7.5rem] mt-14 mb-6"
          src="/warning.svg"
          alt=""
        />
        <h2 className="text-gray-100 text-2xl text-center">
          Tem certeza que deseja excluir a sua conta?
        </h2>
        <span className="text-center text-gray-100">
          Você pode apenas bloquear para deixar de receber atualizações e
          mensagens. <br /> Com a exclusão, todos seu histórico na plataforma e
          suas informações e conta serão totalmente apagadas.
        </span>
        <GlobalButton
          hover
          background="darkBlueAxion"
          color="white"
          content="Bloquear Conta"
          width="auto"
          padding="2"
          margin="2"
          onClick={handleOpenBlockAccount}
        />

        <GlobalButton
          hover
          background="white"
          color="darkBlueAxion"
          content="Excluir Conta"
          width="auto"
          padding="2"
          margin="2"
          onClick={handleOpenDeleteAccount}
        />
      </div>

      <ConfirmBlockAccountModal
        closePreviousModal={onHide}
        show={showBlockAccount}
        onHide={() => setShowBlockAccount(false)}
      />

      <DeleteAccountModal
        show={showDeleteAccount}
        onHide={() => setShowDeleteAccount(false)}
        closePreviousModal={onHide}
      />
    </Modal>
  );
}
