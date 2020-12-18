import { useState, useEffect } from "react"
import { DatePicker } from "rsuite"
import { useLazyQuery } from "@apollo/client"
import { GET_PARKING_DISPONIBILITY } from "queries"
import { Parking, Calendar, ParkingCalendar } from "utils/types"
import { ModalContainer, ModalTitle, TimeSection } from "./styles"

type ParkingAvailability = {
    getParkingAvaliability: ParkingCalendar[]
}

type ComponentProps = {
    parking: Parking
}

export default function AvailabilityModal({ parking }: ComponentProps) {

    const [GetParkingDisponibility, { data }] = useLazyQuery<ParkingAvailability>(GET_PARKING_DISPONIBILITY)

    const [startDate, setStartDate] = useState<Date>
        (() => {
            let initialDate = new Date(Date.now())
            initialDate.setMinutes(0)
            return initialDate
        })

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
        if (startDate) {
            GetParkingDisponibility(
                {
                    variables:
                    {
                        paInput:
                        {
                            parking: parking.id,
                            date: new Date(startDate.getTime() - (60 * 24 * 60000) - (startDate.getTimezoneOffset() * 60000)).toISOString()
                        }
                    }
                })
        }
    }, [startDate])

    return (
        <ModalContainer>
            <ModalTitle>Disponibilidad del parqueo</ModalTitle>
            <TimeSection>
                <div>
                    <h3>Fecha</h3>
                    <DatePicker
                        format="YYYY-MM-DD"
                        style={{ width: 180 }}
                        defaultValue={startDate}
                        disabledDate={(date) => {
                            return DisableCalendarDates(date, parking.calendar)
                        }}
                        onOk={(value) => setStartDate(value)}
                    />
                </div>
                <div>
                    <h3>Horas disponibles</h3>
                    <DatePicker
                        format="HH:mm"
                        style={{ width: 180 }}
                        ranges={[]}
                        defaultValue={startDate}
                        hideHours={(hour) => DisableCalendarHours(hour, startDate, parking.calendar)}
                        hideMinutes={minute => minute % 30 !== 0}
                    />
                </div>
            </TimeSection>
        </ModalContainer>
    )
}