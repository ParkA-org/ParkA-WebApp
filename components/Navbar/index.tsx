import { useState, useEffect } from "react";
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
import Link from "next/link";

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
            <Link href="/contact"><span className="normal-span">Contacto</span></Link>
          </ListItem>
          <ListItem>
            <Link href="/help"><span className="normal-span">Ayuda</span></Link>
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
