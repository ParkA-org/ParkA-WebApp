import { useEffect, useState, useContext } from "react"
import { UserContext } from "context/UserContext"
import { useRouter } from "next/router"

export default function useUser() {
    const { user, setUser, token, setToken, setUserId } = useContext(UserContext)
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [isLogged, setIsLogged] = useState(user && Object.keys(user).length !== 0 ? true : false)

    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            setIsLogged(true)
        }
        console.log('Usuario')
        console.log(user)
        console.log(`Dentro de useUser esta loggeado es ${isLogged}`)
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