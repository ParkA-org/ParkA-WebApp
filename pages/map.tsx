
import Layout from "./layout"
import FilterSideBar from "components/FilterSidebar"
import MapViewer from "components/MapViewer"

export default function Map() {
    return (
        <Layout pageTitle="Map Page">
            {/* <FilterSideBar /> */}
            <MapViewer />
        </Layout>
    )
}