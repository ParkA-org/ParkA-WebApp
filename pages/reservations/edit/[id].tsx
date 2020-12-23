import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { UserContext } from "context/UserContext";
import Layout from "../../layout";
import MapFragment from "components/MapFragment";
import ReservationDetail from "components/ReservationDetail";
import PaymentMethod from "components/PaymentMethod";
import { Reservation } from "utils/types";
import { Parking, Vehicle, ReservationInput } from "utils/types";
import { GET_RESERVATION_BY_ID } from "queries";

export type ReservationsData = {
  getReservationById: Reservation;
};

export default function EditReservation() {
  const router = useRouter();
  const [parking, setParking] = useState<Parking>(null);
  const [
    GetReservationWithId,
    { data, loading, error },
  ] = useLazyQuery<ReservationsData>(GET_RESERVATION_BY_ID);
  const [checkout, setCheckout] = useState<ReservationInput>({});
  const { id } = router.query;

  useEffect(() => {
    if (id) GetReservationWithId({ variables: { var: { id: id } } });
    if (data) {
      setParking(data.getReservationById.parking);
      setCheckout({
        ...checkout,
        checkInDate: data.getReservationById.checkInDate,
        checkOutDate: data.getReservationById.checkOutDate,
        total: data.getReservationById.total,
      });
    }
  }, [data, router]);

  const { redirect, loading: userLoading, userStatus } = useContext(
    UserContext
  );

  useEffect(() => {
    redirect(`/reservations/edit/${id}`);
  }, [userLoading]);

  useEffect(() => {
    if (parking)
      setCheckout({
        ...checkout,
        parking: parking.id,
        owner: parking.user.id,
      });
  }, [parking]);

  if (userStatus === true) {
    return (
      <Layout pageTitle="Parking Checkout">
        <div className="container">
          {parking && (
            <MapFragment
              coordinates={{
                lat: parseFloat(parking.latitude),
                lng: parseFloat(parking.longitude),
              }}
            />
          )}
          <div className="pageContent">
            {parking ? (
              <ReservationDetail
                parking={parking}
                checkout={checkout}
                setCheckout={setCheckout}
              />
            ) : (
              <h3>Loading...</h3>
            )}
            <PaymentMethod checkout={checkout} setCheckout={setCheckout} />
          </div>
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

            img {
              width: 100%;
              height: 50vh;
              min-height: 400px;
            }
            .pageContent {
              display: flex;
              justify-content: space-between;
              width: 85vw;
            }
          `}
        </style>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Editar reservaciones">
      <h3>Cargando...</h3>
    </Layout>
  );
}
