import styled from "styled-components"

export const Card = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 3px solid #0B768C;
    width: 80%;
    border-radius: 20px;
    padding: 1em;
    margin-top: 1em;
    font-size: 1.2rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        height: 400px;
        width: 100%;
    }
`;

export const CardImage = styled.img`
    width: 180px;
    height: 100px;
    border-radius: 20px;
    margin-left: 1em;
`;

export const CardBrandImage = styled.img`
    width: 60px;
    height: 40px;
    margin: 0 auto;
`;


export const CardDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    
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

    & > span {
        display: flex;
        justify-items: center;
        align-items: center;
        font-size: 1.3em;
        color: blue;
    }

    @media (max-width: 768px) {
        flex-direction: row;
        align-items: center;
        width: 100%;
    }
`;
