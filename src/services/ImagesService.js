import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getImages() {
        return apiClient.get('/gallery')
    },
    getImagesCat(category) {
        return apiClient.get('/gallery/category/' + category)
    },
    getImage(id) {
        return apiClient.get('/gallery/' + id)
    }
}