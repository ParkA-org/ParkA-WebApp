import { Parking, Vehicle } from "utils/types"
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
    parking: Parking;
    vehicle: Vehicle;
    checkInDate: string;
    checkOutDate: string;
    total: number;
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

type HourPickerProps = {
    checkInDate: string;
    checkOutDate: string;
}

function HourPicker({ checkInDate, checkOutDate }: HourPickerProps): JSX.Element {

    return (
        <section>
            <div>
                <p>Desde</p>
                <DatePicker
                    format="YYYY-MM-DD HH:mm"
                    defaultValue={new Date(checkInDate)}
                />
            </div>
            <BsArrowRight size="2em" style={{ alignSelf: "flex-end" }} />
            <div>
                <p>Hasta</p>
                <DatePicker
                    format="HH:mm"
                    defaultValue={new Date(checkOutDate)}
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
}

export default function ReservationView({ parking, vehicle, checkInDate, checkOutDate, total }: ComponentProps) {

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
                    <>
                        <h3>{vehicle.alias}</h3>
                        <StyledImage src={vehicle.mainPicture} />
                    </>

                </ElementContainer>
            </LeftSection>
            <RightSection>
                <ElementContainer>
                    <label><b>Horas</b></label>
                    <HourPicker checkInDate={checkInDate} checkOutDate={checkOutDate} />
                </ElementContainer>

                <SectionElement name="Costo total" value={total.toString()} />
            </RightSection>
        </Container>
    )
}