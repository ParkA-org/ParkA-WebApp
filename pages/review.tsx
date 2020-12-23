import { useState, useEffect, useContext } from "react"
import { useQuery } from "@apollo/client";
import { UserContext } from "context/UserContext"
import { GET_USER_REVIEWS } from "queries";
import Layout from "./layout"
import { Review } from "utils/types";
import ReviewTable from "components/ReviewTable"

interface ReviewData {
    getAllUserReviews: Review[]
}

export default function ReviewPage() {

    const { redirect, loading: userLoading,  userStatus } = useContext(UserContext)

    useEffect(() => {
        redirect('/review')
    }, [userLoading])

    const [userReviews, setUserReviews] = useState<Review[]>([])
    const { loading, error, data } = useQuery<ReviewData>(GET_USER_REVIEWS, {
        fetchPolicy: "network-only"
    })

    useEffect(() => {
        if (data && data.getAllUserReviews) {
            setUserReviews(data.getAllUserReviews)
        }
    }, [data])

    if(userStatus === true){
    return (
        <Layout pageTitle="Reviews de usuarios">
            {userReviews.length > 0 ?
                <div className="wrapper">
                    {userReviews.length > 0 && <ReviewTable reviews={userReviews} />}
                    <style jsx>
                        {`
                        .wrapper {
                            font-size: 1.2rem;
                        }
                    `}
                    </style>
                </div>
                : <h2>No haz hecho ninguna reseña por el momento</h2>}
        </Layout>
    )
                    }

                    
    return (
        <Layout pageTitle="Reviews de usuarios">
            <h3>Cargando....</h3>
        </Layout>
    )
}