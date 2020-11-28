import { CSSProperties } from "react"
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
  cardStyles?: CSSProperties;
  cvv?: string;
  onClick?: () => void;
};

export default function CreditCard({
  cardNumber,
  cardHolder,
  expirationDate,
  cardStyles,
  onClick
}: CardProps): JSX.Element {

  const formatNumbers = (data: string): string => {
    return `•••• •••• •••• ${data.substr(data.length - 4)}`
  }

  const formatDate = (data: string): string => {
    if (data.length === 5)
      return data
    else
      return `${data.substr(5, 2)}/${data.substr(2, 2)}`;
  };

  return (
    <Container style={cardStyles} onClick={onClick}>
      <Logo
        src={
          cardNumber[0] === "4"
            ? "/images/visaLogo.jpg"
            : "/images/mastercardLogo.png"
        }
        alt="card logo"
      />
      <Chip src="/images/cardChip.png" alt="card chip" />
      <CardNumbers>
        {cardNumber.length === 0
          ? "•••• •••• •••• ••••"
          : formatNumbers(cardNumber)}
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
