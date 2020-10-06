import { useState, useReducer, useEffect } from "react"
import { Formik, Form } from "formik";
import useUser from "hooks/useUser"
import MoneyIcon from "components/Icons/Money"
import SchedulePicker from "components/SchedulePicker"
import MultipleImagePicker from "components/MultipleImagePicker"
import { CreateParkingSchema } from "utils/schemas"
import Field from "components/Field"
import { Container, ElementContainer, CheckboxContainer, CenterSection, LeftSection, RightSection, DayCheckboxContainer, } from "./styles"

type DayCheckProps = {
    id: string;
    value: number;
    dispatch: any;
}

function CheckElement({ id, value, dispatch }: DayCheckProps) {
    const handleChange = (event) => {
        const target = event.target
        const value = target.checked
        const name = target.name
        if (value) {
            dispatch({
                type: 'add_day',
                payload: {
                    day: name
                }
            })
        } else {
            dispatch({
                type: 'remove_day',
                payload: {
                    day: name
                }
            })
        }
    }
    return (
        <DayCheckboxContainer>
            <input type="checkbox" id={id} name={id} value={value} onChange={handleChange} />
            <label>{id.substr(0, 2)}</label>
        </DayCheckboxContainer>
    )
}

function initState(week: string[]) {
    let obj = {}
    if (week.length > 0) {
        for (let day of week) {
            obj[day] = []
        }
    }
    return obj
}

function reducer(state, action) {
    switch (action.type) {
        case "add_range":
            return {
                ...state,
                [action.payload.day]: [...state[action.payload.day], {
                    id: action.payload.id,
                    start: "",
                    end: ""
                }]
            }
        case "update_range":
            return {
                ...state,
                [action.payload.day]: state[action.payload.day].map(range => {
                    if (range.id === action.payload.id) {
                        return { ...action.payload.value }
                    }
                    return range
                })
            }
        case "remove_range":
            return {
                ...state,
                [action.payload.day]: state[action.payload.day].filter(
                    (item) => item.id !== action.payload.id
                )
            }
        case "add_day":
            return {
                ...state,
                [action.payload.day]: []
            }
        case "remove_day":
            let { [action.payload.day]: omit, ...res } = state
            return res
        case "reset":
            return initState(action.payload.week)
        default:
            return state;
    }
}

type RangeObject = {
    id: number;
    start?: string;
    end?: string;
}

type Parking = {
    owner?: string;
    address?: string;
    sector?: string;
}

export default function ParkingForm() {
    const { user, loading } = useUser()
    const [park, setPark] = useState<Parking>({ owner: "", address: "", sector: "" })
    const week = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

    const [state, dispatch] = useReducer(reducer, {}, initState);

    useEffect(() => {
        if (!loading) {
            setPark({ ...park, owner: `${user.name} ${user.lastname}` })
            console.log('Cargo?')
        } else {
            console.log('No ha cargado')
        }
    }, [loading, setPark])

    return (
        <Formik
            initialValues={{
                owner: "",
                address: "",
                sector: "",
                costPerHour: 50,
                file: ""
            }}
            validationSchema={CreateParkingSchema}
            onSubmit={console.log}
        >
            {({ setFieldValue, errors, touched }) => (
                <Form>
                    <Container>
                        <LeftSection>
                            <Field
                                name="owner"
                                label="Propietario"
                                errorMessage={errors.owner}
                                isTouched={touched.owner}
                                placeholder={park.owner || "Propietario"}
                            />
                            <Field
                                name="address"
                                label="Dirección"
                                errorMessage={errors.address}
                                isTouched={touched.address}
                                placeholder={park.address || "Dirección"}
                            />
                            <ElementContainer>
                                <label><b>Disponibilidad</b></label>
                                <b>Dias</b>
                                <div style={{ display: "flex", justifyContent: "space-around", width: "300px" }}>
                                    {week.map((day, idx) => <CheckElement key={day} id={day} value={idx} dispatch={dispatch} />)}
                                </div>
                                <SchedulePicker dispatch={dispatch} state={state} />
                            </ElementContainer>
                        </LeftSection>
                        <RightSection>
                            <Field
                                name="sector"
                                label="Sector"
                                errorMessage={errors.sector}
                                isTouched={touched.sector}
                                placeholder={park.sector || "Sector"}
                            />
                            <div className="iconInput">
                                <MoneyIcon />
                                <Field
                                    name="costPerHour"
                                    label="Costo por hora"
                                    errorMessage={errors.costPerHour}
                                    isTouched={touched.costPerHour}
                                    placeholder="Costo por hora"
                                />
                            </div>
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
                        <CenterSection>
                            <MultipleImagePicker />
                        </CenterSection>
                        <style jsx>
                            {`
                    .iconInput {
                        display: flex;
                        align-items: center;
                    }
                `}
                        </style>
                    </Container>
                </Form>
            )}
        </Formik>
    )
}