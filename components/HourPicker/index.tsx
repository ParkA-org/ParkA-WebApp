import { useState, useEffect } from "react"
import { useLazyQuery } from "@apollo/client"
import { DatePicker } from "rsuite"
import { BsArrowRight } from "react-icons/bs"
import { GET_PARKING_DISPONIBILITY } from "queries"
import { getTimezoneDate } from "utils/functions"
import { Calendar, ReservationInput, ParkingCalendar } from "utils/types"


type HourPickerProps = {
    hourPrice: number;
    calendar: Calendar;
    checkout: ReservationInput;
    setCheckout: React.Dispatch<React.SetStateAction<ReservationInput>>;
}

type ParkingAvailability = {
    getParkingAvaliability: ParkingCalendar[]
}


export default function HourPicker({ hourPrice, checkout, setCheckout, calendar }: HourPickerProps): JSX.Element {

    const [GetParkingDisponibility, { data }] = useLazyQuery<ParkingAvailability>(GET_PARKING_DISPONIBILITY)

    const [startDate, setStartDate] = useState<Date>
        (() => {
            if (checkout.checkInDate !== undefined)
                return getTimezoneDate(checkout.checkInDate)
            else {
                let initialDate = new Date(Date.now())
                initialDate.setMinutes(0)
                return initialDate
            }
        })
    const [endDate, setEndDate] = useState<Date>
        (() => {
            if (checkout.checkOutDate !== undefined)
                return getTimezoneDate(checkout.checkOutDate)
            else {
                let initialDate = new Date(Date.now())
                initialDate.setMinutes(0)
                initialDate.setHours(initialDate.getHours() + 2)
                return initialDate
            }
        })

    const calculateTime = (start: Date, end: Date) => {
        let startingHour = start.getHours(), endingHour = end.getHours(), endingMinutes = end.getMinutes(), endingDate = new Date(), hourDiff = 0, rentDate = new Date(Date.now());
        endingDate.setTime(start.getTime())
        endingDate.setHours(endingHour)
        endingDate.setMinutes(endingMinutes)
        hourDiff = Math.abs(endingHour - startingHour)
        setCheckout({
            ...checkout,
            checkInDate: new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString(),
            checkOutDate: new Date(endingDate.getTime() - (endingDate.getTimezoneOffset() * 60000)).toISOString(),
            rentDate: new Date(rentDate.getTime() - (rentDate.getTimezoneOffset() * 60000)).toISOString(),
            total: hourPrice * hourDiff
        })
    }


    const DisableCalendarDates = (date: Date, calendar: Calendar): boolean => {

        const week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

        let dayOfWeek = date.getDay()

        for (let i = 0; i < week.length; i++) {
            if (calendar[week[i]].length === 0 && dayOfWeek === i) {
                return true
            }
        }

        if (date.getTime() < new Date(Date.now()).getTime()) {
            return true
        }

        return false
    }

    const DisableAvailableCalendarHours = (date: Date, hour: number): boolean => {
        let parkingAvailableCalendar = []

        if (data) {
            parkingAvailableCalendar = data.getParkingAvaliability
        }

        if (parkingAvailableCalendar.length === 0) {
            return false
        }

        for (let z = 0; z < parkingAvailableCalendar.length; z++) {
            let calendar = parkingAvailableCalendar[z]
            if (new Date(calendar.date).getDate() === (new Date(date).getDate() - 1)) {
                for (let i = 0; i < calendar.schedules.length; i++) {
                    if (hour < (calendar.schedules[i].start / 100) || hour > (calendar.schedules[i].finish) / 100) {
                        return false
                    }
                }
            }
        }

        return true
    }

    const DisableCalendarHours = (hour: number, date: Date, calendar: Calendar): boolean => {

        const week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

        let dayOfWeek = date.getDay()

        for (let i = 0; i < calendar[week[dayOfWeek]].length; i++) {
            if (0 === calendar[week[dayOfWeek]][i].start / 100 &&
                24 === calendar[week[dayOfWeek]][i].finish / 100)
                return false

            if (hour < (calendar[week[dayOfWeek]][i].start / 100) || hour > (calendar[week[dayOfWeek]][i].finish) / 100) {
                return true
            }
        }
        return DisableAvailableCalendarHours(date, hour)
    }



    useEffect(() => {
        if (startDate && endDate) {
            calculateTime(startDate, endDate)
        }
        if (startDate) {
            GetParkingDisponibility(
                {
                    variables:
                    {
                        paInput:
                        {
                            parking: checkout.parking,
                            date: new Date(startDate.getTime() - (60 * 24 * 60000) - (startDate.getTimezoneOffset() * 60000)).toISOString()
                        }
                    }
                })
        }
    }, [startDate, endDate])

    return (
        <>
            <section>
                <div>
                    <p>Fecha</p>
                    <DatePicker
                        format="YYYY-MM-DD"
                        defaultValue={startDate}
                        disabledDate={(date) => {
                            return DisableCalendarDates(date, calendar)
                        }}
                        onOk={(value) => setStartDate(value)}
                    />
                </div>
            </section>
            <section>
                <div>
                    <p>Desde</p>
                    <DatePicker
                        format="HH:mm"
                        ranges={[]}
                        defaultValue={startDate}
                        disabledHours={(hour) => DisableCalendarHours(hour, startDate, calendar)}
                        hideMinutes={minute => minute % 30 !== 0}
                        onOk={(value) => setStartDate(value)}
                    />
                </div>
                <BsArrowRight size="2em" style={{ alignSelf: "flex-end" }} />
                <div>
                    <p>Hasta</p>
                    <DatePicker
                        defaultValue={endDate}
                        format="HH:mm"
                        ranges={[]}
                        disabledHours={(hour) => DisableCalendarHours(hour, startDate, calendar)}
                        hideMinutes={minute => minute % 30 !== 0}
                        onOk={(value) => setEndDate(value)}
                    />
                </div>
                <style jsx>
                    {`
                    div {
                        display: flex;
                        flex-direction: column;
                        height: auto
                        margin-right: 0.5em;
                    }

                    p {
                        margin-bottom: 0.5em;
                    }

                    section {
                        width: 100%;
                        display: flex;
                        justify-content: space-around;
                    }
                `}
                </style>
            </section>
        </>
    )
}
