import { AiFillCheckCircle } from "react-icons/ai"
import { useRouter } from "next/router"
import styled from "styled-components"
import { Vehicle } from "utils/types"
import {
    Card,
    CardImage,
    CardDetails,
    AdditionalInfo,
    CardBrandImage
} from "./styles"

type CardProps = {
    vehicle?: Vehicle
}

const EditButton = styled.button`
    color: white;
    background: #077187;
    border-radius: 5px;
    font: light 1.2rem "Righteous";
    padding: 0.5em 2em;
`
export default function VehicleCard({ vehicle }: CardProps) {
    const router = useRouter()
    return (
        <Card onClick={() => router.push('/vehicle/detail/[id]', `/vehicle/detail/${vehicle.id}`)
        }>
            <CardImage alt="user car" src={vehicle?.mainPicture ? vehicle?.mainPicture : "/placeholders/car-placeholder.png"} />
            <CardDetails style={{ textAlign: "center" }}>
                <>
                    <CardBrandImage alt="car brand" src={vehicle?.model?.make?.icon?.url ? vehicle?.model?.make?.icon?.url : "/placeholders/car-brand-placeholder.png"} />
                </>
                <h3>{vehicle?.model?.make?.name ? vehicle?.model?.make?.name : ""}</h3>
                <h3>{vehicle?.model?.name ? vehicle?.model?.name : ""}</h3>
            </CardDetails>

            <CardDetails>
                <p><span>Placa:</span> {vehicle?.licensePlate ? vehicle?.licensePlate : ""}</p>
                <p><span>Año:</span> {vehicle?.year ? vehicle?.year : ""}</p>
                <p><span>Color:</span>  {vehicle?.colorExterior?.name ? vehicle?.colorExterior?.name : ""}</p>
            </CardDetails>

            <AdditionalInfo>
                <span>Verificado <AiFillCheckCircle size="1.3em" /> </span>
                <EditButton onClick={(e) => {
                    e.stopPropagation()
                    router.push('/vehicle/edit/[id]', `/vehicle/edit/${vehicle.id}`)
                }} styles={{ fontSize: "1.3rem", padding: "0.5em 2em" }}>Editar</EditButton>
            </AdditionalInfo>
        </Card>
    )

}