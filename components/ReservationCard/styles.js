import styled from "styled-components"

export const Container = styled.div`
    flex: 0 0 auto;
    padding: 1em;
    margin-right: 2em;
    border: 2px solid #0B768C;
    border-radius: 20px;
    display: grid;
    text-align: center;
    align-items: center;
    grid-template-areas:
    "image metadata"
    "image cost"
    "buttons buttons";
    row-gap: 10px;
    width: 35vw;
    @media(max-width: 768px) {
        grid-template-areas:
        "image"
        "metadata"
        "cost"
        "buttons";
    }
`;

export const ReservationImage = styled.img`
    grid-area: image;
    width: 180px;
    height: 125px;
    border-radius: 15px;
    justify-self: center;
`;

export const Item = styled.div``;

export const MetadataSection = styled.section`
grid-area: metadata;
    display: flex;
    justify-content: space-around;
    @media(max-width: 768px) {
        flex-direction: column;
    }

    & > p {
        font-size: 1.2em;
    }
`;

export const CostSection = styled.section`
    font-size: 1.5em;
    grid-area: cost;  
    & > h3 {
        display: inline-block;
    }

    & > p {
        margin-left: 0.5em;
        display: inline;
    }
`;

export const ButtonSection = styled.section`
    grid-area: buttons;
    display: grid;
    justify-items: space-evenly;
    grid-template-areas:
    "cancel . rest rest";
`;

export const ActionButtonsSection = styled.div`
    display: flex;
    grid-area: rest;
    justify-content: space-around;
`;

export const ReservationsButton = styled.button`
    grid-area: ${props => props.isCancelable ? "cancel" : ""};
    justify-self: ${props => props.isCancelable ? "end" : ""};
    background-color: ${props => props.isCancelable ? "#BC3F3F" : "#077187"};
    border-radius: 5px;
    color: white;
    width: 100px;
    padding: 0.5em;
`;