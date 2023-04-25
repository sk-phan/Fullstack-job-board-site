import api from "./api"

export default {
    logIn(username, password) {
      return api.post('/token', {
        username, 
        password
      });
    },
  }