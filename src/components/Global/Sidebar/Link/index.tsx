import { useRouter } from "next/router";
import React, { ReactComponentElement, useEffect, useState } from "react";
import { NavIcons, NavLink } from "./styles";

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
  const pageActive = `/${router.asPath.split("/")[1]}` === href || (`/${router.asPath.split("/")[1]}` === "/home" && href === "/home/seu-eleitorado");

  const handleClick = () => {
    fadeOut();
    router.push(href);
  };

  return (
    <>
      <div className={`rounded-lg relative flex gap-4 py-3 px-4 items-center w-full cursor-pointer hover:bg-[#434343] transition-all duration-300 ease-in-out`} 
      style={{ backgroundColor: pageActive ? "#434343" : "", opacity: pageActive ? "1" : "0.4" }} onClick={handleClick}>
        <div className={`w-5 h-auto text-${color}`}>{imgSrc}</div>
        <span>{name}</span>
      </div>
    </>
  );
}
