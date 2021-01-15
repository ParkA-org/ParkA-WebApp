import { BsStarFill, BsStarHalf } from "react-icons/bs";
import NavigationLink from "components/NavigationLink";
import {
  ProfileContainer,
  ContentContainer,
  ProfilePicture,
  CircularButton,
  ContentSection,
  ContentRow,
  EditButton,
} from "./styles";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { AiFillCheckCircle } from "react-icons/ai";
import { useContext } from "react";
import { UserContext } from "context/UserContext";
import { GET_USER } from "queries";
import { useLazyQuery } from "@apollo/client";
import { User } from "utils/types/user";

export default function ProfileSection() {
  const { token } = useContext(UserContext);
  const [getUser, { data, loading, error }] = useLazyQuery(GET_USER);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (data) setUser(data.getUserById);
    else {
      let obj = jwt_decode(token);
      getUser({ variables: { id: obj.id } });
    }
  }, [data, loading]);
  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>Ocurrio un error</h2>;

  const getRatingStars = (): JSX.Element => {
    if (user?.reviews.length > 0) {
      let stars = [];
      let califications = 0;
      const { reviews } = user;
      reviews.forEach((review) => {
        califications += review.calification;
      });

      califications = califications / reviews.length;

      for (let i = 0; i < 5; i++) {
        if (i <= califications) {
          stars.push(<BsStarFill color="goldenrod" />);
        } else {
          stars.push(<BsStarFill color="white" />);
        }
      }
      return (
        <>
          {stars}({califications})
        </>
      );
    }
    return (
      <>
        <BsStarFill color="goldenrod" /> <BsStarFill color="goldenrod" />{" "}
        <BsStarFill color="goldenrod" /> <BsStarFill color="goldenrod" />{" "}
        <BsStarFill color="goldenrod" />
        (5.00)
      </>
    );
  };

  return (
    <ProfileContainer>
      <h1 style={{ marginLeft: "3em", marginBottom: "1em" }}>
        {`${user?.name} ${user?.lastName}`} <AiFillCheckCircle color="blue" />
      </h1>
      <ContentContainer>
        <ProfilePicture
          alt="User Profile"
          src={
            user?.profilePicture == undefined
              ? "placeholders/image-placeholder.png"
              : user?.profilePicture
          }
        />
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
            <h4>
              {`${
                new Date(Date.now()).getFullYear() -
                new Date(user?.userInformation?.birthDate).getFullYear()
              } años.`}{" "}
            </h4>
          </ContentRow>
          <ContentRow>
            <h4>{getRatingStars()}</h4>
          </ContentRow>
        </ContentSection>
        <CircularButton color="#336F8B;">
          <p>{`${user?.reviews.length}`}</p> Reservas Completadas
        </CircularButton>
      </ContentContainer>
    </ProfileContainer>
  );
}
