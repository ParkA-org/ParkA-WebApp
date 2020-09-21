import { useRef, useState } from "react"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"
import { MdPlayArrow } from "react-icons/md"
import { Container, CarouselContainer, ScrollSection, LeftSide, RightSide, LeftButton, RightButton, LeftSideBack, RightSideBack } from "./styles"

export default function Carousel({ title, children }: { title: string, children: React.ReactNode }) {
    const scrollRef = useRef(null)
    const [scrollDistance, setScrollDistance] = useState(0)
    const scrollAction = (direction: string) => {
        let maxDistance = (scrollRef.current.scrollWidth / 2) + (scrollRef.current.offsetLeft * 2);
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
                <LeftSideBack />
                <LeftSide>
                    <LeftButton onClick={() => scrollAction("LEFT")}>
                        <MdPlayArrow size="3em" color="#0B768C" style={{ transform: "rotate(180deg)" }} />
                        {/* <BiLeftArrow size="4em" color="#0B768C" /> */}
                    </LeftButton>
                </LeftSide>
                <ScrollSection ref={scrollRef} id="scrollSection">
                    {children}
                </ScrollSection>
                <RightSideBack />
                <RightSide>
                    <RightButton onClick={() => scrollAction("RIGHT")}>
                        {/* <BiRightArrow size="4em" color="#0B768C"/> */}
                        <MdPlayArrow size="3em" color="#0B768C" />
                    </RightButton>
                </RightSide>
            </CarouselContainer>
        </Container>
    )
}