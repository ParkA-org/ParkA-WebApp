import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { LOGIN_USER } from "mutations"
import useLocalStorage from "hooks/useLocalStorage"
import { useContext } from "react"
import Context from "context/UserContext"

type LoginServiceProps = {
    email: string;
    password: string;
}

export default function LoginService(values: LoginServiceProps): void {
    const { setUser } = useContext(Context)
    const router = useRouter()
    const [, setJWT] = useLocalStorage("token", "")
    const [LoginUser, { error }] = useMutation(LOGIN_USER, {
        onCompleted({ login }) {
            const { jwt: token, user } = login
            setJWT(token)
            setUser(user)
            router.push("/")
        }
    })
    LoginUser({
        variables: {
            loggedUser: {
                identifier: values.email,
                password: values.password
            }
        }
    })
}