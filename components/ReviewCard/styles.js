import styled from "styled-components"

export const Container = styled.div`
    background: #fff;
    border-radius: 30px;
    width: 25vw;
    padding: 1em;
    display: grid;
    grid-template-areas:
    "photo details date"
    "content content content";
`

export const Avatar = styled.img`
    grid-area: photo;
    width: 55px;
    height: 55px;
    border-radius: 5px;
`;

export const UserInfo = styled.div`
    grid-area: details;    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > h3 {
        font-size: 1.5rem;
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
`;


