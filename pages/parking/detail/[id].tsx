import Layout from "../../layout";
import styled from "styled-components";
import Carousel from "components/Carousel";
import ReviewCard from "components/ReviewCard";
import { useRouter } from "next/router"
import { BiDollar } from "react-icons/bi";
import { useLazyQuery } from "@apollo/client";
import { UserContext } from "context/UserContext";
import { GET_PARKING_WITH_ID } from "queries";
import { useContext, useEffect } from "react";

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
    const { token } = useContext(UserContext)
    const [GetParkingWithId, { data, loading, error }] = useLazyQuery(GET_PARKING_WITH_ID, {
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : ""
            }
        }
    })
    useEffect(() => {
        console.log('Router id')
        console.log(router.query.id)
        if (router.query.id)
            GetParkingWithId({ variables: { id: router.query.id } })
        console.log('Data')
        console.log(data)
    }, [data, router])

    if (loading) return <h3>Loading...</h3>
    if (error) return <h3>Error...</h3>
    return (
        <Layout pageTitle="Detalle del Parqueo">
            <div>
                <h1>{data ? data.getParkingById.parkingName : "Agora Mall II"}</h1>
                <Container>
                    <ParkingImages>
                        <img src={data ? data.getParkingById.mainPicture : "/images/parkimage.png"} />
                        <div className="subimages">
                            {data ? data.getParkingById.pictures.map(pic => {
                                return <img className="subimage" src={pic} alt="alternative image" key={pic} />
                            }) : <>
                                    <img style={{ width: "100px", height: "75px" }} src="/images/parkimage2.png" />
                                    <img style={{ width: "100px", height: "75px" }} src="/images/parkimage2.png" />
                                    <img style={{ width: "100px", height: "75px" }} src="/images/parkimage2.png" />
                                </>
                            }

                        </div>
                    </ParkingImages>
                    <Form>
                        <FormItem>
                            <h3>Información</h3>
                            <p>{data ? data.getParkingById.information : "Parqueo en zona tranquila"}</p>
                        </FormItem>
                        <FormItem>
                            <h3>Sector</h3>
                            <p>{data ? data.getParkingById.sector : "Los Mina"}</p>
                        </FormItem>
                        <FormItem>
                            <h3>Dirección</h3>
                            <p>{data ? data.getParkingById.direction : "C/ Pedro Zuluaga #12"}</p>
                        </FormItem>
                        <FormItem>
                            <h3>Costo por hora</h3>
                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                <BiDollar fill="#077187" size="1.5em" />
                                <p style={{ marginLeft: "0.25em" }}>{data ? `${data.getParkingById.priceHours} RD$ hora` : "50 RD$ hora"}</p>
                            </div>
                        </FormItem>
                    </Form>
                    <ButtonGroup>
                        <Button>Reservar</Button>
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
                .subimages {
                    width: 30vw;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .subimage {
                    width: 100px;
                    heigth: 75px;
                }
            `
            }</style>
        </Layout >
    );
}