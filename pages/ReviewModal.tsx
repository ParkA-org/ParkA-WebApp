import { useContext, useState } from "react"
import Layout from "./layout";
import ModalPortal from "components/Modal"
import ProfileDropDownMenu from "components/ProfileDropDownMenu";
import styled from "styled-components";

const TextArea = styled.textarea`
  resize: none;
  border:solid;
  width: 300px;
  height: 170px;
  border-color: #C4C4C4;
  border-width:0.3px

`;

const Button = styled.button`
  background-color: #59BCA7;
  color:white;
  padding: 15px;
  border-radius: 1.5em;
`;

const Stars = styled.div`
  font-size: 25px;
  color: #C4C4C4;
  & > .checked{
    color: #D8DC2A;
  }
`;

const ModalContent = styled.div`
  text-align:left;
  display:block;

`;

export default function ReviewModal(): JSX.Element {
  const [showModal, setShowModal] = useState(false)

  return (
    <Layout pageTitle="ReviewModal">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <button onClick={() => {setShowModal(true)}} >Mostrar Modal
      </button>
      {showModal && <ModalPortal onClose={() => setShowModal(false)}>
        <ModalContent>
          <h4>Valoración</h4>
          <Stars>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
          </Stars>
          <h4>Comentario</h4>
          <TextArea/>
          <Button>Dejar Reseña</Button>
        </ModalContent>
      </ModalPortal>}
    </Layout>
  );
}
