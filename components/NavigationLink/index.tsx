import React from "react";
import Link from "next/link";
import { StyledLink, SpecialLink } from "./styles";

type LinkProps = {
  href: string;
  text: string;
  styled?: boolean;
};

export default function NavigationLink({
  href,
  text,
  styled,
}: LinkProps): JSX.Element {
  let linkElement = <StyledLink>{text}</StyledLink>;
  if (styled) linkElement = <SpecialLink>{text}</SpecialLink>;

  return (
    <>
      <Link href={href}>{linkElement}</Link>
    </>
  );
}
