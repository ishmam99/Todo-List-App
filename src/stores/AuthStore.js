import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    authToken: '',
    isAuthenticated: false,
    user: '',
    
    authUser: ''
  }),
  actions: {
    setAuthToken(token) {
      this.authToken = token
    },
    login(user) {
      this.isAuthenticated = true
      this.user = user
    },
    logout() {
      this.isAuthenticated = false
      this.user = null
      this.authToken = null
    },
    signup(user) {
      this.isAuthenticated = true
      this.user = user
    }
  },
  persist: {
    storage: localStorage
  }
})
