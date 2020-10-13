import {
    Container,
    CardImage,
    CardHeader,
    CardInformation,
    ButtonSection,
    ActionButton
} from "./styles"
import { BsStarFill, BsStar } from "react-icons/bs"
import { Parking } from "utils/types"

type CardProps = {
    parking?: Parking
}
export default function ParkingCard({ parking }: CardProps) {

    return (
        <Container>
            <CardImage
                src={parking?.mainPicture ? parking?.mainPicture : "../placeholders/park-placeholder.png"} alt="parking lot" />
            <CardHeader>
                <h2>{parking?.parkingName ? parking?.parkingName : "Alma Rosa I"}</h2>
                <div>
                    <BsStarFill color="goldenrod" />  <BsStarFill color="goldenrod" />  <BsStarFill color="goldenrod" />   <BsStarFill color="goldenrod" /> <BsStar />
                </div>
                <h4>(4.20)</h4>
            </CardHeader>
            <CardInformation>
                <h3>Dirección</h3>
                <p>{parking?.direction ? parking?.direction : "Calle Puerto Rico #175"}</p>
                <h3>Precio</h3>
                <p>{parking?.priceHours ? parking?.priceHours : "125.00 $RD por hora"}</p>
            </CardInformation>
            <ButtonSection>
                <ActionButton>Compartir</ActionButton>
                <ActionButton>Mapa</ActionButton>
                <ActionButton>Editar</ActionButton>
            </ButtonSection>
        </Container>
    )
}