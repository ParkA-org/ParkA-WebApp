import { useState, useReducer, useEffect, useContext } from "react"
import { Formik, Form } from "formik";
import MoneyIcon from "components/Icons/Money"
import SchedulePicker from "components/SchedulePicker"
import ImagePicker from "components/ImagePicker"
import { CreateParkingSchema } from "utils/schemas"
import Field from "components/Field"
import { Container, ElementContainer, HeaderSection, MiddleSection, LeftSection, RightSection, DayCheckboxContainer, } from "./styles"
import { UserContext } from "context/UserContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_FEATURES } from "queries";
import { CREATE_PARKING } from "mutations"
import { FeaturesData, Coordinates } from "utils/types";
import Spinner from "components/Spinner"
import Button from "components/Button"
import { uploadMultipleImages } from "services/uploadImage"
import { useRouter } from "next/router";
import ReverseGeocode from "services/getAddress";

type DayCheckProps = {
    id: string;
    value: number;
    dispatch: any;
    presentationName: string;
}

function CheckElement({ id, value, dispatch, presentationName }: DayCheckProps) {
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
            <label>{presentationName.substr(0, 2)}</label>
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

type StateObject = {
    "sunday"?: Array<RangeObject>;
    "monday"?: Array<RangeObject>;
    "tuesday"?: Array<RangeObject>;
    "wednesday"?: Array<RangeObject>;
    "thursday"?: Array<RangeObject>;
    "friday"?: Array<RangeObject>;
    "saturday"?: Array<RangeObject>;
}


type Action =
    | {
        type: "add_range", payload:
        {
            day: string,
            id: string
        }
    }
    | {
        type: "update_range", payload: {
            id: string, day: string, value: RangeObject
        }
    }
    | { type: "remove_range", payload: { id: string, day: string } }
    | { type: "remove_day", payload: { day: string } }
    | { type: "add_day", payload: { day: string } }
    | {
        type: "reset", payload: {
            week: string[]
        }
    }

function reducer(state: StateObject, action: Action) {
    switch (action.type) {
        case "add_range":
            return {
                ...state,
                [action.payload.day]: [...state[action.payload.day], {
                    id: action.payload.id,
                    start: "",
                    finish: ""
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
            let stateCopy = {
                ...state
            }
            delete stateCopy[action.payload.day]
            return stateCopy
        case "reset":
            return initState(action.payload.week)
        default:
            return state;
    }
}

type RangeObject = {
    id: number;
    start?: string;
    finish?: string;
}

type ParkingProps = {
    coordinates: Coordinates
}

export default function ParkingForm({ coordinates }: ParkingProps) {
    const { token } = useContext(UserContext)
    const router = useRouter()
    const [geocodeData, setGeocodeData] = useState({
        sector: "",
        address: ""
    })
    const presentationalWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    const week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
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
        if (coordinates.lat !== 0)
            ReverseGeocode(`${coordinates.lat},${coordinates.lng}`, setGeocodeData)
    }, [coordinates])

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                countParking: 1,
                latitude: `${coordinates.lat}`,
                longitude: `${coordinates.lng}`,
                parkingName: "",
                priceHours: 50,
                pictures: ["as", "as"],
                mainPicture: "asd",
                sector: `${geocodeData.sector}`,
                direction: `${geocodeData.address}`,
                information: "",
                features: []
            }}
            validationSchema={CreateParkingSchema}
            onSubmit={(values) => {
                let modifiedState = {}
                for (let [key, range] of Object.entries(state)) {
                    modifiedState[key] = range.map((value: RangeObject) => {
                        return { start: value.start, finish: value.finish }
                    })
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
                                    "priceHours": parseFloat(values.priceHours.toString()),
                                    "information": values.information,
                                    "sector": values.sector,
                                    "direction": values.direction,
                                    "features": values.features,
                                    "calendar": modifiedState,
                                    "pictures": urls,
                                    "mainPicture": urls[0]
                                }
                            }
                        })
                    })
                    .catch(error => console.error(error))
            }}
        >
            {({ setFieldValue, errors, touched, values }) => (
                <Form>
                    <Container>
                        <HeaderSection>
                            <h2>Registro de parqueos</h2>
                        </HeaderSection>
                        <LeftSection>
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
                                value={values.direction}
                                placeholder="Dirección"
                            />
                            <ElementContainer>
                                <label><b>Disponibilidad</b></label>
                                <b>Dias</b>
                                <div style={{ display: "flex", justifyContent: "space-around", width: "300px" }}>
                                    {week.map((day, idx) => <CheckElement key={day} id={day} value={idx} dispatch={dispatch} presentationName={presentationalWeek[idx]} />)}
                                </div>
                                <SchedulePicker dispatch={dispatch} state={state} />
                            </ElementContainer>
                        </LeftSection>
                        <MiddleSection>
                            <Field
                                name="sector"
                                label="Sector"
                                errorMessage={errors.sector}
                                isTouched={touched.sector}
                                placeholder="Sector"
                                value={values.sector}
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
                                                    inputStyles={{ width: "auto" }}
                                                />
                                            )
                                        })}

                                    </div>
                                </>}
                        </MiddleSection>
                        <RightSection>
                            <ImagePicker placement="vertical" setFiles={setFiles} />
                            <Button submit={false}>Crear parqueo</Button>
                        </RightSection>
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