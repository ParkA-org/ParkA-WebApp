import Layout from "./layout"
import styled from "styled-components"

const ContainerText = styled.div`
width: 70vw;
  margin: 40px;
  & > h2{
      color: #59BCA7;
      text-align: left;
  }
  & > p{
    text-align: left;
    margin-top: 40px;
    font-size: 1.2rem;
  }
`;

const ContainerImages = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content: space-around;
  width: 70vw;
`;

const Colaborator = styled.div`
    margin-top: 40px;
    color: #59BCA7;
    &:hover img{
        width: 300px;
        height: 300px;
        border-radius:50%;
        box-shadow: 0 20px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    &:hover h3{
        color: #077187;
        margin-top: 1px;
        font-size: 30px;
    }
`;

const ColaboratorImage = styled.img`
  height: 300px;
  
`;

export default function AboutUs(): JSX.Element {
    return (
        <Layout pageTitle="About Us">
            <ContainerText>
                <h2>
                    Sobre nosotros
                </h2>
                <p>
                    ParkA esta compuesto por un grupo de amigos capacitados en sus respectivos roles para brindar la mayor calidad posible permitiendo lograr el objetivo primordial de ayudar a solventar la problematica de alquiler de parqueos dentro del Gran Santo Domingo teniendo como producto final una plataforma que permita de manera rápida, fácil y segura la reservación de estos.
                </p>
            </ContainerText>
            <ContainerImages>
                <Colaborator>
                    <ColaboratorImage src="/images/Silvio.png" alt="image" />
                    <h3>Silvio Arzeno</h3>
                </Colaborator>
                <Colaborator>
                    <ColaboratorImage src="/images/David.png" alt="image" />
                    <h3>David Bujosa</h3>
                </Colaborator>
                <Colaborator>
                    <ColaboratorImage src="/images/Sebastiano.png" alt="image" />
                    <h3>Sebastiano Faiella</h3>
                </Colaborator>
                <Colaborator>
                    <ColaboratorImage src="/images/Tomas.png" alt="image" />
                    <h3>Tomás Familia</h3>
                </Colaborator>
                <Colaborator>
                    <ColaboratorImage src="/images/Cesar.png" alt="image" />
                    <h3>César González</h3>
                </Colaborator>
            </ContainerImages>
        </Layout>
    );
}