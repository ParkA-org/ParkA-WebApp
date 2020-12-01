import { useState, useEffect } from "react"
import Layout from "./layout"
import { useQuery } from "@apollo/client";
import { GET_USER_REVIEWS } from "queries";
import { Review } from "utils/types";


interface ReviewData {
    getAllUserReviews: Review[]
}

export default function ReviewPage() {

    const [userReviews, setUserReviews] = useState<Review[]>([])
    const { loading, error, data } = useQuery<ReviewData>(GET_USER_REVIEWS, {
        fetchPolicy: "network-only"
    })

    useEffect(() => {
        if (data && data.getAllUserReviews) {
            setUserReviews(data.getAllUserReviews)
            console.log(userReviews)
        }
    }, [data])

    return (
        <Layout pageTitle="Reviews de usuarios">
            {userReviews.length > 0 ?
                <div className="wrapper">
                    {JSON.stringify(data, undefined, 2)}
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