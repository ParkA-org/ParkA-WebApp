import { useState } from "react"
import { Container, StyledInput, ElementContainer, CheckboxContainer, StyledSelect, StyledImage, LeftSection, RightSection } from "./styles"
import MoneyIcon from "components/Icons/Money"
import { DatePicker } from "rsuite";
import { BsArrowRight } from "react-icons/bs"

type ElementProps = {
    name: string;
    children?: JSX.Element;
}

function SectionElement({ name, children }: ElementProps) {
    return (
        <ElementContainer>
            <label><b>{name}</b></label>
            {children}<StyledInput type="text" />
        </ElementContainer>
    )
}

export default function ReservationDetail() {

    const hourPicker = (
        <div className="container">
            <p>
                <b>Desde</b>
                <DatePicker
                    format="HH:mm"
                    ranges={[]}
                    disabledHours={(hour) => {
                        if (hour === 16) return true;
                        else return false;
                    }}
                />
            </p>
            <BsArrowRight size="2em" />
            <p>
                <b>Hasta</b>
                <DatePicker
                    format="HH:mm"
                    ranges={[]}
                    disabledHours={(hour) => {
                        if (hour === 16) return true;
                        else return false;
                    }}
                    onOk={event => console.log(event)}
                />
            </p>
            <style jsx>
                {`
                    p {
                        display: flex;
                        flex-direction: column;
                        width: 8vw;
                        height: auto
                        margin-right: 0.5em;
                    }

                    b {
                        margin-bottom: 0.5em;
                    }

                    .container {
                        text-align: center;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }
                `}
            </style>
        </div>
    )



    return (
        <Container>
            <LeftSection>
                <SectionElement name="Parqueo" />
                <SectionElement name="Fecha" />
                <ElementContainer>
                    <label><b>Horas</b></label>
                    {hourPicker}

                </ElementContainer>
                <ElementContainer>
                    <label><b>Caracteristicas</b></label>
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
            </LeftSection>
            <RightSection>
                <ElementContainer>
                    <label><b>Vehiculos</b></label>
                    <StyledSelect>
                        <option>Audi</option>
                        <option>BMW</option>
                        <option>Mustang</option>
                    </StyledSelect>
                    <StyledImage src="../placeholders/image-placeholder.png" />
                </ElementContainer>
                <SectionElement name="Costo por hora">
                    <MoneyIcon />
                </SectionElement>
                <SectionElement name="Horas Totales" />
                <SectionElement name="Subtotal">
                    <MoneyIcon />
                </SectionElement>
            </RightSection>
        </Container>
    )
}