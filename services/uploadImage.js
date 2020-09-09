import axios from "axios"

export default function UploadImageService(file, success, error) {
    const apiBaseURL = "https://parka-api.herokuapp.com/upload";
    const formData = new FormData()
    formData.append("files", file)
    axios({
        method: "POST",
        url: apiBaseURL,
        data: formData
    }).then(res => {
        success(res.data['0'].url)
        error(prevState => {
            return { ...prevState, loading: false }
        })
    })
        .catch(err => error(prevState => {
            return { ...prevState, error: err }
        }))
}
