
import Layout from "./layout"
import ChatContact from "components/ChatContact"
import ChatWindow from "components/ChatWindow"

export default function Chat() {

    return (
        <Layout>
            <div className="container">
                <div className="chatContactsContainer">
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
                        outline: 1px solid red;
                        padding: 0;
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
