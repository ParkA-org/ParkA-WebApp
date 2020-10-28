import styled from "styled-components"

export const Container = styled.div`
    background: #fff;
    margin-right: 2em;
    border-radius: 20px;
    flex-shrink: 0;
    width: 20vw;
    height: auto;
    padding: 0.5em;
    display: grid;
    grid-template-areas:
    "photo details details date"
    "content content content content";
    border: 2px solid #0B768C;
    margin-bottom: 25px;
    box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.20);
    -webkit-box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.20);
    -moz-box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.20);
`

export const Avatar = styled.img`
    grid-area: photo;
    width: 100px;
    height: 100px;
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
    font-style: italic;
    color: rgba(0,0,0,0.8);
`;

export const Text = styled.p`
    grid-area: content;
    font-size: 1.2rem;
    width: 80%;
    text-align: left;
    margin: 1em auto;
    overflow: hidden;
    text-overflow: ellipsis;
`;


