import {
  Title,
  Content,
  Image,
  HeaderContainer,
  DataContainer,
  Container,
} from "./styles";

type Country = {
  __typename: string;
  name: string;
  id: string;
}

type CardProps = {
  typeOfDocument: string;
  documentCode: string;
  birthPlace: string;
  dateOfBirth: string;
  nationality: string;
  imageUrl: string;
  countries: Country[];
};

export default function IdentificationCard({
  typeOfDocument,
  documentCode,
  birthPlace,
  dateOfBirth,
  nationality,
  imageUrl,
  countries = []
}: CardProps): JSX.Element {

  const getCountry = (currentCountry = "") => {
    let returnValue = ""
    if (countries !== undefined && currentCountry !== "") {
      console.log('Countries')
      console.log(countries)
      returnValue = countries.filter(country => country.id === currentCountry)[0].name
    }
    return returnValue
  }

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
        <Content>{getCountry(nationality)}</Content>
      </DataContainer>
      <DataContainer>
        <Title>Lugar de Nacimiento</Title>
        <Content>{birthPlace}</Content>
      </DataContainer>
      <DataContainer>
        <Title>Tipo de Documento</Title>
        <Content>{typeOfDocument === "5f356c60f1a9ffdb504f404f" ? "Pasaporte" : "Cédula"}</Content>
      </DataContainer>
    </Container>
  );
}
