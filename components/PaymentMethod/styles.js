import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MainContainer = styled.div`
    background-color: #fff;
    padding-top: 2em;
    display: flex;
    width: 100%;
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
    padding: 2em auto 0 auto;
    text-align: center;
    width: 100%;
    padding: 3em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    h3 {
        display: inline-block;
        margin-right: 1em;
    }
`;

export const StyledInput = styled.input`
    background-color: #f6f6f6;
    padding: 0.5em;
    border-radius: 5px;
`;  