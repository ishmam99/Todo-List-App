<template>
  <LayoutGuest>
    <div class="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://www.freeiconspng.com/uploads/to-do-list-icon-buy-this-icon-for--0-48-1.png" alt="Your Company">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">{{ register ? 'Sign up to create awesome ToDo Lists' : 'Sign in to your account'}}</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" @submit.prevent="submitLogin"  v-if="!register">
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div class="mt-2">
          <input type="email" name="email" id="email" v-model="loginForm.email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>

        </div>
        <div class="mt-2">
          <input type="password" name="password" id="password" v-model="loginForm.password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center items-center gap-3 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" v-if="loading" class="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path></svg>
          Sign in</button>
      </div>
    </form>
    <form class="space-y-6" @submit.prevent="submitRegister" v-if="register">
      <div>
        <label for="name" class="block text-sm/6 font-medium text-gray-900">Full Name</label>
        <div class="mt-2">
          <input type="text" name="name" id="name" v-model="registerForm.name" autocomplete="name" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div class="mt-2">
          <input type="email" name="email" id="email" autocomplete="email" v-model="registerForm.email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input type="password" name="password" id="password" autocomplete="new-password" v-model="registerForm.password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
        </div>
        <div class="mt-2">
          <input type="password" name="password" id="password" autocomplete="new-password" v-model="registerForm.password_confirmation" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>

      <div>
        <button type="submit" :disabled="loading" class="flex w-full justify-center items-center gap-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" v-if="loading" class="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path></svg>
          Sign up</button>
      </div>
    </form>
    <div class="mt-10 flex w-full gap-3 justify-center items-center text-center text-sm/6 text-gray-500">
    {{ register ? 'Already a member ? ': 'Not a user?'}}
      <p @click="register = !register" class="font-semibold text-indigo-600 hover:text-indigo-500">{{register ? 'Login now' :'Register Now'}}</p>
    </div>
  </div>
</div>
  </LayoutGuest>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import LayoutGuest from '../layout/LayoutGuest.vue';

const router = useRouter()
const auth = useAuthStore()
const register = ref(false)
const loading  = ref(false)
const $toast = useToast()
const loginForm = ref({
  email: '',
  password: '',
  rememberMe: false
})
const registerForm = ref({
  name : '',
  email: '',
  password: '',
  password_confirmation: false
})
const submitLogin = async () => {
  loading.value = true
  try {
    const response = await api().post('/login', loginForm.value)
    if (response.status === 200)
    {

        $toast.success('Login successful')
        auth.login(response.data.user)
      auth.setAuthToken(response.data.token)
         router.push('/')
   }
  }
  catch (error)
  {
    console.log(error)
  }
  loading.value = false
}
const submitRegister = async () => {
  loading.value = true
  try {
    const response = await api().post('/register', registerForm.value)
    console.log(response)
    if (response.status === 201)
    {

        $toast.success('Registration successful')
        auth.login(response.data.user)
      auth.setAuthToken(response.data.token)
         router.push('/')
   }
  }
  catch (error)
  {
    console.log(error)
  }
  loading.value = false
}
</script>

