import api from "./api"

export default {
    logIn(email, password) {
      return api.post('/token', {
        email, 
        password
      });
    },
    googleLogIn() {
      return api.get('/auth/google/callback')
           
    },
    signUp(newUser) {
      return api.post('/users', newUser)
    }
  }