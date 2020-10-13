import axios from "axios"

export default function UploadImageService(file, setImage) {
    const apiBaseURL = "https://parka-api.herokuapp.com/upload"
    const formData = new FormData()
    formData.append("files", file)
    axios({
        method: "POST",
        url: apiBaseURL,
        data: formData
    }).then(res => {
        setImage(res.data[0].url)
        // return res.data[0].url
    })
    .catch(err => {
        console.error(err)
        // return err.message
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