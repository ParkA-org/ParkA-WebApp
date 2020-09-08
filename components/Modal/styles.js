import styled from "styled-components"

export const ModalLayout = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    z-index: 30;
`;

export const ModalContent = styled.div`
    background: #fff;
    width: 50vw;
    padding: 10px 20px;
    height: 40vh;
    margin: 20vh auto;
    position: relative;
    border-radius: 50px;
    -webkit-box-shadow: 5px 5px 20px 0px rgba(0,0,0,0.35);
    -moz-box-shadow: 5px 5px 20px 0px rgba(0,0,0,0.35);
    box-shadow: 5px 5px 20px 0px rgba(0,0,0,0.35);
`;

export const ModalChildren = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

