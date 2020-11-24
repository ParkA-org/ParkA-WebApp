import { useState } from "react"
import { Review } from "utils/types"
import { parseISOString } from "utils/functions"
import { Container, ModalContainer, ModalText, Avatar, UserInfo, ReviewDate, Text, ModalLink, ReviewTitle, ModalTitle } from "./styles"
import ModalPortal from "components/Modal"
import { BsStarFill, BsStar } from "react-icons/bs"

export default function ReviewCard({ id, title, calification, createdAt, review, user }: Review) {
    const [showModal, setShowModal] = useState(false)
    let stars = []
    for (let i = 0; i < calification; i++) {
        stars.push(<BsStarFill color="goldenrod" />)
    }
    for (let i = calification; i < 5 && stars.length != 5; i++) {
        stars.push(<BsStar />)
    }
    return (
        <Container>
            <Avatar src={user.profilePicture ? user.profilePicture : "/placeholders/image.png"} alt="user avatar" />
            <UserInfo>
                <h3>{`${user.name} ${user.lastName}`}</h3>
                <div>
                    {stars}
                </div>
            </UserInfo>
            <ReviewDate>
                {`${parseISOString(createdAt).toLocaleDateString('es-ES')}`}
            </ReviewDate>
            <ReviewTitle>
                {title}
            </ReviewTitle>
            <Text>
                {review}
            </Text>
            <ModalLink onClick={() => setShowModal(true)}>
                Ver más
            </ModalLink>
            {showModal && <ModalPortal onClose={() => setShowModal(false)}>
                <ModalContainer>
                    <Avatar src={user.profilePicture ? user.profilePicture : "/placeholders/image.png"} alt="user avatar" />
                    <UserInfo>
                        <h3>{`${user.name} ${user.lastName}`}</h3>
                        <div>
                            {stars}
                        </div>
                    </UserInfo>
                    <ReviewDate style={{ marginRight: "2em" }}>
                        {`${parseISOString(createdAt).toLocaleDateString('es-ES')}`}
                    </ReviewDate>
                    <ModalTitle>
                        {title}
                    </ModalTitle>
                    <ModalText>
                        {review}
                    </ModalText>
                </ModalContainer>
            </ModalPortal>}
        </Container>
    )
}