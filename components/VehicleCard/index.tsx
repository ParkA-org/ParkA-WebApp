import Button from "components/Button"
import {
    Card,
    CardImage,
    CardDetails,
    AdditionalInfo
} from "./styles"

export default function VehicleCard() {
    return (
        <Card>
            <CardImage alt="user car" src="./placeholders/image-placeholder.png" />
            <CardDetails>
                <h3>Tesla</h3>
                <h3>Model S</h3>
            </CardDetails>

            <CardDetails>
                <p><span>Placa:</span> 13DACE</p>
                <p><span>Año:</span> 2020</p>
                <p><span>Color:</span> Blanco</p>
            </CardDetails>

            <AdditionalInfo>
                <span>Verificado</span>
                <Button>Editar</Button>
            </AdditionalInfo>
        </Card>
    )
}