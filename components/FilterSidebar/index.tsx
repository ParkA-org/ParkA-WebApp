import { useState, useEffect } from "react"
import sliderStyles from "styles/Slider.module.css"
import InputRange from 'react-input-range'
import { DatePicker } from "rsuite"
import {
    Container,
    Section,
    Tag,
    TagContainer,
    CharacteristicContainer,
    Characteristic,
    Slider
} from "./styles"
import { GET_FEATURES } from "queries"
import { useQuery } from "@apollo/client"
import { FeaturesData } from "utils/types"

export interface Range {
    max: number;
    min: number;
}

function PriceSlider({ setFilterObject, filterObject }: { setFilterObject: any, filterObject: any }) {

    const [stateValue, setStateValue] = useState<Range | number>({ min: 0, max: 200 })

    return (
        <Slider>
            <InputRange maxValue={200} minValue={0} value={stateValue} onChange={val => setStateValue(val)} onChangeComplete={val => {
                setFilterObject({ ...filterObject, priceHours_lte: val['max'], priceHours_gte: val['min'] })
            }}
                step={10}
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

export default function FilterSideBar({ refetch }) {

    const [filterObject, setFilterObject] = useState({
        features_in: [],
        priceHours_lte: 200,
        priceHours_gte: 0
    })

    const { loading, error, data } = useQuery<FeaturesData>(GET_FEATURES);

    const handleCheckboxes = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value
        const checked = target.checked
        if (checked) {
            setFilterObject({ ...filterObject, features_in: [...filterObject.features_in, value] })
        } else {
            setFilterObject({ ...filterObject, features_in: filterObject.features_in.filter(feature => feature !== value) })
        }
    }

    useEffect(() => { }, [data])

    useEffect(() => {
        let actualFilterObject = { ...filterObject }
        for (const [key, value] of Object.entries(actualFilterObject)) {
            if (typeof actualFilterObject[key] === "object") {
                if (actualFilterObject[key].length === 0)
                    delete actualFilterObject[key]
            }
        }
        console.log(JSON.stringify(actualFilterObject))
        refetch({
            filterV:
            {
                where: {
                    ...actualFilterObject
                }
            }
        })
    }, [filterObject])

    return (
        <Container>
            <h2>Filtros</h2>
            <Section>
                <h3>Precio</h3>
                <PriceSlider setFilterObject={setFilterObject} filterObject={filterObject} />
            </Section>
            <Section>
                <h3>Tipo de Reserva</h3>
                <TagContainer>
                    <Tag onClick={() => refetch({
                        filterV:
                        {
                            where: {
                                priceHours_gte: 200
                            }
                        }
                    })}>Horas</Tag>
                    <Tag>Dias</Tag>
                    <Tag>Semanas</Tag>
                    <Tag>Meses</Tag>
                </TagContainer>
            </Section>
            <Section>
                <h3>Disponibilidad</h3>
                <p>Fecha <DatePicker style={{ width: "auto" }} placement="topStart" /> </p>
                <p>Desde   <DatePicker
                    format="HH:mm"
                    ranges={[]}
                    hideMinutes={minute => minute % 15 !== 0}
                    placement="topStart"
                /></p>
                <p>Hasta  <DatePicker
                    format="HH:mm"
                    ranges={[]}
                    hideMinutes={minute => minute % 15 !== 0}
                    placement="topStart"
                /></p>
            </Section>
            <Section>
                <h3>Características</h3>
                {loading && <h3>Cargando características</h3>}
                {data &&
                    <CharacteristicContainer>
                        {data.getAllFeatures.map(feature => {
                            return (
                                <Characteristic>
                                    <input type="checkbox" name="features_in" value={feature.id} onClick={handleCheckboxes} />
                                    <label htmlFor={feature.name}>{feature.name}</label>
                                </Characteristic>
                            )
                        })}
                    </CharacteristicContainer>
                }
            </Section>
            <style jsx>
                {`
                    .rs-picker-menu {
                        z-index: 32;
                    }
                `}
            </style>
        </Container>
    )
}
