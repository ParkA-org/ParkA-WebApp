import React, { useState, useEffect } from "react";
import Button from "../Button";
import NavigationLink from "../NavigationLink";
import {
  Menu,
  Logo,
  ListItem,
  Hamburger,
  HiddenContainer,
  ColorBar,
} from "./styles";

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);

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
          <NavigationLink href="/" text="ParkA" />
        </Logo>
        <HiddenContainer animate={isOpen ? "open" : "closed"} inherit="false">
          <ListItem>
            <NavigationLink href="/contact" text="Contacto" />
          </ListItem>
          <ListItem>
            <NavigationLink href="/help" text="Ayuda" />
          </ListItem>
          <Button>
            <NavigationLink href="/login" text="Iniciar Sesión" />
          </Button>
          <Button>
            <NavigationLink href="/register" text="Registrate" />
          </Button>
        </HiddenContainer>
      </Menu>
      <ColorBar />
    </>
  );
}
