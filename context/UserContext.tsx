import * as React from "react"
import { Dispatch, SetStateAction } from "react"
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
    setUser: Dispatch<SetStateAction<User>>;
    setToken: Dispatch<SetStateAction<String>>;
    token: String;
}

export const UserContext = React.createContext<ContextInterface>({
    user: undefined,
    setUser: undefined,
    setToken: undefined,
    token: ""
})

export function UserProvider({ children }: { children: React.ReactNode | React.ReactNode[] | null; value?: ContextInterface }) {
    const [user, setUser] = React.useState<User | {}>({})
    const [token, setToken] = useLocalStorage("token", "")
    const [userId, setUserId] = useLocalStorage("user-id", "")

    // const sampleContextValue: ContextInterface = {
    //     user: user,
    //     token: token,
    //     setUser: setUser,
    //     setToken: setToken
    // }

    return (
        <UserContext.Provider value={{
            user: user,
            token: token,
            setUser: setUser,
            setToken: setToken
        }}>
            {children}
        </UserContext.Provider>
    )
}
