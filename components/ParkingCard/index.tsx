import {
    Container,
    CardImage,
    CardHeader,
    CardInformation,
    ButtonSection,
    ActionButton,
    CarStatus,
    CarVerification
} from "./styles"
import { BsStarFill, BsStar } from "react-icons/bs"
import { MdScreenShare, MdMap, MdCancel } from "react-icons/md"
import { AiFillCheckCircle } from "react-icons/ai"
import { Parking } from "utils/types"
import useRouter from "next/router"

type CardProps = {
    parking?: Parking
}
export default function ParkingCard({ parking }: CardProps) {
    const router = useRouter

    return (
        <Container onClick={() => router.push('/parking/detail/[id]', `/parking/detail/${parking.id}`)}>
            <CardImage
                src={parking?.mainPicture ? parking?.mainPicture : "../placeholders/park.png"} alt="parking lot" />
            <CardHeader>
                <h2>{parking?.parkingName ? parking?.parkingName : "Alma Rosa I"}</h2>
                <div>
                    <BsStarFill color="goldenrod" size="2em" />  <BsStarFill color="goldenrod" size="2em" />  <BsStarFill color="goldenrod" size="2em" />   <BsStarFill color="goldenrod" size="2em" /> <BsStar size="2em" />
                </div>
                <h4>(4.20)</h4>
            </CardHeader>
            <CarVerification verified={parking?.verified}>
                {parking?.verified ?
                    <>
                        <p>Verificado</p>
                        <AiFillCheckCircle size="1.5em" color="#127FFE" />
                    </>
                    :
                    <>
                        <p>No verificado</p>
                        <MdCancel size="1.5em" color="#ff0000" />
                    </>}
            </CarVerification>
            <CardInformation>
                <h3>Dirección</h3>
                <p>{parking?.direction ? parking?.direction : "Calle Puerto Rico #175"}</p>
                <h3>Precio</h3>
                <p>{parking?.priceHours ? `${parking?.priceHours} $RD por hora` : "125.00 $RD por hora"}</p>
            </CardInformation>
            <CarStatus>
                <p>Estatus actual:
                    {parking?.isAvailable ?
                        <span style={{ color: "#11DD31", fontWeight: "bold", marginLeft: "0.5em" }}>Disponible</span> :
                        <span style={{ color: "#ff0000", fontWeight: "bold", marginLeft: "0.5em" }}>No disponible</span>
                    }
                </p>
            </CarStatus>
            <ButtonSection>
                <ActionButton><MdScreenShare color="white" size="1.5em" />Compartir</ActionButton>
                <ActionButton><MdMap color="white" size="1.5em" />Ver en mapa</ActionButton>
                <ActionButton onClick={(event) => {
                    event.stopPropagation()
                    router.push('/parking/edit/[id]', `/parking/edit/${parking.id}`)
                }}>Editar</ActionButton>
            </ButtonSection>
        </Container>
    )
}