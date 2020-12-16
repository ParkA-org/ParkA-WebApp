import { Parking, Vehicle } from "utils/types"
import { Container, StyledInput, ElementContainer, CheckboxContainer, StyledImage, LeftSection, RightSection } from "./styles"
import MoneyIcon from "components/Icons/Money"
import { BsArrowRight } from "react-icons/bs"
import { formatAMPM, parseISOString } from "utils/functions"

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
    let dateObj = parseISOString(checkInDate), outDateObj = parseISOString(checkOutDate)
    return (
        <section>
            <div>
                <SectionElement name="Día" value={dateObj.toLocaleDateString('es-ES')} />
            </div>
            <h4>Horas:</h4>
            <div className="hourSection">
                <div>
                    <SectionElement name="Desde" value={formatAMPM(dateObj)} />
                </div>
                <BsArrowRight size="2em" style={{ margin: "0 2em" }} color="#333" />
                <div>
                    <SectionElement name="Hasta" value={formatAMPM(outDateObj)} />
                </div>
            </div>
            <style jsx>
                {`
                
                .hourSection {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: start;
                    width: 300px;
                }

                .hourSection > div {
                    width: auto;
                }

                    div {
                        margin-right: 0.5em;
                        width: 130px;
                    }

                    p {
                        margin-bottom: 0.5em;
                    }

                    section {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
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
                    <h3>Fecha</h3>
                    <HourPicker checkInDate={checkInDate} checkOutDate={checkOutDate} />
                </ElementContainer>

                <SectionElement name="Costo total" value={total.toString()} />
            </RightSection>
        </Container>
    )
}