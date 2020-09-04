import styled from "styled-components"

export const Container = styled.section`
    width: 300px;
    height: 80vh;
    padding: 1em;
    background-color: #F5F5F5;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > h2 {
        text-decoration: underline;
    }
`;

export const Section = styled.div`
    & > h3 {
        font-size: 1.3rem;
        font-weight: bold;
    }

    & > p {
        font-weight: bold;
        margin-top: 0.5em;
    }
`;

export const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const Tag = styled.span`
    width: auto;
    padding: 0.5em 1em;
    font-weight: 600;
    border: 1.5px solid #077187;
    border-radius: 25px; 
    margin-right: 0.5em;
    margin-top: 0.5em;
`;

export const CharacteristicContainer = styled.ul`
    list-style: none;
    margin-top: 0.5em;
`;

export const Characteristic = styled.li`
    & > input {
        margin-right: 0.8em;
    }
    & > label {
        font-weight: bold;
    }
`

export const Slider = styled.input`
    margin-top: 1em;
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;  
    background: #D3D3D3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    
    &::-webkit-slider-thumb{
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%; 
        background: #0B768C;
        cursor: pointer;
    }
    
    &::-moz-range-thumb{
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #0B768C;
        cursor: pointer;
    }
`;

export const TimeFields = styled.input`
    border: none;
    background-color: #E5E4E4;
    border-radius: 10px;
    width auto;
`;