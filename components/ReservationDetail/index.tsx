import { useRef, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { Parking, Vehicle } from "utils/types"
import { GET_ALL_VEHICLES } from "queries"
import { Container, StyledInput, ElementContainer, CheckboxContainer, StyledSelect, StyledImage, LeftSection, RightSection } from "./styles"
import MoneyIcon from "components/Icons/Money"
import { DatePicker } from "rsuite";
import { BsArrowRight } from "react-icons/bs"

type ElementProps = {
    name: string;
    children?: JSX.Element;
    value?: string;
}

type ComponentProps = {
    parking: Parking
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

type AllVehiclesData = {
    getAllUserVehicles: Vehicle[]
}

export default function ReservationDetail({ parking }: ComponentProps) {

    const { loading, error, data } = useQuery<AllVehiclesData>(GET_ALL_VEHICLES)
    const imgRef = useRef(null)
    useEffect(() => {
        if (data) {
            console.log(data)
        }
    }, [data])

    const hourPicker = (
        <section>
            <div>
                <p>Desde</p>
                <DatePicker
                    format="HH:mm"
                    ranges={[]}
                    hideMinutes={minute => minute % 15 !== 0}
                    onOk={console.log}
                />
            </div>
            <BsArrowRight size="2em" style={{ alignSelf: "flex-end" }} />
            <div>
                <p>Hasta</p>
                <DatePicker
                    format="HH:mm"
                    ranges={[]}
                    hideMinutes={minute => minute % 15 !== 0}
                    onOk={console.log}
                />
            </div>
            <style jsx>
                {`
                    div {
                        display: flex;
                        flex-direction: column;
                        width: 130px;
                        height: auto
                        margin-right: 0.5em;
                    }

                    p {
                        margin-bottom: 0.5em;
                    }

                    section {
                        width: 100%;
                        display: flex;
                        justify-content: space-around;
                    }
                `}
            </style>
        </section>
    )

    return (
        <Container>
            <LeftSection>
                <SectionElement name="Nombre" value={parking.parkingName} />
                <ElementContainer>
                    <label><b>Características</b></label>
                    {parking.features.map(feature => (
                        <CheckboxContainer key={feature.id}>
                            <input type="checkbox" id="vehicle1" name="vehicle1" value={feature.name} checked={true}></input>
                            <label><b>{feature.name}</b></label>
                        </CheckboxContainer>
                    ))}
                </ElementContainer>
                <SectionElement name="Costo por hora" value={parking.priceHours}>
                    <MoneyIcon />
                </SectionElement>
                <ElementContainer>
                    <label><b>Vehiculos</b></label>
                    {loading && <h3>Loading user vehicles...</h3>}
                    <StyledSelect onChange={e => {
                        const { target } = e
                        const { value } = target
                        const imgUrl = data.getAllUserVehicles.find(vehicle => vehicle.id === value).mainPicture
                        imgRef.current.src = imgUrl
                    }} >
                        {data && data.getAllUserVehicles.map(vehicle => <option key={vehicle.id} value={vehicle.id} data-image={vehicle.mainPicture}>{vehicle.model.name}</option>)}
                    </StyledSelect>
                    <StyledImage src={data.getAllUserVehicles[0].mainPicture} ref={imgRef} />
                </ElementContainer>
            </LeftSection>
            <RightSection>

                <SectionElement name="Fecha" />
                <ElementContainer>
                    <label><b>Horas</b></label>
                    {hourPicker}
                </ElementContainer>

                <SectionElement name="Total de horas" />
            </RightSection>
        </Container>
    )
}