import axios from 'axios'

axios.defaults.validateStatus = (status) => {
    return status < 400
}

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + 'prodex/api'
})
export default instance