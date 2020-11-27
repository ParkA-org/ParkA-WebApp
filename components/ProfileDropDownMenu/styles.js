import styled from "styled-components";

export const DropdownMenu = styled.div`
  background-color: white;
  min-width:260px;
  position:absolute;
  top: 15px;
  right:30px;
  z-index: 4;

  & h4{
    font-size: 1em;
  }

  & > div:first-child{
    display:flex;
    flex-wrap: nowrap;
    height:53px;
    margin:-2px;
  }
`;

export const DropdownButton = styled.button`
  display:inline;
  border: solid;
  border-color: #336F8B;
  border-width: 2px;
  border-radius: 1.2em;
  margin: -2px;
  padding: 2px 5px 2px 5px;
  position:relative;
  min-width:260px;
  background-color: transparent;
  z-index: 4;
  height:56px;
  outline:none !important;

  & div > img:first-child {
    margin-right: 10px;
  }

  & div > h4 {
    margin: 0 10px 0 10px;
  }

  &:hover ~ div {
    display:block;
  }

  & div{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }

`;

export const DropdownContent = styled.div`
  display:none;
  position:relative;
  min-width:260px;
  z-index: 4;
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
  z-index: 4;
  padding: 15px 5px 10px 15px;
  & img{
    padding-right: 15px;
  }

  &:hover{
    background-color:#ddd;
  }


`;

export const ToggleButton = styled.button`
  background-color:transparent;
  outline:none !important; 
  margin-right:10px;
  margin-left:15px

  &:focus{
    outline:none;
  }

`