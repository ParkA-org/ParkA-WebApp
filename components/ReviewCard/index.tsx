
import { Container, Avatar, UserInfo, ReviewDate, Text } from "./styles"
import { BsStarFill, BsStar } from "react-icons/bs"
export default function ReviewCard() {

    return (
        <Container>
            <Avatar src="/placeholders/image.png" alt="user avatar" />
            <UserInfo>
                <h3>David Bujosa</h3>
                <div>
                    <BsStarFill color="goldenrod" />  <BsStarFill color="goldenrod" />  <BsStarFill color="goldenrod" /> <BsStar /> <BsStar />
                </div>
            </UserInfo>
            <ReviewDate>
                7/3/2020
            </ReviewDate>
            <Text>
                Me agrado mucho el parqueo, venia con carwash y seguridad incluido asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            </Text>
        </Container>
    )
}