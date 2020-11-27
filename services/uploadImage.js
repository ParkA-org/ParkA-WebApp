import axios from "axios"

export default function UploadImageService(file) {
    const apiBaseURL = "https://parka-api.herokuapp.com/upload"
    const formData = new FormData()
    formData.append("files", file)
    return axios({
        method: "POST",
        url: apiBaseURL,
        data: formData
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