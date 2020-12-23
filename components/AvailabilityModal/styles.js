import styled from "styled-components"

export const ModalContainer = styled.div`
    width: 35vw;
    height: auto;
    margin: 1em;
    border: none;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 5;
`

export const ModalTitle = styled.h3`
    width: 80%;
    margin: 0.5em 0;
    white-space: normal;
    word-wrap: normal;
    text-overflow: string;
`

export const TimeSection = styled.section`
    display: flex;
    justify-content: space-around;
    width: 90%;
    & > div {
        width: 40%;
    }
`


