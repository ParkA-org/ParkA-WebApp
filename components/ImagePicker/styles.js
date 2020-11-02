import styled from "styled-components";

export const Image = styled.img`
  width: 300px;
  height: 200px;
  border-radius: 10px;
  margin-left: 2em;
`;

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;

  &:hover > span {
    visibility: visible;
  }

`

export const TooltipText = styled.span`
  visibility: hidden;
  width: 100px;
  background-color: black;
  color: #fff;
  top: 30px;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
`
