import Layout from "./layout";
import styled from "styled-components";

export const Container = styled.div`
    display:grid;
    
`;

export const ParkingImages = styled.div`
`;

export const Form = styled.div`

`;

export const FormItem = styled.div`
    & > input{
        background-color: #E5E4E4;
        border-radius: 0.7em;
        height: 25px;
    }
`;

export const ButtonGroup = styled.div`
    display:flex;
    flex-wrap:nowrap;
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
`;

export const Carousel = styled.div`
`;

export default function ParkingDetail():JSX.Element{
    return(
        <Layout pageTitle="Detalle del Parqueo">
            <Container>
                <h1>Agora Mall II</h1>
                <ParkingImages>
                    <img src="/images/parkimage.png"/>
                    <div className="subimages">
                        <img src="/images/parkimage2.png"/>
                        <img src="/images/parkimage2.png"/>
                        <img src="/images/parkimage2.png"/>
                    </div>
                </ParkingImages>
                <Form>
                    <FormItem>
                        <h3>Propietario</h3>
                        <input type="text"/>
                    </FormItem>
                    <FormItem>
                        <h3>Sector</h3>
                        <input type="text"/>
                    </FormItem>
                    <FormItem>
                        <h3>Dirección</h3>
                        <input type="text"/>
                    </FormItem>
                    <FormItem>
                        <h3>Costo por hora</h3>
                        <input type="text"/>
                    </FormItem>
                </Form>
                <ButtonGroup>
                    <Button>Reservar</Button>
                    <Button>Disponibilidad</Button>
                    <Button>Compartir</Button>
                </ButtonGroup>
                <Carousel></Carousel>
            </Container>
        </Layout>
    );
}