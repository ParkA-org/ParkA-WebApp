import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MainContainer = styled.div`
    margin-top: 2em;
    background-color: #F6F6F6;
    display: flex;
    width: 70vw;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;

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
        background-color: #e5e4e4;
    }
`;

export const CTASection = styled.div`
    margin: 3em auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    h3 {
        display: inline-block;
        margin-right: 1em;
    }
`;