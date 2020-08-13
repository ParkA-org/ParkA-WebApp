import styled from "styled-components";

export const Title = styled.h3`
  color: #084c7c;
  text-align: left;
  margin-bottom: 0.5em;
`;

export const Content = styled.p`
  border-radius: 0.5em;
  min-height: 1.5em;
  max-height: auto;
  width: 200px;
  background-color: #e5e4e4;
  word-break: break-word;
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 0.5em;
`;

export const HeaderContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin: 0.5em auto;
  }
`;

export const Container = styled.div`
  border-radius: 0.5em;
  border: 2px solid #084c7c;
  padding: 0.5em;
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
