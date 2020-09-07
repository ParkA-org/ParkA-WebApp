import { useState, useEffect, useContext } from "react";
import { UserContext } from "context/UserContext"

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

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useContext(UserContext)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(true);
    };
    window.addEventListener("resize", handleResize);
    if (Boolean(user.id)) {
      setIsLogged(true)
    }
    console.log('Is logged ', isLogged)
    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, [user]);

  return (
    <>
      <Menu>
        <Logo>
          <Hamburger onClick={() => setIsOpen(!isOpen)} />
          <NavigationLink href="/">ParkA</NavigationLink>
        </Logo>
        <HiddenContainer animate={isOpen ? "open" : "closed"} inherit="false">
          <ListItem>
            <NavigationLink href="/contact">Contacto</NavigationLink>
          </ListItem>
          <ListItem>
            <NavigationLink href="/help">Ayuda</NavigationLink>
          </ListItem>
          <Button>
            <NavigationLink href="/login">Iniciar Sesión</NavigationLink>
          </Button>
          <Button>
            <NavigationLink href="/register">Registrate</NavigationLink>
          </Button>
          {isLogged ? <button>Adentro</button> : <button>Afuera</button>}
        </HiddenContainer>
      </Menu>
      <ColorBar />
    </>
  );
}
