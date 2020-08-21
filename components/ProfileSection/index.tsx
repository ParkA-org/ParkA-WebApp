import NavigationLink from "components/NavigationLink"
import {
    ProfileContainer,
    ContentContainer,
    ProfilePicture,
    CircularButton,
    ContentSection,
    ContentRow
} from "./styles"

import Button from "components/Button"

export default function ProfileSection() {
    return (
        <ProfileContainer>
            <h1>Sebastiano Faiella</h1>
            <ContentContainer>
                <ProfilePicture alt="User Profile" src="placeholders/image-placeholder.png" />
                <ContentSection>
                    <ContentRow>
                        <h3>Email:</h3>
                        <h4>sebasfaiella@gmail.com</h4>
                    </ContentRow>
                    <ContentRow>
                        <h3>Edad:</h3>
                        <h4>27 años</h4>
                    </ContentRow>
                </ContentSection>
                <CircularButton color="#336F8B;"><p>10</p> Reservas Completadas</CircularButton>
            </ContentContainer>
            <NavigationLink href="/profile/edit">
                <Button>Editar</Button>
            </NavigationLink>
        </ProfileContainer>
    )
}