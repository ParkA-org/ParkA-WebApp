import { useState, useReducer, useContext, useEffect } from "react"
import { Formik, Form } from "formik";
import MoneyIcon from "components/Icons/Money"
import SchedulePicker from "components/SchedulePicker"
import ImagePicker from "components/ImagePicker"
import { EditParkingSchema } from "utils/schemas"
import Field from "components/Field"
import { Container, ElementContainer, MiddleSection, LeftSection, RightSection, DayCheckboxContainer, HeaderSection } from "./styles"
import { UserContext } from "context/UserContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_FEATURES } from "queries";
import { EDIT_PARKING } from "mutations"
import { FeaturesData, Parking, Calendar } from "utils/types";
import Spinner from "components/Spinner"
import Button from "components/Button"
import { uploadMultipleImages } from "services/uploadImage"
import { useRouter } from "next/router";

type DayCheckProps = {
    id: string;
    value: number;
    dispatch: any;
    presentationName: string;
    checked?: boolean;
}

function CheckElement({ id, value, dispatch, presentationName, checked }: DayCheckProps) {
    const [isChecked, setCheck] = useState(checked)
    const handleClick = (event) => {
        const target = event.target
        const value = target.checked
        const name = target.name
        setCheck(value)
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
            <input type="checkbox" id={id} name={id} value={value} onClick={handleClick} checked={isChecked} />
            <label>{presentationName.substr(0, 2)}</label>
        </DayCheckboxContainer>
    )
}

function initStateWithData(initialState: Calendar) {
    const week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    let obj = {}
    if (week.length > 0) {
        for (let day of week) {
            obj[day] = initialState[day]
        }
    }
    return obj
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

const getRandomInt = (max) => Math.floor(Math.random() * max)

type Action =
    | { type: "add_range", payload: { day: string, id: string } }
    | { type: "update_range", payload: { id: string, day: string, value: RangeObject } }
    | { type: "remove_range", payload: { id: string, day: string } }
    | { type: "remove_day", payload: { day: string } }
    | { type: "add_day", payload: { day: string } }
    | { type: "reset", payload: { week: string[] } }
    | { type: "update_state", payload: { calendar: Calendar } }

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
                [action.payload.day]: [{ id: getRandomInt(10000).toString(), start: 1200, finish: 1400 }]
            }
        case "remove_day":
            let stateCopy = {
                ...state
            }
            delete stateCopy[action.payload.day]
            return stateCopy
        case "update_state":
            return initStateWithData(action.payload.calendar)
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


export default function ParkingForm({ parkingName, countParking, calendar, priceHours, pictures, mainPicture, information, features, id }: Parking) {
    const { token } = useContext(UserContext)
    const router = useRouter()
    const presentationalWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    const week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const [files, setFiles] = useState([])
    const [state, dispatch] = useReducer(reducer, week, initState);
    const { loading: featuresLoading, error: featuresError, data: featuresData } = useQuery<FeaturesData>(GET_FEATURES);
    const [EditParking] = useMutation(EDIT_PARKING, {
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
        if (calendar) {
            dispatch({
                type: 'update_state',
                payload: {
                    calendar: calendar
                }
            })
        }
    }, [calendar])

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                countParking,
                parkingName,
                priceHours,
                pictures,
                mainPicture,
                information,
                features
            }}
            validationSchema={EditParkingSchema}
            onSubmit={(values) => {
                let modifiedState = {}
                for (let [key, range] of Object.entries(state as Record<string, RangeObject[]>)) {
                    modifiedState[key] = range.map((value: RangeObject) => {
                        return { start: value.start, finish: value.finish }
                    })
                }

                if (files.length > 0) {
                    uploadMultipleImages(files)
                        .then(response => {
                            return response.data
                        }).then(results => {
                            let urls = results?.map(obj => obj.url)
                            urls = [...urls, ...pictures]
                            let newFeatures = values.features.filter(feature => feature.id !== null)
                            EditParking({
                                variables: {
                                    epi: {
                                        "id": id,
                                        "countParking": parseFloat(values.countParking.toString()),
                                        "parkingName": values.parkingName,
                                        "priceHours": values.priceHours.toString(),
                                        "information": values.information,
                                        "features": newFeatures.map(feature => feature.id),
                                        "calendar": modifiedState,
                                        "pictures": urls,
                                        "mainPicture": urls[0]
                                    }
                                }
                            })
                        })
                } else {
                    let newFeatures = values.features.filter(feature => feature.id !== null)
                    EditParking({
                        variables: {
                            epi: {
                                "id": id,
                                "countParking": parseFloat(values.countParking.toString()),
                                "parkingName": values.parkingName,
                                "priceHours": values.priceHours.toString(),
                                "information": values.information,
                                "features": newFeatures.map(feature => feature.id),
                                "calendar": modifiedState,
                                "pictures": pictures,
                                "mainPicture": pictures[0]
                            }
                        }
                    })
                }
            }}
        >
            {({ setFieldValue, errors, touched, values }) => (
                <Form>
                    <Container>
                        <HeaderSection>
                            <h2>Editar parqueo</h2>
                        </HeaderSection>
                        <LeftSection>
                            <Field
                                name="countParking"
                                label="Cantidad de parqueos"
                                errorMessage={errors.countParking}
                                isTouched={touched.countParking}
                                placeholder="Cantidad de parqueos"
                                value={values.countParking ? values.countParking.toString() : ""}
                            />
                            <Field
                                name="parkingName"
                                label="Nombre de parqueo"
                                errorMessage={errors.parkingName}
                                isTouched={touched.parkingName}
                                placeholder="Nombre de parqueo"
                                value={values.parkingName}
                            />
                            <ElementContainer>
                                <label><b>Disponibilidad</b></label>
                                <b>Dias</b>
                                <div style={{ display: "flex", justifyContent: "space-around", width: "300px" }}>
                                    {week.map((day, idx) => <CheckElement key={day} id={day} value={idx} dispatch={dispatch} presentationName={presentationalWeek[idx]} checked={calendar[day].length > 0 ? true : false} />)}
                                </div>
                                <SchedulePicker dispatch={dispatch} state={state} />
                            </ElementContainer>
                        </LeftSection>
                        <MiddleSection>
                            <div className="iconInput">
                                <MoneyIcon />
                                <Field
                                    name="priceHours"
                                    label="Costo por hora"
                                    errorMessage={errors.priceHours}
                                    isTouched={touched.priceHours}
                                    placeholder="Costo por hora"
                                    value={values.priceHours}
                                />
                            </div>

                            <Field
                                label="Informaciones adicionales"
                                name="information"
                                placeholder="Informaciones adicionales..."
                                component="textarea"
                                value={values.information}
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
                                                    checked={values.features.filter(curFeature => curFeature.id === feature.id).length > 0 ? true : false}
                                                    inputStyles={{ width: "auto" }}
                                                />
                                            )
                                        })}

                                    </div>
                                </>}
                        </MiddleSection>
                        <RightSection>
                            <ImagePicker placement="vertical" setFiles={setFiles} pictures={pictures} />
                            <Button submit={false}>Editar parqueo</Button>
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
            )
            }
        </ Formik >
    )
}