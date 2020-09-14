import styled from "styled-components"

export const Container = styled.div`
    background-color: #F6F6F6;
    display: flex;
    width: 70vw;
    align-items: center;
    justify-content: space-around;

    @media(max-width: 768px) {
        flex-direction: column;
    }
`;

export const DataContainer = styled.div`
    font-size: 1.2rem;
    text-align: left;
    & > * {
        margin-bottom: 0.5em;
    }

    & > select {
        width: 200px;
    }
`;
