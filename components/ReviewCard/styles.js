import styled from "styled-components"

export const Container = styled.div`
    background: #fff;
    margin-right: 2em;
    border-radius: 20px;
    flex-shrink: 0;
    width: 25vw;
    height: auto;
    padding: 0.5em;
    display: grid;
    grid-template-areas:
    "photo details details date"
    "title title title title"
    "content content content content"
    ". . action action";
    justify-items: center;
    border: 2px solid #0B768C;
    margin-bottom: 25px;
    box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.20);
    -webkit-box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.20);
    -moz-box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.20);
`

export const ModalContainer = styled(Container)`
    width: 35vw;
    height: auto;
    margin: 1em;
    border: none;
    box-shadow: none;
    align-items: center;
`

export const Avatar = styled.img`
    grid-area: photo;
    width: 75px;
    height: 75px;
    border-radius: 20px;
    margin: auto 1em;
`;

export const ModalLink = styled.a`
    grid-area: action;
    color: #077187;
    margin: 0.25em;
    font-size: 1.25rem;

    &:hover {
        cursor: pointer;
    }
`

export const UserInfo = styled.div`
    grid-area: details;    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    & > h3 {
        font-size: 1.4rem;
        font-weight: bold;
    }
`;

export const ReviewDate = styled.p`
    grid-area: date;
    font-size: 1rem;
    font-style: italic;
    color: rgba(0,0,0,0.8);
`;


export const ReviewTitle = styled.h3`
    grid-area: title;
    font-size: 1rem;
    text-align: left;
    max-width: 90%;
    margin: 0.25em 0.25em 0.25em 0.5em;
    overflow: hidden;
    white-space: nowrap;
    word-wrap: break-word;
    text-overflow: ellipsis;
    line-height: 1.5em;
`

export const Text = styled.p`
    grid-area: content;
    font-size: 1rem;
    width: 80%;
    text-align: left;
    margin: 0.25em 0.25em 0.25em 0.5em;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ModalText = styled(Text)`
    height: 30vh;
    text-overflow: initial;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: scroll;
`

export const ModalTitle = styled(ReviewTitle)`
    width: 80%;
    margin: 0.5em 0;
    white-space: normal;
    word-wrap: normal;
    text-overflow: string;
`



