import { GlobalButton } from "@/components/Global/Button";
import { CloseButton } from "@/components/Global/Close";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Content, Form } from "./styles";
import Theme from "@/styles/themes";

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

export function VideoModal({ show, onHide }: ModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, [show]);

  function handleUpdatePassword() {
    setShowSuccess(true);
    setIsVisible(false);
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
            <h1>Insights de Marketing</h1>
            <Form>
              <iframe
                src="https://www.youtube.com/embed/KLuTLF3x9sA?si=0lTzsOtsnzBgF9F-"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                style={{
                  alignSelf: "center",
                  width: "100%",
                  aspectRatio: "16/9",
                }}
              ></iframe>
              orem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has.
            </Form>
            <GlobalButton
              content="Voltar"
              background={Theme.color.darkBlueAxion}
              color={Theme.color.gray_10}
              width="50%"
              className="self-center rounded"
              height="auto"
              onClick={() => onHide()}
            />
          </Content>
        )}
      </Modal>
    </>
  );
}
