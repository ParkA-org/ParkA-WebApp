import { AiFillCheckCircle } from "react-icons/ai"
import { useRouter } from "next/router"
import Button from "components/Button"
import NavigationLink from "components/NavigationLink"
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

export default function VehicleCard({ vehicle }: CardProps) {
    const router = useRouter()
    return (

        <Card onClick={() => router.push("/vehicle/detail")
        }>
            <CardImage alt="user car" src={vehicle?.mainPicture ? vehicle?.mainPicture : "../placeholders/car-placeholder.png"} />
            <CardDetails>
                <>
                    <CardBrandImage alt="car brand" src={vehicle?.model?.make?.icon?.url ? vehicle?.model?.make?.icon?.url : "../placeholders/car-brand-placeholder.png"} />
                </>
                <h3>{vehicle?.model?.name ? vehicle?.model?.name : "Model S"}</h3>
            </CardDetails>

            <CardDetails>
                <p><span>Placa:</span> {vehicle?.licensePlate ? vehicle?.licensePlate : "13DACE"}</p>
                <p><span>Año:</span> {vehicle?.year ? vehicle?.year : "2020"}</p>
                <p><span>Color:</span>  {vehicle?.colorExterior?.name ? vehicle?.colorExterior?.name : "Blanco"}</p>
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