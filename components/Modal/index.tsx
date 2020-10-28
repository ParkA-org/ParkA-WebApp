import { useState, useEffect, useRef } from "react"
import { createPortal } from 'react-dom'
import styled from "styled-components"
import {
    ModalLayout,
    ModalContent,
    ModalChildren
} from "./styles"

const Button = styled.button`
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -mz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #336F8B;
  padding: 15px;
  border-radius: 1.5em;
  margin-top: 0.5em;
  width: 60px;
  align-self: center;
  font-size: 1.4rem;
`;

function Modal({ children, onClose }) {
    return (
        <ModalLayout onClick={e => {
            onClose()
        }}>
            <ModalContent onClick={e => {
                e.stopPropagation();
            }}>
                <Button onClick={onClose}>X</Button>
                <ModalChildren>
                    {children}
                </ModalChildren>
            </ModalContent>
        </ModalLayout>
    )
}

export default function ModalPortal({ children, onClose }) {
    const ref = useRef(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        ref.current = document.getElementById('modal-root')
        setMounted(true)
    })

    return mounted ? createPortal(<Modal onClose={onClose}>
        {children}
    </Modal>, ref.current) : null
}