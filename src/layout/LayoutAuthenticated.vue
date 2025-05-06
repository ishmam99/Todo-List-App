<template>
  <div class="bg-gray-50 ">
    <nav class="bg-white border-b border-gray-200 fixed w-full z-30  top-0">
          <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center justify-start">
               <img class="mx-auto h-10 w-auto" src="https://www.freeiconspng.com/uploads/to-do-list-icon-buy-this-icon-for--0-48-1.png" alt="Your Company">
                <router-link to="/" class="text-xl font-bold flex items-center lg:ml-2.5">
                  <span class="self-center whitespace-nowrap">My To Do Appp</span>
                </router-link>
              </div>
              <div class="flex items-center">
                <div class="hidden lg:flex items-center">
                  <span class="text-base font-normal text-gray-500 mr-5">{{ userStore.user?.name }}</span>
                </div>
                <div class="relative">
                  <button type="button" @click="isDropdownOpen = !isDropdownOpen" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" id="user-menu-button-2" aria-expanded="false">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-8 h-8 rounded-full" :src="userStore.user?.avatar || 'https://ui-avatars.com/api/?name=' + userStore.user?.name" :alt="userStore.user?.name">
                  </button>
                  <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <p @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

    <slot />
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { ref } from 'vue'

const userStore = useAuthStore()
const isDropdownOpen = ref(false)
const logout = async() => {
try{
  const response = await api().post('/logout')

  if(response.status === 200) {
    window.location.href = '/login'
    userStore.logout()
  }
  }
  catch (error) {
  console.log(error)
    if(error.status === 401) {
    window.location.href = '/login'
    userStore.logout()
  }
  }
}
</script>
