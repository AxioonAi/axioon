import { useRouter } from "next/router";
import React from "react";

interface LinkProps {
  href: string;
  imgSrc: React.ReactElement;
  name: string;
  color?: string;
  fadeOut: any;
}

export function LinkComponent({
  href,
  imgSrc,
  name,
  color,
  fadeOut,
}: LinkProps) {
  const router = useRouter();
  const pageActive =
    `/${router.asPath.split("/")[1]}` === href ||
    (`/${router.asPath.split("/")[1]}` === "/home" &&
      href === "/home/seu-eleitorado");

  const handleClick = () => {
    if (pageActive) {
      return;
    }
    fadeOut();
    router.push(href);
  };

  return (
    <>
      <div
        className={`NavLink flex relative rounded-lg gap-4 py-3 px-4 items-center w-52 cursor-pointer transition duration-200 ease-in-out ${pageActive ? "bg-[#232323] opacity-100" : "bg-transparent opacity-50"}`}
        onClick={handleClick}
      >
        <div className={`NavIcons w-5 h-auto ${color ? color : "text-white"}`}>
          {imgSrc}
        </div>
        <span>{name}</span>
      </div>
    </>
  );
}
