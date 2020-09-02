import styled from "styled-components"

export const Container = styled.section`
    magin: 1em 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 20vh;
    background-color: #f4f4f4;   
    padding: 1em;
`;

export const ItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 50%;
`;

export const Item = styled.div`
    margin-bottom: 0.5em;

    & > h3 {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & > h3 > svg {
        margin: 0 0.35em;
    }
    & > p {
        font-size: 1.2rem;
    }
`;

export const ChartContainer = styled.div``
