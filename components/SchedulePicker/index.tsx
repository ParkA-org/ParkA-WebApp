import { useState } from "react";
import { DatePicker } from "rsuite"
import { ImCancelCircle } from "react-icons/im"
import { BsArrowRight, BsCheck } from "react-icons/bs"
import { ScheduleHead, StyledButton, HourPickerContainer, HourElement } from "./styles"

type RangeObject = {
    id: number;
    start?: number;
    finish?: number;
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

const lastFormatPlaceholder = (value) => `${value.substr(0, value.length / 2)}:${value.substr((value.length / 2))}`

function HourPicker({ day, item, dispatch }: { day: string, item: RangeObject, dispatch: any }) {
    const [value, setValue] = useState<RangeObject>(item)
    return (
        <HourPickerContainer>
            <div>
                <ImCancelCircle size="2em" color="rgb(255,0,0)" onClick={() => {
                    dispatch({
                        type: "remove_range",
                        payload: {
                            day: day,
                            id: value.id
                        }
                    });
                }} />
            </div>
            <div>
                <DatePicker
                    format="HH:mm"
                    ranges={[]}
                    hideMinutes={minute => minute % 15 !== 0}
                    placement="topStart"
                    placeholder={lastFormatPlaceholder(value.start.toString())}
                    onOk={(date) => {
                        let start = (date.getHours() * 100) + date.getMinutes()
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
                    placeholder={lastFormatPlaceholder(value.finish.toString())}
                    onOk={(date) => {
                        let finish = (date.getHours() * 100) + date.getMinutes()
                        setValue({ ...value, "finish": finish })
                    }}
                />
            </div>
            <div>

                <button type="button" style={{ border: "transparent", background: "transparent" }} onClick={() => {
                    dispatch({
                        type: "update_range",
                        payload: {
                            day: day,
                            id: item.id,
                            value: value
                        }
                    });
                }}> <BsCheck size="2em" color="rgb(255,0,0)" /></button>
            </div>
        </HourPickerContainer>
    )
}

const translateDay = (curValue: String) => {
    const presentationalWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    const curWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    let arrIndex = curWeek.findIndex(element => element === curValue)
    return presentationalWeek[arrIndex]
}

function ScheduleHeader({ day, dispatch, size }: { day: String, dispatch: any, size: number }) {
    return (
        <ScheduleHead>
            <p>{translateDay(day)}</p> <StyledButton type="button" onClick={() => {
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



export default function SchedulePicker({ dispatch, state }: { dispatch: any, state: StateObject }) {

    return (
        <div className="scheduleContainer">
            {Object.keys(state).length > 0 ? Object.entries(state).map((item) => {
                return (
                    <div key={item[0]}>
                        <ScheduleHeader day={item[0]} dispatch={dispatch} size={item[1].length} />
                        <ul>
                            {item[1].map((rangos) => {
                                return (
                                    <HourElement key={getRandomInt(1000)}>
                                        <HourPicker day={item[0]} item={rangos} dispatch={dispatch} />
                                    </HourElement>
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