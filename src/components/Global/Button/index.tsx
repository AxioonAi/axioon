import { Spinner } from "react-bootstrap";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  content: string;
  background: string;
  color: string;
  rounded?: string;
  paddingX?: string;
  paddingY?: string;
  padding?: string;
  margin?: string;
  disabled?: boolean;
  loading?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
  children?: React.ReactNode;
  selfCenter?: boolean;
  hover?: boolean;
}

export function GlobalButton({
  content,
  background,
  color,
  rounded,
  paddingX,
  paddingY,
  padding,
  margin,
  disabled = false,
  loading = false,
  width,
  height,
  fontSize,
  children,
  selfCenter,
  hover,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`Container ${background ? `bg-${background}` : ""} ${color ? `text-${color}` : ""}
        border-[1px] ${background === "white" ? `border-${color}` : ""}
        ${width ? `w-${width}` : "w-auto"} ${height ? `h-${height}` : "h-auto"}
        ${fontSize ? `text-${fontSize}` : ""} ${rounded ? `rounded-${rounded}` : "rounded"}
        ${paddingX ? `px-${paddingX}` : ""} ${paddingY ? `py-${paddingY}` : ""}
        ${padding ? `p-${padding}` : ""} ${selfCenter ? "self-center" : ""}
        ${margin ? `m-${margin}` : ""} ${hover && !disabled ? "hover:scale-[1.01]" : ""}
        transition duration-200 ease-in
        `}
      disabled={disabled}
      {...rest}
    >
      {loading ? <Spinner animation="border" size="sm" /> : content} {""}
      {children}
    </button>
  );
}
