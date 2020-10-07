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
                        <BsSearch color="#cecccd" size="1rem" />
                        <input type="text" style={{ width: "80%", marginLeft: "0.5em" }} placeholder="Buscar en chats" />
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
