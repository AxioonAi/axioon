import { GlobalButton } from "@/components/Global/Button";
import { CloseButton } from "@/components/Global/Close";
import Theme from "@/styles/themes";
import { Modal } from "react-bootstrap";

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

export function VideoModal({ show, onHide }: ModalProps) {
  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        {show && (
          <main className="Content flex flex-col w-full gap-5 p-4">
            <CloseButton onHide={onHide} />
            <h1>Insights de Marketing</h1>
            <div className="Form flex flex-col w-4/5 self-center gap-5">
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
            </div>
            <GlobalButton
              content="Voltar"
              background={Theme.color.darkBlueAxion}
              color={Theme.color.gray_10}
              width="50%"
              className="self-center rounded"
              height="auto"
              onClick={() => onHide()}
            />
          </main>
        )}
      </Modal>
    </>
  );
}
