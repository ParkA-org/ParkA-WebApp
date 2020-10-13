import Layout from "../../layout";
import styled from "styled-components";
import Carousel from "components/Carousel";
import ReviewCard from "components/ReviewCard";
import { BiDollar } from "react-icons/bi";

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
    & input{
        background-color: #E5E4E4;
        border-radius: 0.7em;
        height: 25px;
        width:80%;
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

export const Button = styled.div`
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
    return (
        <Layout pageTitle="Detalle del Parqueo">
            <div>
                <h1>Agora Mall II</h1>
                <Container>
                    <ParkingImages>
                        <img src="/images/parkimage.png" />
                        <div className="subimages">
                            <img src="/images/parkimage2.png" />
                            <img src="/images/parkimage2.png" />
                            <img src="/images/parkimage2.png" />
                        </div>
                    </ParkingImages>
                    <Form>
                        <FormItem>
                            <h3>Propietario</h3>
                            <input type="text" />
                        </FormItem>
                        <FormItem>
                            <h3>Sector</h3>
                            <input type="text" />
                        </FormItem>
                        <FormItem>
                            <h3>Dirección</h3>
                            <input type="text" />
                        </FormItem>
                        <FormItem>
                            <h3>Costo por hora</h3>
                            <div>
                                <BiDollar fill="#077187" size="1.5em" /><input type="text" />
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
            <style global jsx>{`
                h1{
                    margin-top:10px;
                    margin-bottom:10px;
                    text-align:left;
                    margin-left:70px;
                }
            `
            }</style>
        </Layout>
    );
}