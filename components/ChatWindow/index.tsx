import { FaRegSmile } from "react-icons/fa"
import { BiRightArrow } from "react-icons/bi"

import { Container, TopNav, ContentContainer, ChatButtons, ChatInput } from "./styles"

export default function ChatWindow() {
    return (
        <Container>
            <TopNav />
            <ContentContainer />
            <ChatButtons>
                <FaRegSmile size="2em" />
                <ChatInput type="text" />
                <BiRightArrow size="2em" />
            </ChatButtons>
        </Container>
    )
}