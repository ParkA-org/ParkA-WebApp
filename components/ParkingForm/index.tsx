import { useState, useReducer, useEffect, useContext } from "react"
import { Formik, Form } from "formik";
import MoneyIcon from "components/Icons/Money"
import SchedulePicker from "components/SchedulePicker"
import MultipleImagePicker from "components/MultipleImagePicker"
import { CreateParkingSchema } from "utils/schemas"
import Field from "components/Field"
import { Container, ElementContainer, CheckboxContainer, CenterSection, LeftSection, RightSection, DayCheckboxContainer, } from "./styles"
import { UserContext } from "context/UserContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_FEATURES } from "queries";
import { CREATE_PARKING } from "mutations"
import { FeaturesData, Coordinates } from "utils/types";
import Spinner from "components/Spinner"
import Button from "components/Button"
import { uploadMultipleImages } from "services/uploadImage"
import { useRouter } from "next/router";

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

type ParkingProps = {
    coordinates: Coordinates
}

export default function ParkingForm({ coordinates }: ParkingProps) {
    const { token } = useContext(UserContext)
    const router = useRouter()
    const week = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    const [files, setFiles] = useState([])
    const [state, dispatch] = useReducer(reducer, {}, initState);
    const { loading: featuresLoading, error: featuresError, data: featuresData } = useQuery<FeaturesData>(GET_FEATURES);
    const [CreateParking] = useMutation(CREATE_PARKING, {
        onCompleted() {
            router.push('/parking')
        },
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    })

    useEffect(() => {
        console.log('Cambiaron coordenadas')
        console.log(coordinates)
    }, [coordinates])

    return (
        <Formik
            initialValues={{
                countParking: 1,
                latitude: `${coordinates.lat}`,
                longitude: `${coordinates.lng}`,
                parkingName: "",
                priceHours: 50,
                pictures: ["as", "as"],
                mainPicture: "asd",
                sector: "",
                direction: "",
                information: "",
                features: []
            }}
            validationSchema={CreateParkingSchema}
            onSubmit={(values) => {
                const daysAvailable = []

                for (const key in state) {
                    daysAvailable.push(key)
                }

                uploadMultipleImages(files)
                    .then(response => {
                        return response.data
                    }).then(results => {
                        let urls = results?.map(obj => obj.url)
                        CreateParking({
                            variables: {
                                cpInput: {
                                    "countParking": parseFloat(values.countParking.toString()),
                                    "latitude": `${coordinates.lat}`,
                                    "longitude": `${coordinates.lng}`,
                                    "parkingName": values.parkingName,
                                    "priceHours": `${values.priceHours}`,
                                    "information": values.information,
                                    "sector": values.sector,
                                    "direction": values.direction,
                                    "features": values.features,
                                    "calendar": daysAvailable,
                                    "pictures": urls,
                                    "mainPicture": urls[0]
                                }
                            }
                        })
                    })
                    .catch(error => console.error(error))
            }}
        >
            {({ setFieldValue, errors, touched }) => (
                <Form>
                    <Container>
                        <LeftSection>
                            <h2>Registro de parqueos</h2>
                            <Field
                                name="countParking"
                                label="Cantidad de parqueos"
                                errorMessage={errors.countParking}
                                isTouched={touched.countParking}
                                placeholder="Cantidad de parqueos"
                            />
                            <Field
                                name="parkingName"
                                label="Nombre de parqueo"
                                errorMessage={errors.parkingName}
                                isTouched={touched.parkingName}
                                placeholder="Nombre de parqueo"
                            />
                            <Field
                                name="direction"
                                label="Dirección"
                                errorMessage={errors.direction}
                                isTouched={touched.direction}
                                placeholder="Dirección"
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
                                placeholder="Sector"
                            />
                            <div className="iconInput">
                                <MoneyIcon />
                                <Field
                                    name="priceHours"
                                    label="Costo por hora"
                                    errorMessage={errors.priceHours}
                                    isTouched={touched.priceHours}
                                    placeholder="Costo por hora"
                                />
                            </div>

                            <Field
                                label="Informaciones adicionales"
                                name="information"
                                placeholder="Informaciones adicionales..."
                                component="textarea"
                            />

                            {featuresLoading ? <Spinner /> :
                                <>
                                    <div id="checkbox-group">
                                        <h4>Caracteristicas</h4>
                                    </div>
                                    <div role="group" aria-labelledby="checkbox-group">
                                        {featuresData.getAllFeatures.map(feature => {
                                            return (
                                                <Field
                                                    name="features"
                                                    type="checkbox"
                                                    label={feature.name}
                                                    value={feature.id}
                                                />
                                            )
                                        })}

                                    </div>
                                </>}
                        </RightSection>
                        <CenterSection>
                            <MultipleImagePicker setFiles={setFiles} />
                            <Button submit={true}>Crear parqueo</Button>
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