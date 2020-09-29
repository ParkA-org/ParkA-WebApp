import { useState } from "react"
import { Container, StyledInput, ElementContainer, CheckboxContainer, StyledSelect, StyledImage, LeftSection, RightSection, DayCheckboxContainer, HourPickerContainer } from "./styles"
import MoneyIcon from "components/Icons/Money"
import { DatePicker } from "rsuite";
import { BsArrowRight } from "react-icons/bs"

type ElementProps = {
    name: string;
    children?: JSX.Element;
}

type DayCheckProps = {
    id: string;
    value: number;
}

const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

function SectionElement({ name, children }: ElementProps) {
    return (
        <ElementContainer>
            <label><b>{name}</b></label>
            <div>
                {children}<StyledInput type="text" />
            </div>
        </ElementContainer>
    )
}

function CheckElement({ id, value }: DayCheckProps) {
    return (
        <DayCheckboxContainer>
            <input type="checkbox" id={id} name={id} value={value} />
            <label>{id.substr(0, 2)}</label>
        </DayCheckboxContainer>
    )
}

export default function ParkingForm() {

    const hourPicker = (
        <HourPickerContainer>
            <p>
                <b>Desde</b>
                <DatePicker
                    format="HH:mm"
                    ranges={[]}
                    hideMinutes={minute => minute % 15 !== 0}
                    onOk={console.log}
                />
            </p>
            <BsArrowRight size="2em" style={{ alignSelf: "center" }} />
            <p>
                <b>Hasta</b>
                <DatePicker
                    format="HH:mm"
                    ranges={[]}
                    hideMinutes={minute => minute % 15 !== 0}
                    onOk={console.log}
                />
            </p>
            <p>
                <button type="button">X</button>
            </p>
            <button>Agregar mas horas</button>
        </HourPickerContainer>
    )

    return (
        <Container>
            <LeftSection>
                <SectionElement name="Propietario" />
                <SectionElement name="Direccion" />
                <ElementContainer>
                    <label><b>Disponibilidad</b></label>
                    <b>Dias</b>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {days.map((day, idx) => CheckElement({ id: day, value: idx }))}
                    </div>
                    {hourPicker}
                </ElementContainer>
            </LeftSection>
            <RightSection>
                <SectionElement name="Sector" />
                <SectionElement name="Costo por hora">
                    <MoneyIcon />
                </SectionElement>
                <ElementContainer>
                    <label><b>Características</b></label>
                    <CheckboxContainer>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Cámara de vigilancia"></input>
                        <label><b>Cámara de vigilancia</b></label>
                    </CheckboxContainer>
                    <CheckboxContainer>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Techado"></input>
                        <label><b>Techado</b></label>
                    </CheckboxContainer>
                    <CheckboxContainer>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Seguridad 24/7"></input>
                        <label><b>Seguridad 24/7</b></label>
                    </CheckboxContainer>
                    <CheckboxContainer>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Car wash"></input>
                        <label><b>Car wash</b></label>
                    </CheckboxContainer>
                    <CheckboxContainer>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Cargador de vehículos electricos"></input>
                        <label><b>Cargador de vehículos electricos</b></label>
                    </CheckboxContainer>
                </ElementContainer>
            </RightSection>
        </Container>
    )
}