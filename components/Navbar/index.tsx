import React, { useState } from "react";
import { Menu, Logo, ListItem, Button, Hamburguer } from "./styles";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Menu>
        <Logo>
          {" "}
          <Hamburguer onClick={() => setIsOpen(!isOpen)} /> ParkA
        </Logo>
        <ListItem hide={isOpen} layout>
          Contacto
        </ListItem>
        <ListItem hide={isOpen} layout>
          Ayuda
        </ListItem>
        <Button hide={isOpen} layout>
          Iniciar Sesión
        </Button>
        <Button hide={isOpen} layout>
          Registrate
        </Button>
      </Menu>
    </>
  );
}
