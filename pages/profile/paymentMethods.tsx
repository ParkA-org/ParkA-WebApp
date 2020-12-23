import { useContext, useEffect, useState } from "react";
import { Payment } from "utils/types";
import Carousel from "components/Carousel";
import Layout from "../layout";
import CreditCard from "components/CreditCard";
import PlusIcon from "components/Icons/Plus";
import { AiOutlineEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { DatePicker } from "rsuite";
import { useMutation } from "@apollo/client";
import { UPDATE_PAYMENT } from "mutations";
import { UserContext } from "context/UserContext";
import { GET_PAYMENTS } from "queries";
import { useQuery } from "@apollo/client";
import NavigationLink from "components/NavigationLink";

const PageContainer = styled.div`
  height: 88vh;
  width: auto;
  padding: 0 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const InformationSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #c4c4c4;
  padding: 2em;
  margin-top: 2em;
`;

const EliminateButton = styled.button`
  background-color: #f1526f;
  font-size: 1.2rem;
  color: #000;
  padding: 0.5em;
  border-radius: 10px;
`;

const CardInformation = styled.div`
  width: 60vw;
  margin-bottom: 2em;
  transition: max-height 0.2s ease-out;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 25px;

  & > input {
    background-color: #c4c4c4;
  }
`;

const NewLink = styled.h3`
  display: flex;
  justify-items: center;
  align-items: center;
  font-size: 1.5em;
  color: #0b768c;

  & > svg {
    margin-right: 0.5em;
  }
`;

const CardElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;

  & > p {
    font-size: 1.1rem;
  }
`;

export type PaymentsData = {
  getAllUserPayments: Payment[];
};

export default function PaymentMethods() {
  const { redirect, loading: userLoading, userStatus } = useContext(
    UserContext
  );

  useEffect(() => {
    redirect("/profile/paymentMethods");
  }, [userLoading]);

  const [newDate, setNewDate] = useState("");
  const [editDate, setEditDate] = useState(false);
  const [currentPayment, setPayment] = useState<Payment | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);

  const [UpdatePayment] = useMutation(UPDATE_PAYMENT, {
    onCompleted() {
      setEditDate(false);
    },
  });

  const formatDate = (data: string): string => {
    if (data.length === 5) return data;
    else return `${data.substr(5, 2)}/${data.substr(2, 2)}`;
  };

  const { error, data } = useQuery<PaymentsData>(GET_PAYMENTS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setPayments(data.getAllUserPayments);
    }
  }, [data]);

  if (error) return <h2>Error</h2>;

  if (userStatus === true) {
    return (
      <Layout pageTitle="Métodos de Pago">
        <PageContainer>
          <section className="HeaderSection">
            <h1 style={{ marginRight: "3em" }}>Métodos de pago</h1>
            <NavigationLink href="/register/PaymentInformation">
              <NewLink>
                <PlusIcon />
                Nuevo Método de Pago
              </NewLink>
            </NavigationLink>
          </section>
          <Carousel title="">
            {payments.map((payment) => {
              return (
                <CreditCard
                  onClick={() => setPayment(payment)}
                  cardNumber={payment.digit}
                  cardHolder={payment.cardHolder}
                  expirationDate={payment.expirationDate}
                  cardStyles={{ marginRight: "20px", minWidth: "450px" }}
                />
              );
            })}
          </Carousel>

          {currentPayment === null ? (
            <img src="/images/creditcards.svg" style={{ maxHeight: "40vh" }} />
          ) : (
            <InformationSection>
              <CardInformation>
                <CardElement>
                  <h4>Número de tarjeta</h4>
                  <p>{currentPayment.digit}</p>
                </CardElement>
                <CardElement>
                  <h4>Fecha de expiración</h4>
                  <div className="expirationContainer">
                    {editDate ? (
                      <>
                        <DatePicker
                          format="YYYY-MM-DD"
                          defaultValue={new Date(Date.now())}
                          onOk={(date) => setNewDate(date.toISOString())}
                        />
                        <AiOutlineCheck
                          size="2em"
                          style={{ marginLeft: "1em" }}
                          onClick={() => {
                            UpdatePayment({
                              variables: {
                                upV: {
                                  id: currentPayment.id,
                                  expirationDate: newDate,
                                },
                              },
                            });
                          }}
                        ></AiOutlineCheck>
                        <AiOutlineClose
                          size="2em"
                          style={{ marginLeft: "1em" }}
                          onClick={() => setEditDate(false)}
                        ></AiOutlineClose>
                      </>
                    ) : (
                      <>
                        <p style={{ fontSize: "2em" }}>
                          {formatDate(currentPayment.expirationDate)}
                        </p>
                        <AiOutlineEdit
                          size="2em"
                          style={{ marginLeft: "1em" }}
                          onClick={() => setEditDate(true)}
                        ></AiOutlineEdit>
                      </>
                    )}
                  </div>
                </CardElement>
                <CardElement>
                  <h4>Estado</h4>
                  <p>
                    {currentPayment.activated ? (
                      <span className="activated">Activada</span>
                    ) : (
                      <span>Desactivada</span>
                    )}
                  </p>
                </CardElement>
                <CardElement>
                  <h4>Nombre titular</h4>
                  <p>{currentPayment.cardHolder}</p>
                </CardElement>
                <CardElement>
                  <h4>Tipo</h4>
                  <p>{currentPayment.card.name}</p>
                </CardElement>
              </CardInformation>
              <EliminateButton>Eliminar método de pago</EliminateButton>
            </InformationSection>
          )}
          <style jsx>{`
            .activated {
              color: #009e19;
            }
            .HeaderSection {
              display: flex;
              justify-content: space-around;
              align-items: center;
              margin-top: 3em;
            }
            .expirationContainer {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            span {
              color: #fc0606;
            }
          `}</style>
        </PageContainer>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="">
      <h2>Cargando...</h2>
    </Layout>
  );
}
