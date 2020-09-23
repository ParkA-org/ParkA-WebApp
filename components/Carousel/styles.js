import styled from "styled-components"

export const Container = styled.div`
    margin: 1em 0;
    & > h1 {
        margin-bottom: 1em;
    }
`;

export const CarouselContainer = styled.div`
    max-width: 1080px;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 1fr;
    justify-items: center;
    align-items: center;
    width: 100%;
`;

export const ScrollSection = styled.section`
    grid-column: 2;
    grid-row: 1;
    place-self: center stretch;
    display: flex;
    flex-wrap: nowrap;
    width: auto;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none; 
    scrollbar-width: none; 
    &::-webkit-scrollbar {
        display: none;
    }
    @media(max-width: 768px) {
        overflow-x: scroll;
        scrollbar-width: auto; 
       
    }
`;

export const LeftSide = styled.div`
    width: 100%;
    height: 100%;
    grid-column: 1;
    grid-row: 1;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    @media(max-width: 768px) {
        display: none;
    }
`;

export const LeftSideBack = styled.div`
    filter: blur(8px);
    -webkit-filter: blur(8px);
    background-color: rgba(255,255,255, 0.6);
    width: 100%;
    height: 100%;
    grid-column: 1;
    grid-row: 1;
`;

export const LeftButton = styled.button`
    grid-column: 1;
    grid-row: 1;
    border-radius: 50%;
    width: 65px;
    height: 65px;
    padding: 0.5em;
    z-index: 10;
    @media(max-width: 768px) {
        display: none;
    }
`;

export const RightSide = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 3;
    grid-row: 1;
    z-index: 5;
    @media(max-width: 768px) {
        display: none;
    }
`;


export const RightSideBack = styled.div`
    filter: blur(8px);
    -webkit-filter: blur(8px);
    background-color: rgba(255,255,255, 0.6);
    width: 100%;
    height: 100%;
    grid-column: 3;
    grid-row: 1;
`;

export const RightButton = styled.button`
    border-radius: 50%;
    width: 65px;
    height: 65px;
    padding: 0.5em;
    @media(max-width: 768px) {
        display: none;
    }
`;