import React from "react";
import {
  Title,
  Content,
  Image,
  HeaderContainer,
  DataContainer,
  Container,
} from "./styles";

export default function IdentificationCard(): JSX.Element {
  return (
    <Container>
      <HeaderContainer>
        <Image src="./image-placeholder.png" />
        <DataContainer>
          <Title>No. Documento</Title>
          <Content>Probando esto</Content>
        </DataContainer>
      </HeaderContainer>
      <DataContainer>
        <Title>Fecha de Nacimiento</Title>
        <Content>Probando esto</Content>
      </DataContainer>
      <DataContainer>
        <Title>Nacionalidad</Title>
        <Content>Probando esto</Content>
      </DataContainer>
      <DataContainer>
        <Title>Lugar de Nacimiento</Title>
        <Content>Probando esto</Content>
      </DataContainer>
      <DataContainer>
        <Title>Tipo de Documento</Title>
        <Content>Probando esto</Content>
      </DataContainer>
    </Container>
  );
}
