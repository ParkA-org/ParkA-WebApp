import { useRef } from "react";
import { Container, ImageBoxContainer, MainImage, ImageBox } from "./styles";

function ImageViewer() {
    const mainRef = useRef(null);

    const handleMouseEnter = (event) => {
        mainRef.current.src = event.target.src;
    };
    return (
        <Container>
            <ImageBoxContainer>
                <ImageBox
                    src={"/placeholders/car-placeholder.png"}
                    onMouseEnter={handleMouseEnter}
                />
                <ImageBox
                    src={"/placeholders/image-placeholder.png"}
                    onMouseEnter={handleMouseEnter}
                />
                <ImageBox
                    src={"/placeholders/park-placeholder.jpg"}
                    onMouseEnter={handleMouseEnter}
                />
                <ImageBox src={"/placeholders/park-placeholder.jpg"} onMouseEnter={handleMouseEnter} />
            </ImageBoxContainer>
            <MainImage src={"/placeholders/park-placeholder.jpg"} ref={mainRef} />
        </Container>
    );
}

export default ImageViewer;
