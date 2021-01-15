import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import ModalPortal from "components/Modal";
import Button from "components/Button";
import NavigationLink from "components/NavigationLink";
import ProfileDropDownMenu from "components/ProfileDropDownMenu";
import {
  Menu,
  Logo,
  ListItem,
  Hamburger,
  LoggedHiddenContainer,
  HiddenContainer,
  ColorBar,
} from "./styles";
import { USER_STATES } from "utils/constants";
import { UserContext } from "context/UserContext";

function StandardNavbar({ setIsOpen, isOpen }): JSX.Element {
  return (
    <Menu>
      <Logo>
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
        <NavigationLink href="/">ParkA</NavigationLink>
      </Logo>
      <HiddenContainer animate={isOpen ? "open" : "closed"} inherit="false">
        <ListItem>
          <Link href="https://github.com/ParkA-org/ParkA-WebApp/wiki">
            <span className="normal-span">Wiki</span>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/contact">
            <span className="normal-span">Contacto</span>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/help">
            <span className="normal-span">Ayuda</span>
          </Link>
        </ListItem>
        <Button>
          <Link href="/login">
            <span className="active-span">Iniciar Sesión</span>
          </Link>
        </Button>
        <Button>
          <Link href="/register">
            <span className="active-span">Registrate</span>
          </Link>
        </Button>
      </HiddenContainer>
    </Menu>
  );
}

function LoggedNavbar({ logout, setIsOpen, isOpen }): JSX.Element {
  return (
    <Menu style={{ justifyContent: "flex-start" }}>
      <Logo style={{ flexGrow: "0" }}>
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
        <NavigationLink href="/">ParkA</NavigationLink>
      </Logo>
      <LoggedHiddenContainer
        animate={isOpen ? "open" : "closed"}
        inherit="false"
      >
        <ListItem>
          <Link href="/parking">
            <span className="normal-span">Parqueos</span>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/reservations">
            <span className="normal-span">Reservaciones</span>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/calendar">
            <span className="normal-span">Calendario</span>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/map">
            <span className="normal-span">Mapa</span>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/review">
            <span className="normal-span">Reseñas</span>
          </Link>
        </ListItem>
        <ProfileDropDownMenu logout={logout} />
      </LoggedHiddenContainer>
    </Menu>
  );
}

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);
  const { userStatus, logout } = useContext(UserContext);
  const [pageSize, setPageSize] = useState(1200);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      let w = document.documentElement.clientWidth;
      if (w < 600) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
      setPageSize(w);
    }
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(true);
      if (typeof window !== "undefined") {
        let w = document.documentElement.clientWidth;
        if (w < 600) {
          setShowModal(true);
        } else {
          setShowModal(false);
        }
        setPageSize(w);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [userStatus, pageSize]);

  return (
    <>
      {userStatus === USER_STATES.LOGGED_IN ? (
        <LoggedNavbar isOpen={isOpen} logout={logout} setIsOpen={setIsOpen} />
      ) : (
        <StandardNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      <ColorBar />
      {showModal && (
        <ModalPortal onClose={() => setShowModal(false)}>
          <h3>
            Recomendamos descargar la aplicación móvil para tener una mejor
            experiencia al acceder a la plataforma desde el celular. Para más
            información de como descargarla puede seguir el siguiente enlace:
          </h3>
          <Link href="https://github.com/ParkA-org/ParkA-MobileApp">
            <span className="normal-span">Aplicación móvil</span>
          </Link>
        </ModalPortal>
      )}
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
            color: #084c7c;
          }
        `}
      </style>
    </>
  );
}
