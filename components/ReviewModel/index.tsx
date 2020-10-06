import useState from "react";
import styled from "styled-components";
import ModalPortal from "components/Modal";

const CloseButton = styled.button`
`;

const TextArea = styled.button`
`;

const Button = styled.button`
`;

const Starts = styled.button`
`;

export default function ReviewModal() {
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            {showModal && <ModalPortal onClose={() => setShowModal(false)}>
                <CloseButton/>
                <h1>Valoración</h1>
                <Starts/>
                <h1>Comentario</h1>
                <TextArea/>
                <Button>Dejar Reseña</Button>
            </ModalPortal>}
        </div>
    )
  }