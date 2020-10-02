import { useReducer, useEffect, useState } from "react";
import { DatePicker } from "rsuite"
import { ImCancelCircle } from "react-icons/im"
import { BsArrowRight, BsCheck } from "react-icons/bs"
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
            };
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

function HourPicker({ day, item, dispatch }: { day: string, item: RangeObject, dispatch: any }) {
    const [value, setValue] = useState<RangeObject>(item)
    return (
        <HourPickerContainer>
            <div>
                <DatePicker
                    format="HH:mm"
                    ranges={[]}
                    hideMinutes={minute => minute % 15 !== 0}
                    placement="topStart"
                    placeholder={value.start}
                    onOk={(date) => {
                        let start = `${date.getHours()}:${date.getMinutes()}`
                        setValue({ ...value, "start": start })
                    }}
                />
            </div>
            <BsArrowRight size="2em" style={{ alignSelf: "center" }} />
            <div>
                <DatePicker
                    format="HH:mm"
                    ranges={[]}
                    hideMinutes={minute => minute % 15 !== 0}
                    placement="topStart"
                    placeholder={value.end}
                    onOk={(date) => {
                        let end = `${date.getHours()}:${date.getMinutes()}`
                        setValue({ ...value, "end": end })
                    }}
                />
            </div>
            <div>
                <ImCancelCircle size="2em" color="rgb(255,0,0)" style={{ marginBottom: "0.5em" }} onClick={() => {
                    dispatch({
                        type: "remove_range",
                        payload: {
                            day: day,
                            id: value.id
                        }
                    });
                }} />
                <button type="button" style={{ marginBottom: "0.5em" }} onClick={() => {
                    console.log('CLICK EN CHECK')
                    dispatch({
                        type: "update_range",
                        payload: {
                            day: day,
                            id: item.id,
                            value: value
                        }
                    });
                }}>Actualizar</button>
            </div>
        </HourPickerContainer>
    )
}


function ScheduleHeader({ day, dispatch, size }: { day: String, dispatch: any, size: number }) {
    return (
        <ScheduleHead>
            <p>{day}</p> <StyledButton type="button" onClick={() => {
                if (size < 2)
                    dispatch({
                        type: "add_range",
                        payload: {
                            day: day,
                            id: getRandomInt(10000).toString()
                        }
                    })
            }
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
                    <div key={item[0]}>
                        <ScheduleHeader day={item[0]} dispatch={dispatch} size={item[1].length} />
                        <ul>
                            {item[1].map((rangos, indice) => {
                                return (
                                    <li key={getRandomInt(1000)}>
                                        <HourPicker day={item[0]} item={rangos} dispatch={dispatch} />
                                    </li>
                                )
                            })}
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