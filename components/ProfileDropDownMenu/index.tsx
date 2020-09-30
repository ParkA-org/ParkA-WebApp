import {
    DropdownButton,
    DropdownContent,
    DropdownMenu,
    DropdownItem
} from "./styles";
import useUser from "hooks/useUser"
import { useEffect } from "react";
import { useQuery } from '@apollo/client'
import { GET_USER } from "queries"
import useLocalStorage from "hooks/useLocalStorage";

interface USER_ID {
    id: String
}

export default function ProfileDropDownMenu({ logout }): JSX.Element {
    // const [userId, setUserId] = useLocalStorage("user-id", "")
    // const { user } = useUser()
    // const { loading, error, data } = useQuery<USER_ID>(GET_USER);
    // useEffect(() => {
    //     console.log('User dentro del dropdown')
    //     console.log(user)
    // }, [])
    return (
        <DropdownMenu>
            <DropdownButton>
                <img src="images/mdi_menu.svg" />
                <img src="images/profile_pic.svg" />
                <h4>César</h4>
            </DropdownButton>
            <DropdownContent>
                <DropdownItem style={{ cursor: "pointer" }} ><img src="images/mdi_chat.svg" /><h4>Chats</h4></DropdownItem>
                <DropdownItem style={{ cursor: "pointer" }} ><img src="images/mdi_payment.svg" /><h4>Métodos de Pagos</h4></DropdownItem>
                <DropdownItem style={{ cursor: "pointer" }} ><img src="images/mdi_person.svg" /><h4>Editar Perfil</h4></DropdownItem>
                <DropdownItem style={{ cursor: "pointer" }} ><img src="images/mdi_settings.svg" /><h4>Configuración</h4></DropdownItem>
                <DropdownItem style={{ cursor: "pointer" }} onClick={logout} ><img src="./images/mdi_exit.svg" /><h4>Cerrar Sesión</h4></DropdownItem>
            </DropdownContent>
        </DropdownMenu>
    );
}
