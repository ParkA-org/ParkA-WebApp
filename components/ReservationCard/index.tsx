import React, { useState } from "react"
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "mutations"
import { CreateReviewSchema } from "utils/schemas"
import ModalPortal from "components/Modal"
import Link from "next/link"
import { BsStarFill, BsStar, BsCardList, BsMap } from "react-icons/bs"
import { BiMessageDetail } from "react-icons/bi"
import Field, { SelectField } from "components/Field"
import { Reservation, ReservationStatuses, ReviewInput } from "utils/types"
import { formatAMPM, parseISOString } from "utils/functions"
import {
    Container,
    ReservationImage,
    MetadataSection,
    CostSection,
    ButtonSection,
    ReservationsButton,
    ActionButtonsSection,
    Item,
    SpecialReservationsButton,
    Button,
    ModalContent
} from "./styles"

export default function ReservationCard({ id, checkInDate, checkOutDate, status, total, parking, client }: Reservation) {
    const isCancelable = status === ReservationStatuses.Created ? true : false
    const parkingImage = parking.mainPicture
    const [showModal, setShowModal] = useState(false)

    let dateObj = parseISOString(checkInDate), outDateObj = parseISOString(checkOutDate)

    return (
        <>
            <Container>
                <ReservationImage src={parkingImage} />
                <MetadataSection>
                    <Item>
                        <h3>Fecha</h3>
                        <p>{dateObj.toLocaleDateString('es-ES')}</p>
                    </Item>
                    <Item>
                        <h3>Desde</h3>
                        <p>{formatAMPM(dateObj)}</p>
                    </Item>
                    <Item>
                        <h3>Hasta</h3>
                        <p>{formatAMPM(outDateObj)}</p>
                    </Item>
                </MetadataSection>
                <CostSection>
                    <h3>Costo</h3>
                    <p>{`${total} $RD`}</p>
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
                    <ReservationForm parking={parking.id} reservation={id} user={client.id} />
                </ModalContent>
            </ModalPortal>}
        </>

    )
}

function ReservationForm({ parking, reservation, user }: ReviewInput) {

    const [CreateReview, { loading, error }] = useMutation(CREATE_REVIEW)

    const stars = [1, 2, 3, 4, 5]
    const graphicStars = (amountSelected) => {
        let res = []
        for (let i = 0; i < 5; i++) {
            if (i < amountSelected) {
                res.push(<BsStarFill fill="#D8DC2A" size="1.5em" />)
            } else {
                res.push(<BsStar fill="#D8DC2A" size="1.5em" />)
            }
        }
        return res
    }
    return (
        <Formik
            initialValues={{
                title: "",
                review: "",
                calification: 0
            }}
            validationSchema={CreateReviewSchema}
            onSubmit={(values) => {
                CreateReview({
                    variables: {
                        crI: {
                            parking,
                            reservation,
                            user,
                            title: values.title,
                            review: values.review,
                            calification: parseFloat(values.calification.toString()),
                            type: false
                        }
                    }
                })
            }}>
            {({ errors, touched, values }) => (
                <Form>
                    <SelectField name="calification" label="Calificación" placeholder="Calificacion" placement="vertical" errorMessage={errors.calification} isTouched={touched.calification} value={values.calification.toString()}>
                        {stars.map(score => <option value={score} key={score}>{score}</option>)}
                    </SelectField>
                    <div className="starContainer">
                        {values.calification > 0 && graphicStars(values.calification)}
                    </div>
                    <Field label="Título" name="title" errorMessage={errors.title} isTouched={touched.title} placeholder="Título" placement="vertical" value={values.title} />
                    <Field label="Reseña" name="review" errorMessage={errors.review} isTouched={touched.review} placeholder="Reseña" placement="vertical" value={values.review} component="textarea" />
                    <Button submit={true}>Dejar Reseña</Button>
                </Form>
            )}
        </Formik>
    )
}