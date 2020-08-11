import React from "react";
import {
  Title,
  Content,
  Image,
  HeaderContainer,
  DataContainer,
  Container,
} from "./styles";

type CardProps = {
  typeOfDocument: string;
  documentCode: string;
  birthPlace: string;
  nationality: string;
};

export default function IdentificationCard({
  typeOfDocument,
  documentCode,
  birthPlace,
  nationality,
}: CardProps): JSX.Element {
  return (
    <Container>
      <HeaderContainer>
        <Image src="./image-placeholder.png" />
        <DataContainer>
          <Title>No. Documento</Title>
          <Content>{documentCode}</Content>
        </DataContainer>
      </HeaderContainer>
      <DataContainer>
        <Title>Fecha de Nacimiento</Title>
        <Content>21/03/2020</Content>
      </DataContainer>
      <DataContainer>
        <Title>Nacionalidad</Title>
        <Content>{nationality}</Content>
      </DataContainer>
      <DataContainer>
        <Title>Lugar de Nacimiento</Title>
        <Content>{birthPlace}</Content>
      </DataContainer>
      <DataContainer>
        <Title>Tipo de Documento</Title>
        <Content>{typeOfDocument}</Content>
      </DataContainer>
    </Container>
  );
}
