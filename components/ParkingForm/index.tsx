import { useState, useRef, useReducer, useEffect } from "react"
import { Formik, Form } from "formik";
import useUser from "hooks/useUser"
import MoneyIcon from "components/Icons/Money"
import SchedulePicker from "components/SchedulePicker"
import { CreateParkingSchema } from "utils/schemas"
import Field from "components/Field"
import { Container, ElementContainer, CheckboxContainer, CenterSection, LeftSection, RightSection, DayCheckboxContainer, ImageSquare } from "./styles"

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

const DRAG_IMAGE_STATES = {
    ERROR: -1,
    NONE: 0,
    DRAG_OVER: 1,
    UPLOADING: 2,
    COMPLETE: 3,
}

function ImagePreview({ file }: { file: File }) {
    const imgEl = useRef(null)
    const reader = new FileReader()
    reader.addEventListener(
        "load",
        function () {
            imgEl.current.src = reader.result
        },
        false
    )
    if (file)
        reader.readAsDataURL(file);
    else
        console.log('No file')

    return (
        <ImageSquare ref={imgEl} alt="uploaded image" src="../icons/cameraIcon.svg" />
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

    const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
    const [previewImages, setPreviewImages] = useState([])
    const handleDragEnter = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATES.NONE)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATES.NONE)
        let images = []
        for (let i = 0; i < e.dataTransfer.files.length && i < 5; i++) {
            let file = e.dataTransfer.files[i]
            images = [...images, <ImagePreview file={file} />]
        }
        setPreviewImages(images)
    }

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
                                    {week.map((day, idx) => <CheckElement id={day} value={idx} dispatch={dispatch} />)}
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
                            <h2>Agregar imágenes</h2>
                            <textarea
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={(event) => event.preventDefault()}
                                onDrop={handleDrop}
                                placeholder="Arrastre hasta 5 imágenes de su parqueo"
                            ></textarea>
                            <div className="imagezone">
                                {previewImages}
                            </div>
                        </CenterSection>
                        <style jsx>
                            {`
                    .iconInput {
                        display: flex;
                        align-items: center;
                    }
                    textarea {
                        border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
                                    ? "3px dashed #09f"
                                    : "3px solid #333"};
                        font-size: 21px;
                        min-height: 200px;
                        padding: 15px;
                        outline: 0;
                        resize: none;
                        width: 100%;
                      }
                      .imagezone {
                          width: 100%;
                          height: auto;
                          display: flex;
                          justify-content: space-around;
                      }
                `}
                        </style>
                    </Container>
                </Form>
            )}
        </Formik>
    )
}