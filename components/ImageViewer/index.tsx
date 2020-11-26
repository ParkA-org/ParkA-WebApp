import { useRef } from "react";
import { Container, ImageBoxContainer, MainImage, ImageBox } from "./styles";

function ImageViewer({ pictures }: { pictures: Array<string> }) {
    const mainRef = useRef(null);

    const handleMouseEnter = (event) => {
        mainRef.current.src = event.target.src;
    };
    return (
        <Container>
            {pictures.length > 0 ?
                <>
                    <ImageBoxContainer>
                        {pictures.map(img => <ImageBox
                            src={img}
                            onMouseEnter={handleMouseEnter}
                        />)}
                    </ImageBoxContainer>
                    <MainImage src={pictures[0]} ref={mainRef} alt="imagen principal del parqueo" />
                </> : <MainImage src="/placeholders/park.png" alt="imagen principal del parqueo" />}
        </Container>
    );
}

export default ImageViewer;
