import Layout from "../../layout";
import MapFragment from "components/MapFragment";
import ReservationView from "components/ReservationDetail/detail";
import PaymentMethod from "components/PaymentMethod/detail";
import { Reservation } from "utils/types";
import { GET_RESERVATION_BY_ID } from "queries";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useContext } from "react";
import { UserContext } from "context/UserContext";

export type ReservationsData = {
  getReservationById: Reservation;
};

export default function ReservationDetail() {
  const router = useRouter();
  const [
    GetReservation,
    { data, loading, error },
  ] = useLazyQuery<ReservationsData>(GET_RESERVATION_BY_ID);

  const { redirect, loading: userLoading, userStatus } = useContext(
    UserContext
  );
  const { id } = router.query;

  useEffect(() => {
    redirect(`/reservations/detail/${id}`);
  }, [userLoading]);

  useEffect(() => {
    if (router.query.id) {
      GetReservation({ variables: { var: { id: id } } });
    }
  }, [data, router]);

  if (error) return <p>Error...</p>;
  if (userStatus === true) {
    return (
      <Layout pageTitle="Detalle de reservación">
        <div className="container">
          {data && (
            <>
              <MapFragment
                coordinates={{
                  lat: parseFloat(data.getReservationById.parking.latitude),
                  lng: parseFloat(data.getReservationById.parking.longitude),
                }}
              />
              <div className="pageContent">
                <ReservationView
                  checkInDate={data.getReservationById.checkInDate}
                  checkOutDate={data.getReservationById.checkOutDate}
                  parking={data.getReservationById.parking}
                  vehicle={data.getReservationById.vehicle}
                  total={data.getReservationById.total}
                />
                <PaymentMethod payment={data.getReservationById.paymentInfo} />
              </div>
            </>
          )}
        </div>
        <style jsx>
          {`
            .container {
              display: grid;
              justify-items: space-around;
              text-align: center;
              width: 80vw;
              margin: 2em auto;
            }
            .pageContent {
              display: flex;
              justify-content: space-between;
              width: 100%;
            }
          `}
        </style>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Detalle de reservación">
      <h3>Loading...</h3>
    </Layout>
  );
}
