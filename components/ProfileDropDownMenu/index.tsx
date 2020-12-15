import { useContext } from "react";
import { UserContext } from "context/UserContext";
import { useRouter } from "next/router"
import {
    DropdownButton,
    DropdownContent,
    DropdownMenu,
    DropdownItem,
    ToggleButton
} from "./styles";

export default function ProfileDropDownMenu({ logout }): JSX.Element {
    const { user, loading } = useContext(UserContext)
    const router = useRouter()

    function showMenu(e) {
        console.log(e.currentTarget.parentNode.nextSibling.style.display);
        var content = e.currentTarget.parentNode.nextSibling;
        if (content.style.display == 'none' || content.style.display == '') {

            e.currentTarget.parentNode.parentNode.style.border = 'solid';
            e.currentTarget.parentNode.parentNode.style.borderColor = '#336F8B';
            e.currentTarget.parentNode.parentNode.style.borderWidth = '2px';
            e.currentTarget.parentNode.parentNode.style.borderRadius = '1.2em';
            e.currentTarget.parentNode.parentNode.style.top = '20px';
            e.currentTarget.parentNode.parentNode.style.right = '25px';

            e.currentTarget.parentNode.style.border = 'solid';
            e.currentTarget.parentNode.style.borderColor = '#336F8B';
            e.currentTarget.parentNode.style.borderWidth = '2px';
            e.currentTarget.parentNode.style.borderRadius = '1.2em';
            e.currentTarget.parentNode.style.height = '57px';

            e.currentTarget.nextSibling.style.border = 'none';
            e.currentTarget.parentNode.nextSibling.style.display = 'block';

        } else {
            e.currentTarget.parentNode.parentNode.style.border = 'none'

            e.currentTarget.parentNode.style.border = 'none'
            e.currentTarget.parentNode.style.height = 'auto';
            e.currentTarget.parentNode.parentNode.style.top = '25px';
            e.currentTarget.parentNode.parentNode.style.right = '30px';

            e.currentTarget.nextSibling.style.border = 'solid';
            e.currentTarget.nextSibling.style.borderColor = '#336F8B';
            e.currentTarget.nextSibling.style.borderWidth = '2px';
            e.currentTarget.nextSibling.style.borderRadius = '1.2em';
            e.currentTarget.parentNode.nextSibling.style.display = 'none';
        }
    }

    return (
        <DropdownMenu>
            <div>
                <ToggleButton onClick={showMenu}>
                    <img src="/images/mdi_menu.svg" />
                </ToggleButton>
                <DropdownButton onClick={() => router.push("/profile")}>
                    <div>
                        <img className="userProfilePic" src={loading ? "/images/profile_pic.svg" : `${user?.profilePicture}`} />
                        <h4>{loading ? "Cargando..." : user?.name} </h4>
                    </div>
                </DropdownButton>
            </div>
            <DropdownContent>
                <DropdownItem style={{ cursor: "pointer" }} onClick={() => router.push("/chat")}><img src="/images/mdi_chat.svg" /><h4>Chats</h4></DropdownItem>
                <DropdownItem style={{ cursor: "pointer" }} onClick={() => router.push("/profile/paymentMethods")}><img src="/images/mdi_payment.svg" /><h4>Métodos de Pagos</h4></DropdownItem>
                <DropdownItem style={{ cursor: "pointer" }} onClick={() => router.push("/profile/edit")}><img src="/images/mdi_person.svg" /><h4>Editar Perfil</h4></DropdownItem>
                <DropdownItem style={{ cursor: "pointer" }} onClick={() => router.push("/newPassword")} ><img src="/images/mdi_settings.svg" /><h4>Cambiar contraseña</h4></DropdownItem>
                <DropdownItem style={{ cursor: "pointer" }} onClick={logout} ><img src="/images/mdi_exit.svg" /><h4>Cerrar Sesión</h4></DropdownItem>
            </DropdownContent>
            <style jsx>{`
        .userProfilePic{
            width: 45px;
            height: 45px;
            border-radius: 25px;
        }
    `}</style>
        </DropdownMenu>
    );
}
