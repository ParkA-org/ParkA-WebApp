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
  dateOfBirth: string;
  nationality: string;
  imageUrl: string;
};

export default function IdentificationCard({
  typeOfDocument,
  documentCode,
  birthPlace,
  dateOfBirth,
  nationality,
  imageUrl
}: CardProps): JSX.Element {
  return (
    <Container>
      <HeaderContainer>
        <Image src={imageUrl} />
        <DataContainer>
          <Title>No. Documento</Title>
          <Content>{documentCode}</Content>
        </DataContainer>
      </HeaderContainer>
      <DataContainer>
        <Title>Fecha de Nacimiento</Title>
        <Content>{dateOfBirth}</Content>
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
