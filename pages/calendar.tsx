import * as React from 'react';
import { useState, useEffect } from "react"
import Layout from "./layout";
import { AppointmentModel, ViewState } from '@devexpress/dx-react-scheduler';
import { GET_CLIENT_RESERVATIONS, GET_OWNER_RESERVATIONS } from "queries"
import { useLazyQuery } from "@apollo/client";
import { Reservation } from "utils/types";
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
  Resources
} from '@devexpress/dx-react-scheduler-material-ui';

const resources = [{
  fieldName: 'type',
  title: 'Type',
  instances: [
    { id: 'client', text: 'Usuario', color: '#EC407A' },
    { id: 'owner', text: 'Parqueo', color: '#7E57C2' },
  ],
}];

export type ReservationsData = {
  getAllUserReservationsAsClient: Reservation[];
}

export type OwnerReservationsData = {
  getAllUserReservationsAsOwner: Reservation[];
}

export default function Calendar() {
  const [data, setData] = useState([])
  const [curDate, setCurrentDate] = useState("2020-11-26")

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
          title: 'Mis reservaciones',
          type: "client"
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
          title: 'Mis parqueos',
          type: "owner"
        }
      })
      setData(prevData => [...prevData, ...newData])
    }
  }, [ownerData])


  return (
    <Layout>
      <div className="container">
        {ownerLoading && <h3>Cargando...</h3>}
        {data &&
          <Paper>
            <Scheduler
              locale='es-ES'
              data={data}
            >
              <ViewState
                currentDate={curDate}
              />
              <WeekView
                startDayHour={9}
                endDayHour={22}
              />
              <Appointments />
              <Resources data={resources} />
            </Scheduler>
          </Paper>
        }
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