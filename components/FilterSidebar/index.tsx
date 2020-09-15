import { useState } from "react"
import sliderStyles from "styles/Slider.module.css"
import InputRange from 'react-input-range'
import {
    Container,
    Section,
    Tag,
    TagContainer,
    CharacteristicContainer,
    Characteristic,
    Slider,
    TimeFields
} from "./styles"

export interface Range {
    max: number;
    min: number;
}

function PriceSlider() {

    const [stateValue, setStateValue] = useState<Range | number>({ min: 25, max: 100 })

    return (
        <Slider>
            <InputRange maxValue={100} minValue={25} value={stateValue} onChange={val => setStateValue(val)} onChangeComplete={val => {
                console.log('On change completed')
                console.log(val)
            }}
                step={5}
                classNames={{
                    activeTrack: sliderStyles.inputRangeTrackActive,
                    disabledInputRange: sliderStyles.inputRangeDisabled,
                    inputRange: sliderStyles.inputRange,
                    labelContainer: sliderStyles.labelContainer,
                    maxLabel: sliderStyles.labelMax,
                    minLabel: sliderStyles.labelMin,
                    slider: sliderStyles.inputRangeSlider,
                    sliderContainer: sliderStyles.sliderContainer,
                    track: sliderStyles.inputRangeTrackBackground,
                    valueLabel: sliderStyles.valueLabel,
                }}
            />
        </Slider>
    )
}

export default function FilterSideBar() {
    return (
        <Container>
            <h2>Filtros</h2>
            <Section>
                <h3>Precio</h3>
                <PriceSlider />
            </Section>
            <Section>
                <h3>Tipo de Reserva</h3>
                <TagContainer>
                    <Tag>Horas</Tag>
                    <Tag>Dias</Tag>
                    <Tag>Semanas</Tag>
                    <Tag>Meses</Tag>
                </TagContainer>
            </Section>
            <Section>
                <h3>Disponibilidad</h3>
                <p>Fecha <TimeFields /></p>
                <p>Desde <TimeFields /> AM/PM</p>
                <p>Hasta <TimeFields /> AM/PM</p>
            </Section>
            <Section>
                <h3>Características</h3>
                <CharacteristicContainer>
                    <Characteristic>
                        <input type="checkbox" name="camara" value="camaraVigilancia" />
                        <label htmlFor="camara">Cámara de vigilancia</label>
                    </Characteristic>
                    <Characteristic>
                        <input type="checkbox" name="roof" value="techado" />
                        <label htmlFor="roof">Techado</label>
                    </Characteristic>
                    <Characteristic>
                        <input type="checkbox" name="security" value="Bike" />
                        <label htmlFor="security">Seguridad 24/7</label>
                    </Characteristic>
                    <Characteristic>
                        <input type="checkbox" name="wash" value="Bike" />
                        <label htmlFor="wash">Car Wash</label>
                    </Characteristic>
                    <Characteristic>
                        <input type="checkbox" name="electricCharger" value="Bike" />
                        <label htmlFor="electricCharger">Cargador de vehículos eléctricos</label>
                    </Characteristic>
                </CharacteristicContainer>
            </Section>
        </Container>
    )
}
