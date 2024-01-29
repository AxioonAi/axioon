import { GlobalButton } from "@/components/Global/Button";
import { CloseButton } from "@/components/Global/Close";
import Theme from "@/styles/themes";
import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Content, Form, FormGroup, FormHeader, SuccessModal } from "./styles";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  subUserFormData: {
    name: string;
    email: string;
    password: string;
  };
  setSubUserFormData: React.Dispatch<
    React.SetStateAction<ModalProps["subUserFormData"]>
  >;
  registerSubUser: () => void;
  loadingSubUser: boolean;
}

export function NewUserModal({
  show,
  onHide,
  subUserFormData,
  setSubUserFormData,
  registerSubUser,
  loadingSubUser,
}: ModalProps) {
  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        {show && (
          <div className="flex flex-col items-center justify-center w-2/3 self-center">
            <CloseButton onHide={onHide} />
            <FormHeader>
              <div>
                <img src="/axionLogo.png" alt="" />
              </div>
              <h1>Cadastrar novo Usuário</h1>
              <span>Preencha os campos abaixo</span>
            </FormHeader>
            <div className="flex flex-col w-full gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Nome Completo</label>
                <input
                  className="p-3 rounded border-[1px] w-full border-gray-20 outline-none text-black text-sm"
                  type="text"
                  id="name"
                  value={subUserFormData?.name}
                  onChange={(e) =>
                    setSubUserFormData({
                      ...subUserFormData,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  className="p-3 rounded border-[1px] w-full border-gray-20 outline-none text-black text-sm"
                  type="email"
                  id="email"
                  value={subUserFormData?.email}
                  onChange={(e) =>
                    setSubUserFormData({
                      ...subUserFormData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Senha</label>
                <input
                  className="p-3 rounded border-[1px] w-full border-gray-20 outline-none text-black text-sm"
                  type="password"
                  id="password"
                  value={subUserFormData?.password}
                  onChange={(e) =>
                    setSubUserFormData({
                      ...subUserFormData,
                      password: e.target.value,
                    })
                  }
                />
              </div>

              <button
                onClick={registerSubUser}
                className="w-full lg:w-2/3 self-center mb-4 p-3 rounded border-[1px] border-darkBlueAxion outline-none text-darkBlueAxion text-xl hover:scale-[1.01] transition duration-200"
                disabled={loadingSubUser}
              >
                {loadingSubUser ? (
                  <Spinner animation="border" />
                ) : (
                  "Cadastrar novo usuário"
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
