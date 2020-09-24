import styled from "styled-components"

export const Container = styled.div`
    width: 70%;
    height: 80vh;
    display: flex;
    flex-direction: column;
`;

export const TopNav = styled.section`
    width: 100%;
    background-color: #f6f6f6;
    display: flex;
    justify-content: flex-start;
`;

export const ContentContainer = styled.section`
    background-color: #42f7e8;
    flex-grow: 3;
`;

export const ChatButtons = styled.section`
    display: flex;
`;

export const ChatInput = styled.input`
    flex-grow: 2;
    border-radius: 15px;
    padding: 0.5em;
`;