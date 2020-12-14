import Layout from "./layout"
import MapViewer from "components/MapViewer"
import { useRouter } from "next/router"

export default function Map() {
    return (
        <Layout pageTitle="Map Page">
            <MapViewer />
        </Layout>
    )
}