import { BsSearch } from "react-icons/bs"
import Layout from "./layout"
import ChatContact from "components/ChatContact"
import ChatWindow from "components/ChatWindow"

export default function Chat() {

    return (
        <Layout>
            <div className="container">
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
                    .container {
                        display: flex;
                        width: 98vw;
                        height: 80vh;
                        padding: 0;
                        margin-top: 2em;
                    }

                    .searchSection {
                        display: flex;
                        background-color: #fff;
                        padding: 0.25em;
                    }

                    .chatContactsContainer {
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                        overflow-y: scroll;
                        overflow-x: hidden;
                    }
                `}
            </style>
        </Layout>
    )
}
