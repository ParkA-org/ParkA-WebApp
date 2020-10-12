import axios from "axios"

export default function UploadImageService(file, success, error) {
    const apiBaseURL = "https://parka-api.herokuapp.com/upload"
    const formData = new FormData()
    formData.append("files", file)
    axios({
        method: "POST",
        url: apiBaseURL,
        data: formData
    }).then(res => {
        success(res.data['0'].url)
    })
    .catch(err => error(err))
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