import axios from "axios"
import useLocalStorage from "hooks/useLocalStorage"

export default function UploadImageService(file) {
    const [_, setImage] = useLocalStorage("image", "")
    const apiBaseURL = "https://parka-api.herokuapp.com/upload"
    const formData = new FormData()
    formData.append("files", file)
    axios({
        method: "POST",
        url: apiBaseURL,
        data: formData
    }).then(res => {
        setImage(res.data[0].url)
        return res
    })
    .catch(err => {
        return err
    })
}

export async function uploadMultipleImages(param) {
    const apiBaseURL = "https://parka-api.herokuapp.com/upload"
    const formData = new FormData()
    for (let i = 0; i < param.length; i++) {
        formData.append("files", param[i])
    }
    return axios({
        method: "POST",
        url: apiBaseURL,
        data: formData
    })
}