
import {
  Container,
  CardNumbers,
  CardHolder,
  CardExpirationDate,
  ValidationMessage,
  Logo,
  Chip,
} from "./styles";

type CardProps = {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv?: string;
};

export default function CreditCard({
  cardNumber,
  cardHolder,
  expirationDate,
}: CardProps): JSX.Element {
  const formatData = (data: string): string => {
    return `${data.substr(0, 4)} ${data.substr(4, 4)} ${data.substr(
      8,
      4
    )} ${data.substr(12, 4)}`;
  };

  const formatDate = (data: string): string => {
    return `${data.substr(5, 2)}/${data.substr(2, 2)}`;
  };

  return (
    <Container>
      <Logo
        src={
          cardNumber[0] === "4"
            ? "../images/visaLogo.jpg"
            : "../images/mastercardLogo.png"
        }
        alt="card logo"
      />
      <Chip src="../images/cardChip.png" alt="card chip" />
      <CardNumbers>
        {cardNumber.length === 0
          ? "•••• •••• •••• ••••"
          : formatData(cardNumber)}
      </CardNumbers>
      <CardHolder>{cardHolder}</CardHolder>
      <ValidationMessage>
        Válido <br /> Hasta
      </ValidationMessage>
      <CardExpirationDate>
        {expirationDate.length === 0 ? "--/--" : formatDate(expirationDate)}
      </CardExpirationDate>
    </Container>
  );
}
