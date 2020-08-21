import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 70vw;
    margin: 0 auto;
    text-align: left;
    justify-content: flex-start;
`;

export const ContentContainer = styled.div`
    display: grid;
    grid-template-areas:
    "image content reservations"
    "image content reservations";
    justify-items: stretch;
    align-items: center;
    grid-gap: 1em;
    @media (max-width: 768px) {
        grid-template-areas:
        "image"
        "content"
        "reservations";
    }
`;

export const ProfilePicture = styled.img`
    grid-area: image;
    border-radius: 30px;
    filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25));
    width: 250px;
    height: 250px;
`;

export const CircularButton = styled.button`
    grid-area: reservations;
    border-radius: 50%;
    border: 5px solid ${props => props.color};
    color: ${props => props.color};
    filter: drop-shadow(0px 20px 10px rgba(0,0,0,0.25));
    width: 150px;
    height: 150px;
    font-size: 1.2em;

    & > p {
        font-size: 1.5em;
        font-weight: bold;
    }
`;

export const ContentSection = styled.section`
    grid-area: content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    height: 100%;
`;

export const ContentRow = styled.div`
margin-bottom: 1em;
    & > h3 {
        font-size: 1.5em;
        font-weight: 800;
    }
    & > h4 {
        font-size: 1.2em;
    }
`;