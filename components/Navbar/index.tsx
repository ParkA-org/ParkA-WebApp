import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Logo, ListItem, Button, Hamburger, StyledLink } from "./styles";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
      },
    },
    closed: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 2,
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
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
        <ListItem
          hide={isOpen}
          animate={isOpen ? "closed" : "open"}
          variants={variants}
        >
          <Link href="/contact">
            <StyledLink>Contacto</StyledLink>
          </Link>
        </ListItem>
        <ListItem
          hide={isOpen}
          animate={isOpen ? "closed" : "open"}
          variants={variants}
        >
          <Link href="/help">
            <StyledLink>Ayuda</StyledLink>
          </Link>
        </ListItem>
        <Button
          hide={isOpen}
          animate={isOpen ? "closed" : "open"}
          variants={variants}
        >
          <Link href="/login">
            <StyledLink>Iniciar Sesión</StyledLink>
          </Link>
        </Button>
        <Button
          hide={isOpen}
          animate={isOpen ? "closed" : "open"}
          variants={variants}
        >
          <Link href="/register">
            <StyledLink>Registrate</StyledLink>
          </Link>
        </Button>
      </Menu>
    </>
  );
}
