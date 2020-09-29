import styled from "styled-components";

export const DropdownMenu = styled.div`
  border: solid;
  border-color: #336F8B;
  border-width: 2px;
  border-radius: 1.5em;
  background-color: white;
  min-width:205px;
  position:absolute;
  top: 30px;
  right:30px;
  z-index:2;
  & h4{
    font-size: 1em;
  }
`;

export const DropdownButton = styled.div`
  display: flex;
  flex-wrap: nowrap;
  border: solid;
  border-color: #336F8B;
  border-width: 2px;
  border-radius: 1.5em;
  margin: -2px;
  align-items: center;
  padding: 2px 5px 2px 5px;
  position:relative;
  z-index:2;

  & > img:first-child {
    margin-right: 10px;
  }

  & > h4 {
    margin: 0 10px 0 10px;
  }

  &:hover ~ div {
    display:block;
  }

`;

export const DropdownContent = styled.div`
  display:none;
  position:relative;
  z-index:3;
  &:hover{
    display:block;
  }

  & > div:last-child{
    border-radius: 0 0 1.5em 1.5em;
  }
`;

export const DropdownItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 15px 5px 10px 15px;
  & img{
    padding-right: 15px;
  }

  &:hover{
    background-color:#ddd;
  }


`;