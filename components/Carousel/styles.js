import styled from "styled-components"

export const Container = styled.div`
    margin: 1em 0;
    & > h1 {
        margin-bottom: 1em;
    }
`;

export const CarouselContainer = styled.div`
    width: 1080px;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 1fr;
    justify-items: center;
    align-items: center;
`;

export const ScrollSection = styled.section`
    grid-column: 1 / span 3;
    grid-row: 1;
    place-self: center stretch;
    display: flex;
    flex-wrap: nowrap;
    width: auto;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const LeftSide = styled.div`
    width: 100%;
    height: 100%;
    grid-column: 1;
    //background-color: rgba(33, 33, 33, 0.4);
    grid-row: 1;
    z-index: 5;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
`;

export const LeftButton = styled.button`
    backdrop-filter: blur(2px);
    grid-column: 1;
    grid-row: 1;
    border-radius: 50%;
    width: 65px;
    height: 65px;
    padding: 0.5em;
    border: 2px solid #333;
    z-index: 10;
`;

export const RightSide = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 3;
    grid-row: 1;
    z-index: 10;
`;

export const RightButton = styled.button`
    border-radius: 50%;
    width: 65px;
    height: 65px;
    padding: 0.5em;
    border: 2px solid #333;
`;