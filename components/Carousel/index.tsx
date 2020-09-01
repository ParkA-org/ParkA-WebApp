import { useRef, useState } from "react"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"
import { Container, CarouselContainer, ScrollSection, LeftSide, RightSide, LeftButton, RightButton } from "./styles"

export default function Carousel({ title, children }: { title: string, children: React.ReactNode }) {
    const scrollRef = useRef(null)
    const [scrollDistance, setScrollDistance] = useState(0)
    const scrollAction = (direction: string) => {
        let maxDistance = scrollRef.current.scrollLeftMax;
        let newDistance = direction === "RIGHT" ? scrollDistance + 300 : scrollDistance - 300;
        if (newDistance < 0) {
            newDistance = maxDistance;
        } else if (newDistance > maxDistance) {
            newDistance = 0;
        }
        scrollRef.current.scroll({
            left: newDistance,
            behavior: 'smooth'
        })
        setScrollDistance(newDistance)
    }

    return (
        <Container>
            <h1>{title}</h1>
            <CarouselContainer>
                <LeftSide />
                <LeftButton onClick={() => scrollAction("LEFT")}><BiLeftArrow size="3em" /></LeftButton>
                <ScrollSection ref={scrollRef} id="scrollSection">
                    {children}
                </ScrollSection>
                <RightSide>
                    <RightButton onClick={() => scrollAction("RIGHT")}><BiRightArrow size="3em" /></RightButton>
                </RightSide>
            </CarouselContainer>
        </Container>
    )
}