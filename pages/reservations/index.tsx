import { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENT_RESERVATIONS } from "queries";
import { Reservation, ReservationStatuses } from "utils/types";
import { UserContext } from "context/UserContext";
import Layout from "../layout";
import Carousel from "components/Carousel";
import styled from "styled-components";
import ReservationCard from "components/ReservationCard";
import { NewLink } from "components/VehicleSection/styles";
import NavigationLink from "components/NavigationLink";
import { AiFillPlusCircle } from "react-icons/ai";
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: left;
  color: #333;
`;

export type ReservationsData = {
  getAllUserReservationsAsClient: Reservation[];
};

export default function Reservations() {
  const { redirect, loading: userLoading, userStatus } = useContext(
    UserContext
  );

  useEffect(() => {
    redirect("/reservations");
  }, [userLoading]);

  const [pendingReservations, setPendingReservations] = useState<Reservation[]>(
    []
  );
  const [completedReservations, setCompletedReservations] = useState<
    Reservation[]
  >([]);

  const { loading, error, data } = useQuery<ReservationsData>(
    GET_CLIENT_RESERVATIONS,
    {
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (data) {
      setPendingReservations(
        data.getAllUserReservationsAsClient.filter((reservation) => {
          // let reservationDateTime = new Date(
          //   reservation.checkOutDate
          // ).getTime();
          // let actualDateTime = new Date(Date.now()).getTime();
          // return reservationDateTime - actualDateTime > 0;
          return reservation.status === "Created";
        })
      );
      setCompletedReservations(
        data.getAllUserReservationsAsClient.filter((reservation) => {
          // let reservationDateTime = new Date(
          //   reservation.checkOutDate
          // ).getTime();
          // let actualDateTime = new Date(Date.now()).getTime();
          // return reservationDateTime - actualDateTime < 0;
          return reservation.status !== "Created";
        })
      );
    }
  }, [data]);

  if (error) {
    console.error(error);
    return <h3>Error...</h3>;
  }

  if (userStatus === true) {
    return (
      <Layout>
        <Container>
          <h1
            style={{ textAlign: "center", fontSize: "3rem", margin: "0.5em 0" }}
          >
            Historial de Reservas
          </h1>
          <NavigationLink href="/map">
            <NewLink style={{ color: "#084C7C" }}>
              <AiFillPlusCircle size="1.5em" color="#084C7C" /> Nueva Reserva
            </NewLink>
          </NavigationLink>
          {pendingReservations.length > 0 ? (
            <Carousel title="Reservas Pendientes">
              {pendingReservations.map((reservation) => {
                return (
                  <ReservationCard {...reservation} key={reservation.id} />
                );
              })}
            </Carousel>
          ) : (
            <>
              <h1>Reservas Pendientes</h1>
              <h3 style={{ margin: "1.5em 0em" }}>
                No tienes reservas pendientes
              </h3>
            </>
          )}
          {completedReservations.length > 0 ? (
            <Carousel title="Reservas Pasadas">
              {completedReservations.map((reservation) => {
                return (
                  <ReservationCard {...reservation} key={reservation.id} />
                );
              })}
            </Carousel>
          ) : (
            <>
              <h1>Reservas Pasadas</h1>
              <h3 style={{ margin: "1.5em 0em" }}>
                No tienes reservas pasadas
              </h3>
            </>
          )}
        </Container>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Reservaciones">
      <h3>Cargando...</h3>
    </Layout>
  );
}
