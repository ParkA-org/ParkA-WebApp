import { useEffect, useState, useContext } from "react"
import { UserContext } from "context/UserContext"
import { useRouter } from "next/router"
import { USER_STATES } from "utils/constants"

export default function useUser() {
    const { user, setUser, token, setToken, setUserId } = useContext(UserContext)
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [isLogged, setIsLogged] = useState(USER_STATES.NOT_KNOWN)

    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            setIsLogged(USER_STATES.LOGGED_IN)
            setLoading(false)
        } else if (user) {
            setIsLogged(USER_STATES.LOGGED_OUT)
            setLoading(false)
        }
        console.log('Usuario')
        console.log(user)
        console.log(`Dentro de useUser esta loggeado es ${isLogged}`)
    }, [user])

    const logout = () => {
        setUser({})
        setToken("")
        setIsLogged(USER_STATES.LOGGED_OUT)
        setUserId("")
        router.push("/")
    }

    return {
        user,
        setUser,
        token,
        setToken,
        isLogged,
        loading,
        logout
    }
}