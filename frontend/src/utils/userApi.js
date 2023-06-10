import api from "./api"

export default {
    getUser(userId) {
        return api.get('/users/' + userId)
    },
}