import {
    StyledIconButton,
    IconButtonContainer,
    Text
} from "./styles"


export default function IconButton({ text, children, color }): JSX.Element {

    return (
        <IconButtonContainer color={color}>
            <StyledIconButton color={color}>{children}</StyledIconButton>
            <Text color={color}>{text}</Text>
        </IconButtonContainer>
    )
}