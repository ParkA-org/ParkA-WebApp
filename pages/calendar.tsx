import * as React from 'react';
import { useState, useEffect } from "react"
import Layout from "./layout";
import { AppointmentsProps, ViewState } from '@devexpress/dx-react-scheduler';
import { GET_CLIENT_RESERVATIONS, GET_OWNER_RESERVATIONS } from "queries"
import { useLazyQuery } from "@apollo/client";
import { Reservation } from "utils/types";
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';


const currentDate = '2020-11-26';
// const schedulerData = [
//   { startDate: '2020-10-06T09:45', endDate: '2020-10-06T11:00', title: 'Parqueo Reservado', color: "#077187" },
//   { startDate: '2020-10-07T12:00', endDate: '2020-10-07T13:30', title: 'Parqueo Reservado', color: "#077187" },
//   { startDate: '2020-10-08T09:45', endDate: '2020-10-08T11:00', title: 'Tu reserva', color: "#63C7B2" },
// ];

const MyAppointment: React.ComponentType<AppointmentsProps> = ({ children, ...restProps }) => (
  <Appointments
    {...restProps}
  >
    {children}
  </Appointments>
);

export type ReservationsData = {
  getAllUserReservationsAsClient: Reservation[];
}

export type OwnerReservationsData = {
  getAllUserReservationsAsOwner: Reservation[];
}

export default function Calendar() {
  const [data, setData] = useState([])
  const [curDate, setCurrentDate] = useState(currentDate)

  const [GetReservations, { loading: reservationLoading, error: reservationError, data: reservationData }] = useLazyQuery<ReservationsData>(GET_CLIENT_RESERVATIONS, {
    fetchPolicy: "network-only"
  })


  const [GetOwnerReservations, { loading: ownerLoading, error: ownerError, data: ownerData }] = useLazyQuery<OwnerReservationsData>(GET_OWNER_RESERVATIONS, {
    fetchPolicy: "network-only"
  })


  useEffect(() => {
    GetOwnerReservations()
    GetReservations()
  }, [])
  useEffect(() => {
    if (reservationData) {
      let newData = reservationData.getAllUserReservationsAsClient.map(reservation => {
        return {
          startDate: reservation.checkInDate,
          endDate: reservation.checkOutDate,
          title: reservation.id,
          color: "#63C7B2"
        }
      })
      setData(prevData => [...prevData, ...newData])
    }
  }, [reservationData])

  useEffect(() => {
    if (ownerData) {
      let newData = ownerData.getAllUserReservationsAsOwner.map(reservation => {
        return {
          startDate: reservation.checkInDate,
          endDate: reservation.checkOutDate,
          title: reservation.id,
          color: "#000000"
        }
      })
      setData(prevData => [...prevData, ...newData])
    }
  }, [ownerData])


  return (
    <Layout>
      <div className="container">
        <Paper>
          <Scheduler
            locale='es-ES'
            data={data}
          >
            <ViewState
              currentDate={curDate}
            />
            <WeekView
              startDayHour={5}
              endDayHour={24}
            />
            <Appointments
              appointmentComponent={MyAppointment} />
            <CurrentTimeIndicator />
          </Scheduler>
        </Paper>
      </div>
      <style jsx>{`
              .container{
                margin:0;
                width:99vw;
                padding:0;
              }
            `}</style>
    </Layout>

  );
}