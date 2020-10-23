import { BsSearch } from "react-icons/bs"
import Layout from "./layout"
import ChatContact from "components/ChatContact"
import ChatWindow from "components/ChatWindow"

export default function Chat() {

    return (
        <Layout>
            <div className="chatContainer">
                <div className="chatContactsContainer">
                    <div className="searchSection">
                        <BsSearch color="#cecccd" size="1.7rem" />
                        <input type="text" style={{ width: "90%", marginLeft: "0.5em", padding: "0.5em" }} placeholder="Buscar en chats" />
                    </div>
                    <ChatContact />
                    <ChatContact />
                    <ChatContact />
                    <ChatContact />
                    <ChatContact />
                    <ChatContact />
                    <ChatContact />
                    <ChatContact />
                    <ChatContact />
                    <ChatContact />
                    <ChatContact />
                    <ChatContact />
                    <ChatContact />
                    <ChatContact />
                </div>
                <ChatWindow />
            </div>
            <style jsx>
                {`
                    .chatContainer {
                        display: flex;
                        width: 99vw;
                        height: 80vh;
                        padding: 0;
                    }

                    .searchSection {
                        display: flex;
                        background-color: #fff;
                        padding: 0.25em;
                        font-size: 1.2rem;
                        align-items: center;
                        justify-content: space-around;
                    }

                    .chatContactsContainer {
                        display: flex;
                        flex-direction: column;
                        width: 40%;
                        height: 100%;
                        overflow-y: scroll;
                        overflow-x: hidden;
                    }
                `}
            </style>
        </Layout>
    )
}
