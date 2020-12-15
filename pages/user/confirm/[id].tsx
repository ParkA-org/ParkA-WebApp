import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { VALIDATE_EMAIL } from "mutations"
import { useRouter } from "next/router"
import Layout from "../../layout"
import NavigationLink from "components/NavigationLink"
import Button from "components/Button"
import useLocalStorage from "hooks/useLocalStorage"
import ModalPortal from "components/Modal"
import Spinner from "components/Spinner"

export default function ConfirmEmail(): JSX.Element {
    const router = useRouter()
    const { id } = router.query
    const [user, _] = useLocalStorage("user", "")
    const [showModal, setShowModal] = useState(false)
    const [ValidateEmail, { data: emailData, loading: emailLoading, error: emailError }] = useMutation(VALIDATE_EMAIL, {
        onCompleted() {
            router.push('/login')
        }
    })
    useEffect(() => {
        console.log('Id ', id)
        console.log('Email ', user.email)
        if (id) {
            ValidateEmail({
                variables: {
                    veI: {
                        "origin": "web",
                        "code": id,
                        "email": user.email
                    }
                }
            })
        }
    }, [id])

    return (
        <Layout pageTitle="Confirmar cuenta con correo electrónico">
            <div className="confirmationContainer">
                <h1>Confirmando correo electrónico</h1>
                <main>
                    <section>
                        <img
                            src="/images/projectLogo.png"
                            style={{ width: "500px", height: "300px" }}
                        />
                    </section>
                </main>
                <div>
                    <Button rank="secondary">
                        <NavigationLink href="/login" styled>
                            Atrás
                        </NavigationLink>
                    </Button>
                    <Button rank="secondary" submit={true}>
                        Iniciar Sesión
                    </Button>
                </div>
            </div>
            <style jsx>
                {`
                    span {
                        align-self: flex-end;
                        color: #59BCA7;
                    }
                    .confirmationContainer {
                        background-color: #ddd7d7
                        border-radius: 15px;
                        width: 65vw;
                        height: auto;
                        padding: 1em;
                        display: flex;
                        flex-direction: column;
                    }
                    main {
                        display: flex;
                        justify-content: center;
                    }
                    .confirmationContainer > div {
                        display: flex;
                        justify-content: space-around;
                    }
                `}
            </style>

            {showModal && <ModalPortal onClose={() => setShowModal(false)}>
                <Spinner />
                <h3>Cargando...</h3>
            </ModalPortal>}
        </Layout>
    );
}
