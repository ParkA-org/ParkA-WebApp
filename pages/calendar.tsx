import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "context/UserContext";
import Layout from "./layout";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { GET_CLIENT_RESERVATIONS, GET_OWNER_RESERVATIONS } from "queries";
import { useLazyQuery } from "@apollo/client";
import { Reservation } from "utils/types";
import Paper from "@material-ui/core/Paper";
import {
  Scheduler,
  WeekView,
  Appointments,
  Resources,
  Toolbar,
  DateNavigator,
  CurrentTimeIndicator,
  ViewSwitcher,
  MonthView,
  DayView,
} from "@devexpress/dx-react-scheduler-material-ui";

const resources = [
  {
    fieldName: "type",
    title: "Type",
    instances: [
      { id: "client", text: "Usuario", color: "#EC407A" },
      { id: "owner", text: "Parqueo", color: "#7E57C2" },
    ],
  },
];

export type ReservationsData = {
  getAllUserReservationsAsClient: Reservation[];
};

export type OwnerReservationsData = {
  getAllUserReservationsAsOwner: Reservation[];
};

export default function Calendar() {
  const { redirect, loading: userLoading, userStatus } = useContext(
    UserContext
  );

  useEffect(() => {
    redirect("/calendar");
  }, [userLoading]);

  const [data, setData] = useState([]);
  const [curDate, setCurrentDate] = useState(new Date(Date.now()));
  const [viewName, setViewName] = useState("Week");
  const [
    GetReservations,
    {
      loading: reservationLoading,
      error: reservationError,
      data: reservationData,
    },
  ] = useLazyQuery<ReservationsData>(GET_CLIENT_RESERVATIONS, {
    fetchPolicy: "network-only",
  });

  const [
    GetOwnerReservations,
    { loading: ownerLoading, error: ownerError, data: ownerData },
  ] = useLazyQuery<OwnerReservationsData>(GET_OWNER_RESERVATIONS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    GetOwnerReservations();
    GetReservations();
  }, []);
  useEffect(() => {
    if (reservationData) {
      let newData = reservationData.getAllUserReservationsAsClient.map(
        (reservation) => {
          return {
            startDate: new Date(
              new Date(reservation.checkInDate).getTime() +
                new Date().getTimezoneOffset() * 60 * 1000
            ),
            endDate: new Date(
              new Date(reservation.checkOutDate).getTime() +
                new Date().getTimezoneOffset() * 60 * 1000
            ),
            title: "Mis reservaciones",
            type: "client",
          };
        }
      );
      setData((prevData) => [...prevData, ...newData]);
    }
  }, [reservationData]);

  useEffect(() => {
    if (ownerData) {
      let newData = ownerData.getAllUserReservationsAsOwner.map(
        (reservation) => {
          return {
            startDate: new Date(
              new Date(reservation.checkInDate).getTime() +
                new Date().getTimezoneOffset() * 60 * 1000
            ),
            endDate: new Date(
              new Date(reservation.checkOutDate).getTime() +
                new Date().getTimezoneOffset() * 60 * 1000
            ),
            title: "Mis parqueos",
            type: "owner",
          };
        }
      );
      setData((prevData) => [...prevData, ...newData]);
    }
  }, [ownerData]);

  if (userStatus === true) {
    return (
      <Layout>
        <div className="container">
          {data && (
            <Paper>
              <Scheduler locale="es-ES" data={data}>
                <ViewState
                  defaultCurrentDate={curDate}
                  currentViewName={viewName}
                  onCurrentViewNameChange={(viewName) => setViewName(viewName)}
                />
                <WeekView startDayHour={5} endDayHour={22} />
                <MonthView />
                <DayView />
                <Toolbar />
                <ViewSwitcher />
                <DateNavigator />
                <Appointments />
                <Resources data={resources} />
                <CurrentTimeIndicator />
              </Scheduler>
            </Paper>
          )}
        </div>
        <style jsx>{`
          .container {
            margin: 0;
            width: 99vw;
            padding: 0;
          }
        `}</style>
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Calendario">
      <h3>Cargando....</h3>
    </Layout>
  );
}
