import { useEffect, useState, useContext } from "react"
import { UserContext } from "context/UserContext"
import { useRouter } from "next/router"

export default function useUser() {
    const { user, setUser, token, setToken, setUserId } = useContext(UserContext)
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [isLogged, setIsLogged] = useState(Object.keys(user).length === 0 ? false : true)

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            setIsLogged(true)
        }
    }, [user])

    const logout = () => {
        setUser({})
        setToken("")
        setIsLogged(false)
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