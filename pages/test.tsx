import { useContext, useState } from "react"
import Layout from "./layout";
import ModalPortal from "components/Modal"
import ProfileDropDownMenu from "components/ProfileDropDownMenu";
import styled from "styled-components";

const CloseButton = styled.button`
`;

const TextArea = styled.textarea`
`;

const Button = styled.button`

`;

const Starts = styled.div`
`;


export default function Test(): JSX.Element {
  const [showModal, setShowModal] = useState(false)

  return (
    <Layout pageTitle="Test">
      <button onClick={() => {setShowModal(true)}} >Mostrar Modal
      </button>
      {showModal && <ModalPortal onClose={() => setShowModal(false)}>
      <CloseButton/>
                <h1>Valoración</h1>
                <Starts/>
                <h1>Comentario</h1>
                <TextArea/>
                <Button>Dejar Reseña</Button>
      </ModalPortal>}
    </Layout>
  );
}
