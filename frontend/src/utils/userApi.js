import api from "./api"

export default {
    getUser(userId) {
        return api.get('/users/' + userId)
    },
    updateUser(user) {
        return api.put('/users/' + user.id, user)
    }
}