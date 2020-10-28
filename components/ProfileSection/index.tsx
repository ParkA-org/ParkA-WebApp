import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import NavigationLink from "components/NavigationLink"
import {
    ProfileContainer,
    ContentContainer,
    ProfilePicture,
    CircularButton,
    ContentSection,
    ContentRow,
    EditButton
} from "./styles"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { AiFillCheckCircle } from 'react-icons/ai';
import { useContext } from 'react';
import { UserContext } from 'context/UserContext';
import { GET_USER } from "queries"
import { useLazyQuery } from "@apollo/client"
import { User } from 'utils/types/user';

export default function ProfileSection() {
    const { token } = useContext(UserContext)
    const [getUser, { data, loading, error }] = useLazyQuery(GET_USER, {
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : ""
            }
        }
    })
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        if (data)
            setUser(data.getUserById)
        else {
            let obj = jwt_decode(token)
            getUser({ variables: { id: obj.id } })

        }
    }, [data])
    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>Ocurrio un error</h2>
    return (
        <ProfileContainer>
            <h1>{`${user?.name} ${user?.lastName}`}  <AiFillCheckCircle color="blue" /></h1>
            <ContentContainer>
                <ProfilePicture alt="User Profile" src="placeholders/image-placeholder.png" />
                <NavigationLink href="/profile/edit">
                    <EditButton>Editar</EditButton>
                </NavigationLink>
                <ContentSection>
                    <ContentRow>
                        <h3>Email:</h3>
                        <h4>{`${user?.email}`} </h4>
                    </ContentRow>
                    <ContentRow>
                        <h3>Edad:</h3>
                        <h4>27 años</h4>
                    </ContentRow>
                    <ContentRow>
                        <h4><BsStarFill color="goldenrod" />  <BsStarFill color="goldenrod" />  <BsStarFill color="goldenrod" />   <BsStarFill color="goldenrod" /> <BsStarHalf color="goldenrod" />(4.20)</h4>
                    </ContentRow>
                </ContentSection>
                <CircularButton color="#336F8B;"><p>10</p> Reservas Completadas</CircularButton>
            </ContentContainer>

        </ProfileContainer>
    )
}