import styled from "styled-components"

export const StyledIconButton = styled.button`
    border-radius: 50%;
    box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.25);
    -webkit-box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0px 20px 8px rgba(0, 0, 0, 0.25);
    background-color: ${props => props.color};
    padding: 1em;
    width: auto;
    height: auto;
    margin-right: 1em;

    &:hover {
        cursor: pointer;
    }
`;

export const IconButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Text = styled.p`
    display: inline-block;
    font-size: 2em;
    color: ${props => props.color};
`;