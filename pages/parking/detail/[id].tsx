import { useRouter } from "next/router"
import { BiDollar } from "react-icons/bi";
import { useLazyQuery } from "@apollo/client";
import { Parking } from "utils/types"
import { GET_PARKING_WITH_ID } from "queries";
import { useEffect, useState } from "react";
import Layout from "../../layout";
import styled from "styled-components";
import NavigationLink from "components/NavigationLink"
import Carousel from "components/Carousel";
import ReviewCard from "components/ReviewCard";
import ImageViewer from "components/ImageViewer"

export const Container = styled.div`
    display:grid;
    grid-template-areas:
        "images form"
        "images buttons";
    column-gap: 20px;
`;

export const ParkingImages = styled.div`
    grid-area: images;

    & img {
        margin:10px;
        box-shadow: 0px 10px 8px rgba(0, 0, 0, 0.25);
        border-radius: 1.2em;
    }

    & > img{
        border-radius: 3em;
        height: 250px;
    }
`;

export const Form = styled.div`
    grid-area: form;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    align-items:center;
    justify-content:stretch;
`;

export const FormItem = styled.div` 
    text-align:left;
    & p {
        background-color: #E5E4E4;
        border-radius: 0.7em;
        height: auto;
        width:70%;
        padding: 0.5em;
    }

    & svg{
        position:relative;
        top:6px;
        margin-right:15px;
    }
`;

export const ButtonGroup = styled.div`
    grid-area:buttons;
    display:flex;
    flex-wrap:nowrap;
    justify-content: space-around;
    align-items:center;
`;

export const Button = styled.button`
    border:solid;
    border-color:#077187;
    color: #077187;
    background-color:none;
    font-size: 20px;
    border-radius: 1em;
    padding: 10px 15px 10px 15px;
    font-weight:bold;
    margin: 0 10px 0 10px;
`;

export default function ParkingDetail(): JSX.Element {
    const router = useRouter()
    const [parking, setParking] = useState<Parking>(null)
    const [GetParkingWithId, { data, loading, error }] = useLazyQuery(GET_PARKING_WITH_ID)
    const { id } = router.query;
    useEffect(() => {
        console.log('Router id')
        console.log(id)
        if (id)
            GetParkingWithId({ variables: { id: id } })
        if (data)
            setParking(data.getParkingById)
    }, [data, id])

    if (loading) return <h3>Loading...</h3>
    if (error) return <h3>Error...</h3>

    return (
        <Layout pageTitle="Detalle del Parqueo">
            <div>
                <h1>{parking ? parking.parkingName : "Agora Mall II"}</h1>
                <Container>
                    <ParkingImages>
                        {parking ? <ImageViewer pictures={parking.pictures} /> : <p>Cargando imagenes parqueo...</p>}
                    </ParkingImages>
                    <Form>
                        <FormItem>
                            <h3>Información</h3>
                            <p>{parking ? parking.information : "Parqueo en zona tranquila"}</p>
                        </FormItem>
                        <FormItem>
                            <h3>Sector</h3>
                            <p>{parking ? parking.sector : "Los Mina"}</p>
                        </FormItem>
                        <FormItem>
                            <h3>Dirección</h3>
                            <p>{parking ? parking.direction : "C/ Pedro Zuluaga #12"}</p>
                        </FormItem>
                        <FormItem>
                            <h3>Costo por hora</h3>
                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                <BiDollar fill="#077187" size="1.5em" />
                                <p style={{ marginLeft: "0.25em" }}>{parking ? `${parking.priceHours} RD$ hora` : "50 RD$ hora"}</p>
                            </div>
                        </FormItem>
                    </Form>
                    <ButtonGroup>
                        <Button>
                            <NavigationLink href={`/parking/checkout/${id}`}>Reservar</NavigationLink>
                        </Button>
                        <Button>Disponibilidad</Button>
                        <Button>Compartir</Button>
                    </ButtonGroup>
                </Container>
                <Carousel title="Reseñas">
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                </Carousel>
            </div>
            <style jsx>{`
                h1{
                    margin-top:10px;
                    margin-bottom:10px;
                    text-align:left;
                    margin-left:70px;
                }
            `
            }</style>
        </Layout >
    );
}