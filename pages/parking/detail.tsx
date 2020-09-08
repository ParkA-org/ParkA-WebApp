import IconButton from "components/IconButton";
import DeleteIcon from "components/Icons/Delete";
import ParkingCard from "components/ParkingCard"
import Carousel from "components/Carousel"
import ReviewCard from "components/ReviewCard"
import ParkingStats from "components/ParkingStats"
import Layout from "../layout"

export default function ParkingDetail() {

    return (
        <Layout>
            <section className="main-section">
                <ParkingCard />
                <IconButton color="#AB1414" text="">
                    <DeleteIcon />
                </IconButton>
            </section>
            <ParkingStats />

            <Carousel title="Reseñas">
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </Carousel>
            <style jsx>{`
                .main-section {
                    margin-top: 1.5em;
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    margin-bottom: 1.5em;
                }
            `}
            </style>
        </Layout>
    )
}
