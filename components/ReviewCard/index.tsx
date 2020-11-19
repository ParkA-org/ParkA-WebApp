
import { useState } from "react"
import { Container, ModalContainer, ModalText, Avatar, UserInfo, ReviewDate, Text, ModalLink } from "./styles"
import ModalPortal from "components/Modal"
import { BsStarFill, BsStar } from "react-icons/bs"

export default function ReviewCard() {
    const [showModal, setShowModal] = useState(false)
    return (
        <Container>
            <Avatar src="/placeholders/image.png" alt="user avatar" />
            <UserInfo>
                <h3>David Bujosa</h3>
                <div>
                    <BsStarFill color="goldenrod" />  <BsStarFill color="goldenrod" />  <BsStarFill color="goldenrod" /> <BsStar /> <BsStar />
                </div>
            </UserInfo>
            <ReviewDate>
                7/3/2020
            </ReviewDate>
            <Text>
                Me agrado mucho el parqueo, venia con carwash y seguridad incluido asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            </Text>
            <ModalLink onClick={() => setShowModal(true)}>
                Ver más
            </ModalLink>
            {showModal && <ModalPortal onClose={() => setShowModal(false)}>
                <ModalContainer>
                    <Avatar src="/placeholders/image.png" alt="user avatar" />
                    <UserInfo>
                        <h3>David Bujosa</h3>
                        <div>
                            <BsStarFill color="goldenrod" />  <BsStarFill color="goldenrod" />  <BsStarFill color="goldenrod" /> <BsStar /> <BsStar />
                        </div>
                    </UserInfo>
                    <ReviewDate>
                        7/3/2020
                    </ReviewDate>
                    <ModalText>
                        Me agrado mucho el parqueo, venia con carwash y seguridad incluido asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                        Me agrado mucho el parqueo, venia con carwash y seguridad incluido
                        Me agrado mucho el parqueo, venia con carwash y seguridad incluido
                    </ModalText>
                </ModalContainer>
            </ModalPortal>}
        </Container>
    )
}