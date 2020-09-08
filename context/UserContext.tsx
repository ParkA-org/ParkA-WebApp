import * as React from "react"
import { Dispatch, SetStateAction, useState } from "react"
import useLocalStorage from "hooks/useLocalStorage"

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
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
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
    token: "",
    loading: true,
    setLoading: undefined
})

export function UserProvider({ children }: { children: React.ReactNode | React.ReactNode[] | null; value?: ContextInterface }) {
    const [user, setUser] = React.useState<User>({})
    const [token, setToken] = useLocalStorage("token", "")
    const [userId, setUserId] = useLocalStorage("user-id", "")
    const [loading, setLoading] = useState(true)

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
        loading: loading,
        setLoading: setLoading
    }

    return (
        <UserContext.Provider value={ContextValue}>
            {children}
        </UserContext.Provider>
    )
}
