import React from "react";
import Link from "next/link";
import { StyledLink } from "./styles";

type LinkProps = {
  href: string;
  text: string;
};

export default function NavigationLink({ href, text }: LinkProps): JSX.Element {
  return (
    <>
      <Link href={href}>
        <StyledLink>{text}</StyledLink>
      </Link>
    </>
  );
}
