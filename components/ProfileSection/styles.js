import styled from "styled-components"

export const ProfileContainer = styled.div`
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: flex-start;
    @media (max-width: 768px) {
        align-items: center;
        text-align: center;
    }

`;

export const ContentContainer = styled.div`
    display: grid;
    grid-template-areas:
    "image content content reservations"
    "image content content reservations";
    justify-items: center;
    align-items: center;
    @media (max-width: 768px) {
        grid-template-areas:
        "image"
        "content"
        "reservations";
        justify-items: center;
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
    width: 170px;
    height: 170px;
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
    justify-self: stretch;

`;

export const ContentRow = styled.div`
margin-bottom: 1em;
    & > h3 {
        font-size: 2rem;
        font-weight: 800;
    }
    & > h4 {
        font-size: 1.5rem;
        font-weight: normal;
    }
`;

export const EditButton = styled.button`
    color: white;
    background: #077187;
    border-radius: 5px;
    font: light 1.2rem "Righteous";
    padding: 0.5em 2em;
`