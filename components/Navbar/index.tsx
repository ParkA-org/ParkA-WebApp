import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../Button";
import {
  Menu,
  Logo,
  ListItem,
  Hamburger,
  StyledLink,
  HiddenContainer,
} from "./styles";

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(true);
    };
    window.addEventListener("resize", handleResize);

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Menu>
        <Logo>
          <Hamburger onClick={() => setIsOpen(!isOpen)} />
          <Link href="/">
            <StyledLink>ParkA</StyledLink>
          </Link>
        </Logo>
        <HiddenContainer animate={isOpen ? "open" : "closed"} inherit="false">
          <ListItem>
            <Link href="/contact">
              <StyledLink>Contacto</StyledLink>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/help">
              <StyledLink>Ayuda</StyledLink>
            </Link>
          </ListItem>
          <Button>
            <Link href="/login">
              <StyledLink>Iniciar Sesión</StyledLink>
            </Link>
          </Button>
          <Button>
            <Link href="/register">
              <StyledLink>Registrate</StyledLink>
            </Link>
          </Button>
        </HiddenContainer>
      </Menu>
    </>
  );
}
