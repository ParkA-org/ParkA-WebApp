import {
    DropdownButton,
    DropdownContent,
    DropdownMenu,
    DropdownItem
  } from "./styles";

export default function ProfileDropDownMenu({username, logout}): JSX.Element {
  
    return (
        <DropdownMenu>
            <DropdownButton>
                <img src="./images/mdi_menu.svg"/>
                <img src="./images/profile_pic.svg"/>
                <h4>{username}</h4>
            </DropdownButton>
            <DropdownContent>
                <DropdownItem><img src="./images/mdi_chat.svg"/><h4>Chats</h4></DropdownItem>
                <DropdownItem><img src="./images/mdi_payment.svg"/><h4>Métodos de Pagos</h4></DropdownItem>
                <DropdownItem><img src="./images/mdi_person.svg"/><h4>Editar Perfil</h4></DropdownItem>
                <DropdownItem><img src="./images/mdi_settings.svg"/><h4>Configuración</h4></DropdownItem>
                <DropdownItem style={{cursor:"pointer"}} onClick={logout} ><img src="./images/mdi_exit.svg"/><h4>Cerrar Sesión</h4></DropdownItem>
            </DropdownContent>
        </DropdownMenu>
    );
}
    