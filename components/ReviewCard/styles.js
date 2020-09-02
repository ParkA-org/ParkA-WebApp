import styled from "styled-components"

export const Container = styled.div`
    background: #fff;
    margin-right: 2em;
    border-radius: 20px;
    flex-shrink: 0;
    width: 30vw;
    padding: 0.5em;
    display: grid;
    grid-template-areas:
    "photo details date"
    "content content content";
    border: 2px solid #0B768C;
`

export const Avatar = styled.img`
    grid-area: photo;
    width: 75px;
    height: 75px;
    border-radius: 5px;
    margin: 0 auto;
`;

export const UserInfo = styled.div`
    grid-area: details;    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    & > h3 {
        font-size: 1.4rem;
        font-weight: bold;
    }
`;

export const ReviewDate = styled.p`
    grid-area: date;
    font-size: 1rem;
    color: rgba(0,0,0,0.8);
`;

export const Text = styled.p`
    grid-area: content;
    font-size: 1.2rem;
    width: 80%;
    margin: 1em auto;
`;


