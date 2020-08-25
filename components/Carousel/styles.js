import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    & > h1 {
        margin-bottom: 1em;
    }
`;

export const ScrollSection = styled.section`
    display: flex;
    flex-wrap: nowrap;
    max-width: 1080px;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar; 
`;