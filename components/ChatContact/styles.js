import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    width: 100%;
`;

export const ContentContainer = styled.div`
    margin-left: 1em;
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    text-align: left;
    max-width: 85%;
    border-bottom: 2px solid #333;
    & > h4 {
        margin-bottom: 0.5em;
        margin-top: 0.5em;
    }
    & > p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 95%;
        line-height: 1.3em;
        margin-bottom: 1em;
    }
`;



export const ContactImage = styled.img`
    width: 75px;
    height: 75px;
    border-radius: 15px;
    margin-left: 1em;
    margin-top: 1em;
`