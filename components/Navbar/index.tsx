import { useState, useEffect, useContext } from "react";
import useUser from "hooks/useUser"
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
  const { isLogged, logout } = useUser()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(true);
    };
    window.addEventListener("resize", handleResize);
    console.log('Is logged ', isLogged)
    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLogged]);

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
          {isLogged ? <Button onClick={() => {
            logout()
          }}>
            <NavigationLink href="/login">Logout</NavigationLink>
          </Button>
            :
            <>
              <Button>
                <NavigationLink href="/login">Iniciar Sesión</NavigationLink>
              </Button>
              <Button>
                <NavigationLink href="/register">Registrate</NavigationLink>
              </Button>
            </>
          }
        </HiddenContainer>
      </Menu>
      <ColorBar />
    </>
  );
}
