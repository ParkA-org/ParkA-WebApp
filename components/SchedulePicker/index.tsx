import { useReducer, useEffect } from "react";
import { DatePicker } from "rsuite"
import { ImCancelCircle } from "react-icons/im"
import { BsArrowRight } from "react-icons/bs"
import { ScheduleHead, StyledButton, HourPickerContainer } from "./styles"

function initState(week: string[]) {
    let obj = {}
    for (let day of week) {
        obj[day] = []
    }
    return obj
}

const getRandomInt = (max) => Math.floor(Math.random() * max)

function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return state[action.payload.day].length < 2 ? {
                ...state,
                [action.payload.day]: [...state[action.payload.day], getRandomInt(100).toString()]
            } : state
        case "decrement":
            console.log("Indice ", action.payload.index);
            return {
                ...state,
                [action.payload.day]: state[action.payload.day].filter(
                    (item, index) => index !== action.payload.index
                )
            };
        case "reset":
            return initState(action.payload.week)
        default:
            return state;
    }
}

function hourPicker() {
    return (
        <HourPickerContainer>
            <p>
                <DatePicker
                    format="HH:mm"
                    ranges={[]}
                    hideMinutes={minute => minute % 15 !== 0}
                    onOk={console.log}
                />
            </p>
            <BsArrowRight size="2em" style={{ alignSelf: "center" }} />
            <p>
                <DatePicker
                    format="HH:mm"
                    ranges={[]}
                    hideMinutes={minute => minute % 15 !== 0}
                    onOk={console.log}
                />
            </p>
            <p>
                <ImCancelCircle size="2em" color="rgb(255,0,0)" style={{ marginBottom: "0.5em" }} />
            </p>
        </HourPickerContainer>
    )
}


function ScheduleHeader({ day, dispatch }: { day: String, dispatch: any }) {
    return (
        <ScheduleHead>
            <p>{day}</p> <StyledButton type="button" onClick={() =>
                dispatch({
                    type: "increment",
                    payload: {
                        day: day
                    }
                })
            }>Agregar más horas</StyledButton>
        </ScheduleHead>
    )
}



export default function SchedulePicker({ week }: { week: string[] }) {
    const [state, dispatch] = useReducer(reducer, {}, () => initState(week));

    useEffect(() => {
        dispatch({
            type: "reset",
            payload: {
                week: week
            }
        })
    }, [week])


    return (
        <div className="scheduleContainer">
            {Object.keys(state).length > 0 ? Object.entries(state).map((item) => {
                return (
                    <div>
                        <ScheduleHeader day={item[0]} dispatch={dispatch} />
                        <ul>
                            {item[1].map((rangos, indice) => (
                                <li
                                    id={rangos}
                                    onClick={() => {
                                        dispatch({
                                            type: "decrement",
                                            payload: {
                                                day: item[0],
                                                index: indice
                                            }
                                        });
                                    }}
                                >
                                    {rangos} {indice}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            }) : <h4>Seleccione algun día de la semana</h4>}
            <style jsx>
                {`
                                .scheduleContainer {
                                    display: flex;
                                    flex-direction: column;
                                }
                            `}
            </style>
        </div>
    )
}