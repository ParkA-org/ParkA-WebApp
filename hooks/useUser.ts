import { useEffect, useState, useContext } from "react"
import { UserContext } from "context/UserContext";

export default function useUser() {
    const { user, setUser, token, setToken, loading, setLoading } = useContext(UserContext)
    const [isLogged, setIsLogged] = useState(Object.keys(user).length === 0 ? false : true)

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            setIsLogged(true)
        }
        console.log('User ', user)
        console.log('Is Logged ', isLogged)
    }, [user])

    const logout = () => {
        setUser({})
        setToken("")
        setIsLogged(false)
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