import {
    StyledIconButton,
    IconButtonContainer,
    Text
} from "./styles"


export default function IconButton({ text, children, color, submit = false }): JSX.Element {

    return (
        <IconButtonContainer color={color}>
            <StyledIconButton color={color} submit={submit}>{children}</StyledIconButton>
            <Text color={color}>{text}</Text>
        </IconButtonContainer>
    )
}