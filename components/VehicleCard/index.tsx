import { AiFillCheckCircle } from "react-icons/ai"
import { useRouter } from "next/router"
import Button from "components/Button"
import NavigationLink from "components/NavigationLink"
import {
    Card,
    CardImage,
    CardDetails,
    AdditionalInfo,
    CardBrandImage
} from "./styles"

export default function VehicleCard() {
    const router = useRouter()


    return (
        <Card onClick={() => router.push("/vehicle/detail")}>
            <CardImage alt="user car" src="../placeholders/car-placeholder.png" />
            <CardDetails>
                <>
                    <CardBrandImage alt="user car brand" src="../placeholders/car-brand-placeholder.png" />
                    <h3>Tesla</h3>
                </>
                <h3>Model S</h3>
            </CardDetails>

            <CardDetails>
                <p><span>Placa:</span> 13DACE</p>
                <p><span>Año:</span> 2020</p>
                <p><span>Color:</span> Blanco</p>
            </CardDetails>

            <AdditionalInfo>
                <span>Verificado <AiFillCheckCircle size="1.3em" /> </span>
                <NavigationLink href="/vehicle/edit">
                    <Button>Editar</Button>
                </NavigationLink>
            </AdditionalInfo>
        </Card>
    )
}