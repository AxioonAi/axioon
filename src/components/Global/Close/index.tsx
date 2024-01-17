import { CloseSVG } from "../../../../public/Close";
import { Close } from "./styles";

interface CloseProps {
  onHide: () => void;
}

export function CloseButton({ onHide }: CloseProps) {
  return (
    <button
      className="absolute top-8 right-8 transition duration-300 border-0 bg-transparent text-gray-100 hover:text-gray-80"
      onClick={onHide}
    >
      <CloseSVG />
    </button>
  );
}
