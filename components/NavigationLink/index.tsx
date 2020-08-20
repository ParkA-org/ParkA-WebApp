
import Link from "next/link";
import { StyledLink, SpecialLink } from "./styles";

type LinkProps = {
  href: string;
  styled?: boolean;
  children?: JSX.Element | string
};

export default function NavigationLink({
  href,
  styled,
  children
}: LinkProps): JSX.Element {
  let linkElement = styled ? <SpecialLink>{children}</SpecialLink> : <StyledLink>{children}</StyledLink>;

  return (
    <>
      <Link href={href}>{linkElement}</Link>
    </>
  );
}
