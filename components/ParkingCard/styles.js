import styled from "styled-components"

export const Container = styled.div`
    display: grid;
    width: 80%;
    margin: 1em 0;
    grid-template-areas:
    "image header header verification"
    "image information . status"
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
        "verification"
        "information"
        "status"
        "button";
    }

`;

export const CardImage = styled.img`
    grid-area: image;    
    width: 260px;
    height: 160px;
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
    width: 250px;
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

export const CarStatus = styled.div`
    grid-area: status;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.3rem;

    & > p {
        margin-right: 0.5em;
        font-weight: bold;
    }
`;

export const CarVerification = styled.div`
    grid-area: verification;
    color: ${props => props.verified ? "#127FFE" : "#ff0000" };
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    & > p{
        margin-right: 0.5em;
    }
`

export const ButtonSection = styled.div`
    grid-area: button;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
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
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: auto;
    height: 40px;
    font-size: 1rem;
    font-weight: bold;
    padding: 1em;

    & > * {
        margin-right: 1em;
    }

    @media(max-width: 768px) {
        width: 60%;
        margin: 0.5em 0;
    }
`;