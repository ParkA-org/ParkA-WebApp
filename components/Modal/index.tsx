import { useState, useEffect, useRef } from "react"
import { createPortal } from 'react-dom'
import Button from "components/Button"
import {
    ModalLayout,
    ModalContent,
    ModalChildren
} from "./styles"

function Modal({ children, onClose }) {
    return (
        <ModalLayout>
            <ModalContent>
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