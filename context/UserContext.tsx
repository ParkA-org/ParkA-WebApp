import * as React from "react"
import { Dispatch, SetStateAction, useState, useEffect } from "react"
import { GET_USER } from "queries"
import { useLazyQuery } from '@apollo/client'
import useLocalStorage from "hooks/useLocalStorage"
import { USER_STATES } from "utils/constants"

type User = {
    id?: String;
    username?: String;
    profilepicture?: String;
    email?: String;
}

type ProviderProps = {
    children: React.ReactNode | React.ReactNode[] | null
}

interface ContextInterface {
    user: User | undefined;
    userId: "";
    setUserId: Dispatch<SetStateAction<String>>;
    setUser: (user: User) => void;
    setToken: (authToken: String) => void;
    token: String;
}

export const UserContext = React.createContext<ContextInterface>({
    user: {},
    userId: "",
    setUserId: undefined,
    setUser: undefined,
    setToken: undefined,
    token: ""
})

export function UserProvider({ children }: { children: React.ReactNode | React.ReactNode[] | null; value?: ContextInterface }) {
    const [token, setToken] = useLocalStorage("token", "")
    const [userId, setUserId] = useLocalStorage("user-id", "")
    const [getUser, { data }] = useLazyQuery(GET_USER)
    const [user, setUser] = useState<User>(USER_STATES.NOT_KNOWN)

    useEffect(() => {
        if (!userId) {
            setUser(USER_STATES.LOGGED_OUT)
        }
        if (userId && userId.length > 0) {
            getUser({ variables: { id: userId } })
        }
        if (data) {
            console.log('Data from provider')
            console.log(data.user)
            setUser(data.user)
        }
    }, [data])

    const modifyUser: (user: User) => void = function (user: User): void {
        setUser(user)
        if (user?.id) {
            setUserId(user.id)
        }
    }

    const modifyToken: (authToken: String) => void = function (authToken: String): void {
        setToken(authToken)
    }

    const ContextValue = {
        user: user,
        token: token,
        setUser: modifyUser,
        setToken: modifyToken,
        userId: userId,
        setUserId: setUserId,
    }

    return (
        <UserContext.Provider value={ContextValue}>
            {children}
        </UserContext.Provider>
    )
}
