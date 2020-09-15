import { useState } from "react"
import Layout from "./layout"
import FilterSideBar from "components/FilterSidebar"
import MapViewer from "components/MapViewer"

export default function Map() {
    const [show, setShow] = useState(false)

    return (
        <Layout pageTitle="Map Page">
            <button onClick={() => setShow(!show)}>Toggle</button>
            {show && <FilterSideBar />}
            <MapViewer />
        </Layout>
    )
}