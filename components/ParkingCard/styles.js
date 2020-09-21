import styled from "styled-components"

export const Container = styled.div`
    display: grid;
    width: 80%;
    margin: 1em 0;
    grid-template-areas:
    "image header header ."
    "image information . ."
    "image information  button button";
    background: #fff;
    padding: 1em;
    box-shadow: 0px 20px 7px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    border: 5px solid #077187;

    @media(max-width: 768px) {
        margin: 0 auto;
        grid-template-areas:
        "image"
        "header"
        "information"
        "button";
    }

`;

export const CardImage = styled.img`
    grid-area: image;    
    width: 200px;
    height: 180px;
    margin: auto;
`;

export const CardHeader = styled.div`
    grid-area: header;
    display: flex;
    justify-content: space-around;
    align-items: center;
    & > h2 {
        font-size: 1.6rem;
        font-weight: bold;
        display: inline-block;
    }

    & > h4 { 
        font-weight: 600;
        font-size: 1.3rem;
        display: inline-block;
    }

    @media(max-width: 768px) {
        flex-direction: column;
    }
`;

export const CardInformation = styled.div`
    grid-area: information;
    text-align: left;
    & > h3 {
        font-weight: bold;
        font-size: 1.3rem;
    }

    & > p {
        font-size: 1.1rem;
    }

    
    @media(max-width: 768px) {
        text-align: center;
        
        & > h3 {
            margin-top: 1em;
        }
    }
`;

export const ButtonSection = styled.div`
    grid-area: button;
    display: flex;
    justify-content: space-around;
    @media(max-width: 768px) {
        margin-top: 1em;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
`;

export const ActionButton = styled.button`
    background-color: #077187;
    border-radius: 5px;
    color: white;
    width: 100px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5em;
    @media(max-width: 768px) {
        width: 60%;
        margin: 0.5em 0;
    }
`;