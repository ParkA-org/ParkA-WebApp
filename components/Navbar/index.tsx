import React, { useState } from "react";
import Link from "next/link";
import { Menu, Logo, ListItem, Button, Hamburger, StyledLink } from "./styles";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Menu>
        <Logo>
          <Hamburger onClick={() => setIsOpen(!isOpen)} />
          <Link href="/">
            <StyledLink>ParkA</StyledLink>
          </Link>
        </Logo>
        <ListItem hide={isOpen} layout>
          <Link href="/contact">
            <StyledLink>Contacto</StyledLink>
          </Link>
        </ListItem>
        <ListItem hide={isOpen} layout>
          <Link href="/help">
            <StyledLink>Ayuda</StyledLink>
          </Link>
        </ListItem>
        <Button hide={isOpen} layout>
          <Link href="/login">
            <StyledLink>Iniciar Sesión</StyledLink>
          </Link>
        </Button>
        <Button hide={isOpen} layout>
          <Link href="/register">
            <StyledLink>Registrate</StyledLink>
          </Link>
        </Button>
      </Menu>
    </>
  );
}
