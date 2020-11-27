import { FaRegSmile } from "react-icons/fa"
import { BiRightArrow } from "react-icons/bi"

import { Container, TopNav, ContentContainer, OverflowContentContainer, OverflowContent, ChatButtons, ChatInput } from "./styles"

export default function ChatWindow() {
    return (
        <Container>
            <TopNav>
                <img src="/placeholders/image.png" alt="current user profile pic" />
                <h3>Probando</h3>
            </TopNav >
            <ContentContainer>
                <OverflowContentContainer>
                    <OverflowContent>
                        <p className="user-bubble">
                            Probando esto a ver que tal
            </p>
                        <p className="another-bubble">
                            Probando denuevo esto a ver como va Probando denuevo esto a ver como vaProbando denuevo esto a ver como va
            </p>
                        <p className="user-bubble">
                            Probando esto a ver que tal
            </p>
                        <p className="another-bubble">
                            Probando denuevo esto a ver como va Probando denuevo esto a ver como vaProbando denuevo esto a ver como va
            </p>
                        <p className="user-bubble">
                            Probando esto a ver que tal
            </p>
                        <p className="another-bubble">
                            Probando denuevo esto a ver como va Probando denuevo esto a ver como vaProbando denuevo esto a ver como va
            </p>
                        <p className="user-bubble">
                            Probando esto a ver que tal
            </p>
                        <p className="another-bubble">
                            Probando denuevo esto a ver como va Probando denuevo esto a ver como vaProbando denuevo esto a ver como va
            </p>
                        <p className="user-bubble">
                            Probando esto a ver que tal
            </p>
                        <p className="another-bubble">
                            Probando denuevo esto a ver como va Probando denuevo esto a ver como vaProbando denuevo esto a ver como va
            </p>
                    </OverflowContent>
                </OverflowContentContainer>
            </ContentContainer>
            <ChatButtons>
                <FaRegSmile size="2em" />
                <ChatInput type="text" />
                <BiRightArrow size="2em" />
            </ChatButtons>
            <style jsx>{`
                .user-bubble {
                    align-self: flex-start;
                    margin: 1em;
                    background-color: #fff;
                }

                .another-bubble {
                    align-self: flex-end;
                    margin: 1em;
                    color: white;
                    background-color: #4ba1db;
                }
            `}</style>
        </Container>
    )
}