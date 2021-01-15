import { useRef, useEffect, useState } from "react"
import { useLazyQuery, useQuery } from "@apollo/client"
import { Parking, Vehicle, ReservationInput, Calendar } from "utils/types"
import { GET_ALL_VEHICLES, GET_PARKING_DISPONIBILITY } from "queries"
import { Container, StyledInput, ElementContainer, CheckboxContainer, StyledSelect, StyledImage, LeftSection, RightSection } from "./styles"
import MoneyIcon from "components/Icons/Money"
import { DatePicker } from "rsuite";
import { BsArrowRight } from "react-icons/bs"

type ElementProps = {
    name: string;
    children?: JSX.Element;
    value?: string;
}

type ComponentProps = {
    parking: Parking
    checkout: ReservationInput;
    setCheckout: React.Dispatch<React.SetStateAction<ReservationInput>>;
}

type AllVehiclesData = {
    getAllUserVehicles: Vehicle[]
}

type ParkingSchedule = {
    start: number;
    finish: number;
}

type ParkingCalendar = {
    id: string;
    parking: string;
    schedules: ParkingSchedule[];
    date: string;
}

type ParkingAvailability = {
    getParkingAvaliability: ParkingCalendar[]
}

function SectionElement({ name, children, value }: ElementProps) {
    return (
        <ElementContainer>
            <label><b>{name}</b></label>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", maxWidth: "250px" }}>
                {children}<StyledInput type="text" value={value} />
            </div>
        </ElementContainer>
    )
}

type HourPickerProps = {
    hourPrice: number;
    calendar: Calendar;
    checkout: ReservationInput;
    setCheckout: React.Dispatch<React.SetStateAction<ReservationInput>>;
}

const DisableCalendarDates = (date: Date, calendar: Calendar): boolean => {

    const week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

    let dayOfWeek = date.getDay()

    for (let i = 0; i < week.length; i++) {
        if (calendar[week[i]].length === 0 && dayOfWeek === i) {
            return true
        }
    }
    return false
}

const DisableCalendarHours = (hour: number, date: Date, calendar: Calendar): boolean => {

    const week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

    let dayOfWeek = date.getDay()

    for (let i = 0; i < calendar[week[dayOfWeek]].length; i++) {
        if (hour < (calendar[week[dayOfWeek]][i].start / 100) || hour > (calendar[week[dayOfWeek]][i].finish) / 100) {
            return true
        }
    }

    return false
}

const DisableAvailableCalendarHours = (hour: number, parkingAvailableCalendar: ParkingCalendar): boolean => {

    for (let i = 0; i < parkingAvailableCalendar.schedules.length; i++) {
        if (hour < (parkingAvailableCalendar.schedules[0][i].start / 100) || hour > (parkingAvailableCalendar.schedules[0][i].finish) / 100) {
            return true
        }
    }
    return false
}

function HourPicker({ hourPrice, checkout, setCheckout, calendar }: HourPickerProps): JSX.Element {

    const [GetParkingDisponibility, { data }] = useLazyQuery<ParkingAvailability>(GET_PARKING_DISPONIBILITY)

    const [startDate, setStartDate] = useState<Date>
        (new Date(new Date(checkout.checkInDate).getTime() + (new Date().getTimezoneOffset() * 60 * 1000)))
    const [endDate, setEndDate] = useState<Date>
        (new Date(new Date(checkout.checkOutDate).getTime() + (new Date().getTimezoneOffset() * 60 * 1000)))

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
                            date: startDate
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
                        width: 130px;
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

export default function ReservationDetail({ parking, checkout, setCheckout }: ComponentProps) {

    const { loading, error, data } = useQuery<AllVehiclesData>(GET_ALL_VEHICLES, {
        onCompleted() {
            if (data && data.getAllUserVehicles.length) {
                setCheckout({ ...checkout, vehicle: data.getAllUserVehicles[0].id })
            }
        }
    })
    const imgRef = useRef(null)

    return (
        <Container>
            <LeftSection>
                <SectionElement name="Nombre" value={parking.parkingName} />
                {parking.features.length > 0 ?
                    <ElementContainer>
                        <label><b>Características</b></label>
                        {parking.features.map(feature => (
                            <CheckboxContainer key={feature.id}>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value={feature.name} checked={true}></input>
                                <label><b>{feature.name}</b></label>
                            </CheckboxContainer>
                        ))}
                    </ElementContainer>
                    : null}
                <SectionElement name="Costo por hora" value={parking.priceHours}>
                    <MoneyIcon />
                </SectionElement>
                <ElementContainer>
                    <label><b>Vehiculos</b></label>
                    {loading && <h3>Loading user vehicles...</h3>}
                    {data && data.getAllUserVehicles && data.getAllUserVehicles.length > 0 ?
                        (
                            <>
                                <StyledSelect onChange={e => {
                                    const { target } = e
                                    const { value } = target
                                    const imgUrl = data.getAllUserVehicles.find(vehicle => vehicle.id === value).mainPicture
                                    imgRef.current.src = imgUrl
                                }} >
                                    {data && data.getAllUserVehicles.map(vehicle => <option key={vehicle.id} value={vehicle.id} data-image={vehicle.mainPicture}>{vehicle.model.name}</option>)}
                                </StyledSelect>
                                <StyledImage src={data.getAllUserVehicles[0].mainPicture} ref={imgRef} />
                            </>
                        )
                        : <p>No tienes ningun vehiculo registrado</p>}
                </ElementContainer>
            </LeftSection>
            <RightSection>
                <ElementContainer>
                    <label><b>Horas</b></label>
                    <HourPicker hourPrice={parseInt(parking.priceHours)} checkout={checkout} setCheckout={setCheckout} calendar={parking.calendar} />
                </ElementContainer>

                <SectionElement name="Total de horas" value={checkout.total ? checkout.total.toString() : "0"} />
            </RightSection>
        </Container>
    )
}