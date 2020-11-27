import axios from "axios"
import { TOMTOM_BASE_URL } from "utils/constants"

function ReverseGeocode(latLng: string, setData) {
    const URL = `${TOMTOM_BASE_URL}${latLng}.json?key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}`
    axios({
        method: 'GET',
        url: URL
    })
        .then(res => res.data)
        .then(data => {
            const { addresses } = data
            const result = addresses[0]
            const { address } = result
            const { municipalitySubdivision, freeformAddress } = address
            setData({
                sector: municipalitySubdivision,
                address: freeformAddress
            })
        })
        .catch(err => console.error(err))
}

export default ReverseGeocode