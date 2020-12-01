import styled from "styled-components"

export const Container = styled.section`
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 4;
    width: 325px;
    height: 70vh;
    overflow-y: scroll;
    padding: 1em;
    background-color: #fff;
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


export const StyledInput = styled.input`
    background-color: #e5e4e4;
    border-radius: 10px;
    border: none;
    padding: 0.25em;
    width: 200px;
`;

export const ElementContainer = styled.div`
    text-align: left;
    margin-bottom: 0.5em;

    & > label {
        display: block;
    }

    & > div {
        display: flex;
        align-items: center;
    }

    & > svg {
        width: 50;
        height: 50;
        display: inline-block;
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

    &:hover {
        background-color: #077187;
        color: white;
        cursor: pointer;
    }
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

export const Slider = styled.div`
  padding: 1em;
  height: 5rem;
`;

export const TimeFields = styled.input`
    border: none;
    background-color: #E5E4E4;
    border-radius: 10px;
    width auto;
`;