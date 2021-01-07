import { useEffect, useState, useContext } from "react";
import { UserContext } from "context/UserContext";
import { useRouter } from "next/router";
import { Parking } from "utils/types";
import Layout from "../../layout";
import { GET_PARKING_WITH_ID } from "queries";
import ParkingForm from "components/ParkingForm/edit";
import { useLazyQuery } from "@apollo/client";

export default function EditParking(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const [parking, setParking] = useState<Parking>(null);
  const [GetParkingWithId, { data, error, loading }] = useLazyQuery(
    GET_PARKING_WITH_ID
  );

  const { redirect, loading: userLoading, userStatus } = useContext(
    UserContext
  );

  useEffect(() => {
    redirect(`/parking/edit/${id}`);
  }, [userLoading]);

  useEffect(() => {
    if (id) {
      GetParkingWithId({ variables: { id: id } });
    }
    if (data) {
      setParking(data.getParkingById);
    }
  }, [id, data]);
  if (error) return <h3>Error...</h3>;

  if (userStatus === true && !loading) {
    return (
      <Layout pageTitle="Editar parqueo">
        {parking && <ParkingForm {...parking} />}
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Editar parqueo">
      <h3>Cargando... </h3>
    </Layout>
  );
}
