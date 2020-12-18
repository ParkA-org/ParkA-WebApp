import { useRef } from "react"
import { useQuery } from "@apollo/client"
import { Parking, Vehicle, ReservationInput } from "utils/types"
import { GET_ALL_VEHICLES } from "queries"
import { Container, StyledInput, ElementContainer, CheckboxContainer, StyledSelect, StyledImage, LeftSection, RightSection } from "./styles"
import MoneyIcon from "components/Icons/Money"
import HourPicker from "components/HourPicker"

type ElementProps = {
    name: string;
    children?: JSX.Element;
    value?: string;
}

type ComponentProps = {
    parking: Parking
    checkout: ReservationInput;
    setCheckout: React.Dispatch<React.SetStateAction<ReservationInput>>;
}

type AllVehiclesData = {
    getAllUserVehicles: Vehicle[]
}

function SectionElement({ name, children, value }: ElementProps) {
    return (
        <ElementContainer>
            <label><b>{name}</b></label>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", maxWidth: "250px" }}>
                {children}<StyledInput type="text" value={value} />
            </div>
        </ElementContainer>
    )
}

export default function ReservationDetail({ parking, checkout, setCheckout }: ComponentProps) {

    const { loading, error, data } = useQuery<AllVehiclesData>(GET_ALL_VEHICLES, {
        onCompleted() {
            if (data && data.getAllUserVehicles.length) {
                setCheckout({ ...checkout, vehicle: data.getAllUserVehicles[0].id })
            }
        }
    })
    const imgRef = useRef(null)

    return (
        <Container>
            <LeftSection>
                <SectionElement name="Nombre" value={parking.parkingName} />
                {parking.features.length > 0 ?
                    <ElementContainer>
                        <label><b>Características</b></label>
                        {parking.features.map(feature => (
                            <CheckboxContainer key={feature.id}>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value={feature.name} checked={true}></input>
                                <label><b>{feature.name}</b></label>
                            </CheckboxContainer>
                        ))}
                    </ElementContainer>
                    : null}
                <SectionElement name="Costo por hora" value={parking.priceHours}>
                    <MoneyIcon />
                </SectionElement>
                <ElementContainer>
                    <label><b>Vehiculos</b></label>
                    {loading && <h3>Loading user vehicles...</h3>}
                    {data && data.getAllUserVehicles && data.getAllUserVehicles.length > 0 ?
                        (
                            <>
                                <StyledSelect onChange={e => {
                                    const { target } = e
                                    const { value } = target
                                    const imgUrl = data.getAllUserVehicles.find(vehicle => vehicle.id === value).mainPicture
                                    imgRef.current.src = imgUrl
                                }} >
                                    {data && data.getAllUserVehicles.map(vehicle => <option key={vehicle.id} value={vehicle.id} data-image={vehicle.mainPicture}>{vehicle.model.name}</option>)}
                                </StyledSelect>
                                <StyledImage src={data.getAllUserVehicles[0].mainPicture} ref={imgRef} />
                            </>
                        )
                        : <p>No tienes ningun vehiculo registrado</p>}
                </ElementContainer>
            </LeftSection>
            <RightSection>
                <ElementContainer>
                    <label><b>Horas</b></label>
                    <HourPicker hourPrice={parseInt(parking.priceHours)} checkout={checkout} setCheckout={setCheckout} calendar={parking.calendar} />
                </ElementContainer>

                <SectionElement name="Total de horas" value={checkout.total ? checkout.total.toString() : "0"} />
            </RightSection>
        </Container>
    )
}