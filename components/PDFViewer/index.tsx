
import styled from "styled-components";

const Container = styled.div``;

export default function PDFViewer() {
  return (
    <Container>
      <embed
        src="./politica-de-privacidad.pdf"
        type="application/pdf"
        style={{ width: "100%", height: "100%" }}
      />
    </Container>
  );
}
