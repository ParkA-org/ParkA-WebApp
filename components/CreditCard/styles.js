import styled from "styled-components";

export const Container = styled.div`
  background-image: url("../images/cardBackground.png");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;
  background-position: center;
  color: white;
  width: 450px;
  height: 270px;
  display: grid;
  justify-items: center;
  grid-template-areas:
    ". . logo"
    "chip . ."
    "numbers numbers numbers"
    "name message expiration";
`;

export const Logo = styled.img`
  width: 40px;
  height: 40px;
  align-self: end;
  object-fit: contain;
  grid-area: logo;
  margin-top: 2em;
`;

export const Chip = styled.img`
  width: 50px;
  height: 50px;
  align-self: center;
  object-fit: contain;
  grid-area: chip;
  padding-right: 1em;
`;
export const CardNumbers = styled.pre`
  font-family: "Mulish";
  grid-area: numbers;
  font-weight: bold;
  color: #fff;
  font-size: 1.5rem;
  height: 30px;
  justify-self: center;
`;

export const ValidationMessage = styled.h4`
  display: inline-block;
  grid-area: message;
  padding-top: 5px;
  padding-bottom: 2em;
`;

export const CardHolder = styled.h3`
  display: inline-block;
  width: 10ch;
  grid-area: name;
  word-break: break-word;
`;

export const CardExpirationDate = styled.h3`
  display: inline-block;
  padding-top: 10px;
  grid-area: expiration;
  justify-self: start;
`;
