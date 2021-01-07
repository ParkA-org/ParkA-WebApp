import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import ModalPortal from "components/Modal";
import Spinner from "components/Spinner";
import { GET_USER_PAYMENTS } from "queries";
import {
  CREATE_RESERVATION,
  UPDATE_RESERVATION,
  CANCEL_RESERVATION,
} from "mutations";
import NavigationLink from "components/NavigationLink";
import CreditCard from "components/CreditCard";
import Button from "components/Button";
import {
  Container,
  MainContainer,
  DataContainer,
  StyledSelect,
} from "./styles";
import { ReservationInput, Payment } from "utils/types";

type ComponentProps = {
  checkout: ReservationInput;
  setCheckout: React.Dispatch<React.SetStateAction<ReservationInput>>;
};

type AllPaymentsData = {
  getAllUserPayments: Payment[];
};

export default function PaymentMethod({
  checkout,
  setCheckout,
}: ComponentProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [
    CreateReservation,
    { loading: loadingCreation, error: errorCreation },
  ] = useMutation(CREATE_RESERVATION, {
    onCompleted() {
      router.push("/reservations");
    },
  });

  const [UpdateReservation] = useMutation(UPDATE_RESERVATION, {
    onCompleted() {
      setShowModal(false);
      router.push("/reservations");
    },
  });

  const [CancelReservation] = useMutation(CANCEL_RESERVATION, {
    onCompleted() {
      setShowModal(false);
      router.push("/reservations");
    },
  });
  const [payment, setPayment] = useState<Payment>();
  const { loading, error, data } = useQuery<AllPaymentsData>(
    GET_USER_PAYMENTS,
    {
      onCompleted() {
        if (data && data.getAllUserPayments.length) {
          setCheckout({
            ...checkout,
            paymentInfo: data.getAllUserPayments[0].id,
          });
          setPayment(data.getAllUserPayments[0]);
        }
      },
    }
  );

  useEffect(() => {
    let url = router.pathname;
    if (url.includes("edit")) {
      setEditMode(true);
    }
  }, []);

  const formatNumbers = (data: string): string => {
    return `•••• •••• •••• ${data.substr(data.length - 4)}`;
  };

  if (loading) return <h2>Cargando los metodos de pago...</h2>;

  if (error) return <h3>Paso algo</h3>;

  if (data && data.getAllUserPayments.length == 0) {
    return (
      <>
        <h3>Aún no tienes un método de pago registrado</h3>
        <NavigationLink href="/payment">Ir a metodos de pago</NavigationLink>
      </>
    );
  }

  const handlePaymentClick = () => {
    setShowModal(true);
    CreateReservation({
      variables: {
        crI: {
          ...checkout,
        },
      },
    });
  };

  const handleCancelClick = () => {
    CancelReservation({
      variables: {
        caI: {
          id: router.query.id,
        },
      },
    });
  };
  const handleEditClick = () => {
    UpdateReservation({
      variables: {
        urInput: {
          where: {
            id: router.query.id,
          },
          data: {
            checkInDate: checkout.checkInDate,
            checkOutDate: checkout.checkOutDate,
            vehicle: checkout.vehicle,
            paymentInfo: checkout.paymentInfo,
            rentDate: checkout.rentDate,
            total: checkout.total,
          },
        },
      },
    });
  };

  return (
    <Container>
      <MainContainer>
        {payment && (
          <CreditCard
            expirationDate={payment.expirationDate}
            cardHolder={payment.cardHolder}
            cardNumber={payment.digit}
          />
        )}
        <DataContainer>
          <div>
            <h2>
              <b>Método de Pago</b>
            </h2>
            <StyledSelect
              style={{ width: "auto" }}
              onChange={(e) => {
                const { target } = e;
                const { value } = target;
                const selectedPayment = data.getAllUserPayments.find(
                  (payment) => payment.id === value
                );
                setCheckout({ ...checkout, paymentInfo: selectedPayment.id });
                setPayment(selectedPayment);
              }}
            >
              {data &&
                data.getAllUserPayments.map((payment) => (
                  <option key={payment.id} value={payment.id}>
                    {formatNumbers(payment.digit)}
                  </option>
                ))}
            </StyledSelect>
            {payment && (
              <>
                <p>
                  <b>Número de Tarjeta</b>
                </p>
                <p>{formatNumbers(payment.digit)}</p>
                <p>
                  <b>Tipo</b>
                </p>
                <p>{payment.card.name}</p>
              </>
            )}
          </div>
        </DataContainer>
      </MainContainer>
      {editMode ? (
        <section style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            rank="secondary"
            styles={{
              margin: "0 auto",
              fontSize: "1.5rem",
            }}
            onClick={handleCancelClick}
          >
            Cancelar reserva
          </Button>
          <Button
            rank="secondary"
            styles={{ margin: "0 auto", fontSize: "1.5rem" }}
            onClick={handleEditClick}
          >
            Editar reserva
          </Button>
        </section>
      ) : (
        <Button
          rank="secondary"
          styles={{ margin: "0 auto", fontSize: "1.5rem" }}
          onClick={handlePaymentClick}
        >
          Procesar Pago
        </Button>
      )}
      {showModal && (
        <ModalPortal onClose={() => setShowModal(false)}>
          <Spinner />
          <h3>Cargando...</h3>
        </ModalPortal>
      )}
    </Container>
  );
}
