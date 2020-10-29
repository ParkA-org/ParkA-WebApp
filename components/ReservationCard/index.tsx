import {
    Container,
    ReservationImage,
    MetadataSection,
    CostSection,
    ButtonSection,
    ReservationsButton,
    ActionButtonsSection,
    Item,
    SpecialReservationsButton
} from "./styles"
import Link from "next/link"
import { BsStarFill, BsStarHalf, BsStar, BsCardList, BsMap } from "react-icons/bs"
import { BiMessageDetail } from "react-icons/bi"

import React, { useState } from "react"
import ModalPortal from "components/Modal"
import styled from "styled-components"
const TextArea = styled.textarea`
  resize: none;
  border:solid;
  width: 500px;
  height: 170px;
  border-color: #C4C4C4;
  border-width:0.3px

`;

const Button = styled.button`
  background-color: #59BCA7;
  color:white;
  padding: 15px;
  border-radius: 1.5em;
  margin-top: 0.5em;
  width: 200px;
  align-self: center;
  font-size: 1.4rem;
`;

const ModalContent = styled.div`
  text-align:left;
  display:flex;
  flex-direction: column;
  justify-content: space-around;
`;
export default function ReservationCard({ isCancelable }: { isCancelable?: boolean }) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <Container>
                <ReservationImage src="/placeholders/park-placeholder.png" />
                <MetadataSection>
                    <Item>
                        <h3>Fecha</h3>
                        <p>20 Jun 2020</p>
                    </Item>
                    <Item>
                        <h3>Desde</h3>
                        <p>08:00 PM</p>
                    </Item>
                    <Item>
                        <h3>Hasta</h3>
                        <p>11:00 PM</p>
                    </Item>
                </MetadataSection>
                <CostSection>
                    <h3>Costo</h3>
                    <p>350.00 $RD</p>
                </CostSection>
                <ButtonSection>
                    {isCancelable ?
                        <SpecialReservationsButton isCancelable>Cancelar</SpecialReservationsButton> : <SpecialReservationsButton onClick={() => {
                            setShowModal(true)
                        }}>Dejar reseña</SpecialReservationsButton>}

                    <ActionButtonsSection>
                        {isCancelable ?
                            <ReservationsButton>
                                <BsMap size="1.5em" />
                                <Link href="/map"><a style={{ color: "white", textDecoration: "none" }}>Ver en mapa</a></Link>
                            </ReservationsButton>
                            :
                            <ReservationsButton><BsCardList size="1.5em" /> <Link href="/parking/detail"><a style={{ color: "white", textDecoration: "none" }}>Detalles</a></Link></ReservationsButton>
                        }
                        <ReservationsButton><BiMessageDetail size="1.5em" /><Link href="/chat"><a style={{ color: "white", textDecoration: "none" }}>Mensajear</a></Link></ReservationsButton>
                    </ActionButtonsSection>
                </ButtonSection>
            </Container>
            {showModal && <ModalPortal onClose={() => setShowModal(false)}>
                <ModalContent>
                    <h4>Valoración</h4>
                    <div className="starContainer">
                        <BsStarFill fill="#D8DC2A" size="1.5em" />
                        <BsStarFill fill="#D8DC2A" size="1.5em" />
                        <BsStarFill fill="#D8DC2A" size="1.5em" />
                        <BsStarHalf fill="#D8DC2A" size="1.5em" />
                        <BsStar fill="#D8DC2A" size="1.5em" />
                    </div>
                    <h4>Comentario</h4>
                    <TextArea />
                    <Button>Dejar Reseña</Button>
                </ModalContent>
            </ModalPortal>}
        </>

    )
}