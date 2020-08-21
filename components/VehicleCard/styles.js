import styled from "styled-components"

export const Card = styled.div`
    display: flex;
    justify-content: space-between;
    border: 3px solid #0B768C;
    width: 100%;
    border-radius: 20px;
    padding: 1em;
    margin-top: 1em;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        height: 400px;
    }

`;

export const CardImage = styled.img`
    width: 150px;
    height: 100px;
    border-radius: 20px;
`;

export const CardDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
    
    & > h3 {
        font-size: 1.5em;
    }

    & > p > span {
        font-weight: bold;
    }
    & > p {
        display: inline-block;
        margin: 0.5em 0;
    }

`;

export const AdditionalInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: row;
        align-items: center;
        width: 100%;
    }
`;
