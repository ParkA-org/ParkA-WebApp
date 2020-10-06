import { useState, useEffect } from "react"
import Link from "next/link"
import useUser from "hooks/useUser"
import Button from "components/Button"
import NavigationLink from "components/NavigationLink"
import ProfileDropDownMenu from "components/ProfileDropDownMenu"
import {
  Menu,
  Logo,
  ListItem,
  Hamburger,
  LoggedHiddenContainer,
  HiddenContainer,
  ColorBar,
} from "./styles"
import { USER_STATES } from "utils/constants"
import { useLazyQuery } from "@apollo/client"
import { GET_USER } from "queries"

function StandardNavbar({ setIsOpen, isOpen }): JSX.Element {
  return (
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
  )
}


function LoggedNavbar({ logout, setIsOpen, isOpen }): JSX.Element {
  return (
    <Menu style={{ justifyContent: 'flex-start' }}>
      <Logo style={{ flexGrow: '0' }}>
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
        <NavigationLink href="/">ParkA</NavigationLink>
      </Logo>
      <LoggedHiddenContainer animate={isOpen ? "open" : "closed"} inherit="false">
        <ListItem>
          <Link href="/parking"><span className="normal-span">Parqueos</span></Link>
        </ListItem>
        <ListItem>
          <Link href="/reservations"><span className="normal-span">Reservaciones</span></Link>
        </ListItem>
        <ListItem>
          <Link href="/calendar"><span className="normal-span">Calendario</span></Link>
        </ListItem>
        <ListItem>
          <Link href="/map"><span className="normal-span">Mapa</span></Link>
        </ListItem>
        <ProfileDropDownMenu logout={logout} />
      </LoggedHiddenContainer>
    </Menu>
  )
}

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);
  const [getUser, { data }] = useLazyQuery(GET_USER)
  const { isLogged, logout, token, setUser, } = useUser()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLogged]);

  return (
    <>
      {isLogged === USER_STATES.LOGGED_IN ? <LoggedNavbar isOpen={isOpen} logout={logout} setIsOpen={setIsOpen} /> : <StandardNavbar isOpen={isOpen} setIsOpen={setIsOpen} />}
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
