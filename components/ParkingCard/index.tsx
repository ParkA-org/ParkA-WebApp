import {
    Container,
    CardImage,
    CardHeader,
    CardInformation,
    ButtonSection,
    ActionButton
} from "./styles"
import { BsStarFill, BsStar } from "react-icons/bs"

export default function ParkingCard() {

    return (
        <Container>
            <CardImage src="../placeholders/image-placeholder.png" alt="parking lot" />
            <CardHeader>
                <h2>Alma Rosa I</h2>
                <div>
                    <BsStarFill color="goldenrod" />  <BsStarFill color="goldenrod" />  <BsStarFill color="goldenrod" />   <BsStarFill color="goldenrod" /> <BsStar />
                </div>
                <h4>(4.20)</h4>
            </CardHeader>
            <CardInformation>
                <h3>Dirección</h3>
                <p>Calle Puerto Rico #175</p>
                <h3>Precio</h3>
                <p>125.00 $RD por hora</p>
            </CardInformation>
            <ButtonSection>
                <ActionButton>Compartir</ActionButton>
                <ActionButton>Mapa</ActionButton>
                <ActionButton>Editar</ActionButton>
            </ButtonSection>
        </Container>
    )
}