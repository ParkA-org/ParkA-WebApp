import styled from "styled-components";

export const Title = styled.h3`
  color: #084c7c;
  text-align: left;
  font-size: 1.4rem;
`;

export const Content = styled.p`
  border-radius: 0.5em;
  font-size: 1.5em;
  font-weight: bold;
  min-height: 1.5em;
  max-height: auto;
  width: 240px;
  background-color: #e5e4e4;
  word-break: break-word;
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 2em;
  border-radius: 50%;
`;

export const HeaderContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  padding: 10px 0 0 20px;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin: 0.5em auto;
  }
`;

export const Container = styled.div`
  margin-right:-20px;
  border-radius: 2em;
  border: 3.5px solid #0B768C;
  padding: 0.5em;
  display: flex;
  height: 90%;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
