import styled from "styled-components"

export const Container = styled.div`
    width: 70%;
    height: 80vh;
    display: flex;
    flex-direction: column;
`;

export const TopNav = styled.section`
    background-color: #d2d6d3;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5em;
    & >  img {
        width: 50px;
        height: 50px;
        margin-right: 2em;
    }
`;

export const ContentContainer = styled.section`
    background-color: #42f7e8;
    flex-grow: 3;
`;

export const ChatButtons = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #d2d6d3;
    padding: 0.25em;

    & > * {
        cursor: pointer;
    }
`;

export const ChatInput = styled.input`
    border-radius: 15px;
    padding: 0.5em;
    width: 85%;
`;