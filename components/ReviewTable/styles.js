import styled from "styled-components"

export const Container = styled.div`
    background: #fff;
    margin-top: 2em;
    border-radius: 20px;
    flex-shrink: 0;
    width: auto;
    height: auto;
    padding: 0 1em 1em 1em;
    box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.20);
    -webkit-box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.20);
    -moz-box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.20);
`

export const ModalContainer = styled.div`
    background: #fff;
    border-radius: 20px;
    flex-shrink: 0;
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
    width: 35vw;
    height: auto;
    margin: 1em;
    border: none;
    box-shadow: none;
    align-items: center;
`

export const Avatar = styled.img`
    grid-area: photo;
    width: 175px;
    height: 175px;
    border-radius: 40%;
    margin: auto 1em auto 2em;
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
        font-size: 1.6rem;
        font-weight: bold;
    }
`;

export const ReviewDate = styled.p`
    grid-area: date;
    font-size: 1.4rem;
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
    overflow-y: auto;
    font-size: 1.5rem;
`

export const ModalTitle = styled(ReviewTitle)`
    width: 80%;
    margin: 0.5em 0;
    white-space: normal;
    word-wrap: normal;
    text-overflow: string;
    font-size: 1.7rem;
`

export const TableHeader = styled.th`
    background: #fff;
    padding: 0.5em;
    color: rgba(15,15,15,.6);
    font-size: 1.5rem;
    font-family: Montserrat;
    text-align: left;
    font-weight: bold;
`

export const TableCell = styled.td`
    font-size: 1.3rem;
    padding-right: 30px;
    padding-top: 20px;
    background: #fff;
    color: #077187;
    text-align: left;
`

export const TableRow = styled.tr`
    background-color: #fff; 
    
    &:hover {
        background-color: #3c3f43;
        cursor: pointer;
    }
`

export const ReviewBody = styled.p`
    max-height: 150px;
    max-width: 350px;
    text-overflow: initial;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
`