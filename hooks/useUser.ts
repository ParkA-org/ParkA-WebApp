import { useState, useContext } from "react"
import Context from "context/UserContext"



export default function useUser() {
    const { user, setUser, token, setToken } = useContext(Context)


}