import { FaRegSmile } from "react-icons/fa"
import { BiRightArrow } from "react-icons/bi"

import { Container, TopNav, ContentContainer, ChatButtons, ChatInput } from "./styles"

export default function ChatWindow() {
    return (
        <Container>
            <TopNav>
                <img src="../placeholders/image-placeholder.png" alt="current user profile pic" />
                <h3>Probando</h3>
            </TopNav >
            <ContentContainer />
            <ChatButtons>
                <FaRegSmile size="2em" />
                <ChatInput type="text" />
                <BiRightArrow size="2em" />
            </ChatButtons>
        </Container>
    )
}