import { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { USER_STATES } from "utils/constants"
import { UserContext } from "context/UserContext";

export default function useAuth() {
    const router = useRouter()
    const { userStatus, loading } = useContext(UserContext)

    useEffect(() => {
        console.log('Nunca entro aqui o klk ')
        console.log('Status ', userStatus)
        userStatus === USER_STATES.LOGGED_OUT && router.push("/login")
    }, [userStatus])

    return {
        isLoggedIn: userStatus === USER_STATES.LOGGED_IN,
        loading: loading
    }
}