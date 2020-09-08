import { useState, useEffect } from "react";
import Button from "components/Button";
import NavigationLink from "components/NavigationLink";
import {
  Menu,
  Logo,
  ListItem,
  Hamburger,
  HiddenContainer,
  ColorBar,
} from "./styles";
import Link from "next/link";

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
          <NavigationLink href="/">ParkA</NavigationLink>
        </Logo>
        <HiddenContainer animate={isOpen ? "open" : "closed"} inherit="false">
          <ListItem>
            <Link href="/contact"><span className="normal-span">Contacto</span></Link>
          </ListItem>
          <ListItem>
            <Link href="/help"><span className="normal-span">Ayuda</span></Link>
          </ListItem>
          <Button>
            <Link href="/login"><span className="active-span">Iniciar Sesión</span></Link>
          </Button>
          <Button>
            <Link href="/register"><span className="active-span">Registrate</span></Link>
          </Button>
        </HiddenContainer>
      </Menu>
      <ColorBar />
      <style jsx>
        {`
          span {
            font-size: 1.3rem;
          }

          .active-span {
            color: white; 
          }

          .normal-span {
            font-size: 1.6rem;
            color: #084C7C;
          }
        `}
      </style>
    </>
  );
}
