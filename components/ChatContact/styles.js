import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    width: 25vw;
    border-bottom: 2px solid #333;
`;

export const ContentContainer = styled.div`
    margin-left: 1em;
    display: flex;
    flex-direction: column;
    text-align: left;
    max-width: 70%;
    & > p {
        line-height: 1.3em;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;



export const ContactImage = styled.img`
    width: 75px;
    height: 75px;
    border-radius: 15px;
    margin-right: 1em;
`