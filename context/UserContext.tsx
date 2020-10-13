import * as React from "react"
import { Dispatch, SetStateAction, useState, useEffect } from "react"
import { GET_USER } from "queries"
import { useLazyQuery } from '@apollo/client'
import useLocalStorage from "hooks/useLocalStorage"
import { USER_STATES } from "utils/constants"
import { useRouter } from "next/router"

type User = {
    id?: String;
    username?: String;
    profilepicture?: String;
    email?: String;
    lastname?: String;
    name?: String;
    confirmed?: Boolean;
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
    loading: Boolean;
    logout: () => void;
    userStatus: undefined | false | true;
}

export const UserContext = React.createContext<ContextInterface>({
    user: {},
    userId: "",
    setUserId: undefined,
    setUser: undefined,
    setToken: undefined,
    token: "",
    loading: true,
    logout: undefined,
    userStatus: USER_STATES.NOT_KNOWN
})

export function UserProvider({ children }: { children: React.ReactNode | React.ReactNode[] | null; value?: ContextInterface }) {
    const router = useRouter()
    const [token, setToken] = useLocalStorage("token", "")
    const [userId, setUserId] = useLocalStorage("user-id", "")
    const [getUser, { data }] = useLazyQuery(GET_USER, {
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : ""
            }
        }
    })
    const [user, setUser] = useState<User>(undefined)
    const [userStatus, setUserStatus] = useState(USER_STATES.NOT_KNOWN)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user === undefined) {
            setLoading(true)
            if (token && userId) {
                getUser({ variables: { id: userId } })
                if (data) {
                    setUser(data.getUserById)
                    setUserStatus(USER_STATES.LOGGED_IN)
                }
            }
        }
        if (!token || !userId) {
            setUserStatus(USER_STATES.LOGGED_OUT)
        }
        if (user['name']) {
            setUserStatus(USER_STATES.LOGGED_IN)
        }

        setLoading(false)
    }, [data, userId, token])

    const modifyUser: (user: User) => void = function (user: User): void {
        setUser(user)
        if (user?.id) {
            setUserId(user.id)
        }
    }

    const modifyToken: (authToken: String) => void = function (authToken: String): void {
        setToken(authToken)
    }

    const logout = () => {
        setUser({})
        setToken("")
        setUserId("")
        setUserStatus(USER_STATES.LOGGED_OUT)
        router.push("/")
    }


    const ContextValue = {
        user: user,
        token: token,
        setUser: modifyUser,
        setToken: modifyToken,
        userId: userId,
        setUserId: setUserId,
        loading,
        logout,
        userStatus
    }

    return (
        <UserContext.Provider value={ContextValue}>
            {children}
        </UserContext.Provider>
    )
}
