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
      <NavLink color={color} isActive={pageActive} onClick={handleClick}>
        <NavIcons>{imgSrc}</NavIcons>
        <span>{name}</span>
      </NavLink>
    </>
  );
}
