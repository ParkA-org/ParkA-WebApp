import styled from "styled-components"

export const Container = styled.div`
    flex: 0 0 auto;
    padding: 1em;
    color: #333;
    margin-right: 2em;
    border: 2px solid #0B768C;
    border-radius: 20px;
    box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.20);
    -webkit-box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.20);
    -moz-box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.20);
    display: grid;
    text-align: center;
    align-items: center;  
    width: 200px;
    height: auto;
    grid-template-areas:
    "image"
    "metadata"
    "cost"
    "buttons";
   
    @media(min-width: 768px) {
        grid-template-areas:
        "image metadata"
        "image cost"
        "buttons buttons";
        row-gap: 10px;
        width: 45vw;
        height: 215px;
        max-width: 550px;
    }
`;

export const ReservationImage = styled.img`
    grid-area: image;
    border-radius: 15px;
    justify-self: center;
    width: 150px;
    height: 85px;
    @media(min-width: 768px) {
        width: 200px;
        height: 135px;
    }
`;

export const Item = styled.div`
   
    @media(max-width: 768px) {    
        margin: 0.5em 0;
    }
`;

export const MetadataSection = styled.section`
    grid-area: metadata;
    display: flex;
    justify-content: space-around;
    
    & > p {
        font-size: 1.2rem;
    }
    @media(max-width: 768px) {
        flex-direction: column;
    }
    
    `;

export const CostSection = styled.section`
    font-size: 1.5rem;
    grid-area: cost;  
    & > h3 {
        display: inline-block;
    }

    & > p {
        margin-left: 0.5em;
        display: inline;
    }

    @media(max-width: 768px) {
        & > p {
            display: block;
        }
    }

`;

export const ButtonSection = styled.section`
    grid-area: buttons;
    display: grid;
    justify-items: space-evenly;
    grid-template-areas:
    "cancel . rest rest";
    
    @media(max-width: 768px) {
        grid-template-areas:
        "rest"
        "rest"
        "."
        "cancel";
    }
`;

export const ActionButtonsSection = styled.div`
    display: flex;
    grid-area: rest;
    justify-content: space-around;
    @media(max-width: 768px) {
        height: 100px;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
    }
`;

export const ReservationsButton = styled.button`
    border-radius: 5px;
    background-color: #0B768C;
    color: white;
    width: 130px;
    padding: 0.5em;
    display: flex;
    justify-content: space-around;

    @media(max-width: 768px) {
        justify-self: center;
    }
`;

export const SpecialReservationsButton = styled(ReservationsButton)`
    grid-area: cancel;
    justify-self: end;
    background-color: ${props => props.isCancelable ? "#BC3F3F" : "#33C3C3"};
    border-radius: 5px;
    color: white;
    width: 100px;
    padding: 0.5em;
    @media(max-width: 768px) {
        justify-self: center;
    }
`