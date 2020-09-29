import styled from "styled-components"

export const Container = styled.div`
    width: 70%;
    height: 80vh;
    display: flex;
    flex-direction: column;
`;

export const TopNav = styled.section`
    background-color: #f0f0f0;
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

export const ScrollContainer = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: scroll;
`;

export const ContentContainer = styled.section`
    background-color: #42f7e8;
    flex-grow: 3;
    flex: 1;
    min-height: 0px;
    height: auto;
    overflow: hidden;
`;

export const OverflowContentContainer = styled.div`
    flex: 1;
    overflow: auto;
`;

export const OverflowContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 65vh;
    & > p {
        flex-shrink: 0;
        height: auto;
        max-height: 75px;
        width: 40%;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0.5em;
        border-radius: 15px;
    }
`;

export const ChatButtons = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #f0f0f0;
    padding: 0.5em;

    & > * {
        cursor: pointer;
    }
`;

export const ChatInput = styled.input`
    border-radius: 15px;
    padding: 0.5em;
    width: 85%;
`;