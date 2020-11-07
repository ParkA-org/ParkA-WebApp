import styled from "styled-components";

export const Image = styled.img`
  width: 300px;
  height: 200px;
  border-radius: 10px;
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.placement === "horizontal" ? "row" : "column"};
  justify-content:  ${props => props.placement === "horizontal" ? "flex-start" : "space-around"};

  & > img {
    margin: 0 ${props => props.placement === "horizontal" ? "1.5em 0" : "0 1.5em"} 0;
  }
`