import Layout from "../layout";
import ParkingForm from "components/ParkingForm";
import LocationPicker from "components/LocationPicker";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "context/UserContext";
import { Coordinates } from "utils/types";

export default function ParkingRegister() {
  const { redirect, loading: userLoading, userStatus } = useContext(
    UserContext
  );

  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    redirect("/parking/register");
  }, [userLoading]);

  if (userStatus === true) {
    return (
      <Layout>
        <div className="container">
          <LocationPicker setCoordinates={setCoordinates} />
          <ParkingForm coordinates={coordinates} />
        </div>
        <style jsx>
          {`
            .container {
              width: 99vw;
              text-align: left;
              margin-bottom: 2em;
            }
          `}
        </style>
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Crear parqueos">
      <h1>Cargando...</h1>
    </Layout>
  );
}
