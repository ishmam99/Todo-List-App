<template>
  <layoutAuthenticated>
<div class="max-w-lg mx-auto min-h-[90vh]  bg-white shadow-lg rounded-lg overflow-hidden mt-16">
    <div class="px-4 py-2">
        <h1 class="text-gray-800 font-bold text-2xl uppercase">To-Do List</h1>
    </div>
    <form @submit.prevent="addTodo" class="w-full max-w-sm mx-auto py-2">
        <div class="flex items-start justify-between border-b-2 gap-3 border-teal-500 py-2">
            <div class="flex flex-col w-full space-y-2">
               <input v-model="todo.label" required
                class="appearance-none bg-gray-50 border-2 border-gray-300 rounded-lg w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text" placeholder="Add a task">
                <textarea v-model="todo.description" class="appearance-none bg-gray-50  border-2 border-gray-300 rounded-lg w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Task description ..."></textarea>

            </div>

            <button
                class="flex-shrink-0 flex bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit" :disabled="loading">

                 <svg xmlns="http://www.w3.org/2000/svg" v-if="loading" class="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path></svg>
                Add
            </button>
        </div>
    </form>
    <ul class="divide-y  h-full divide-gray-200 px-4">
        <li class="py-4" v-if="todos.length > 0" v-for="todoData in todos" :key="todoData.id">
            <div class="flex items-start" v-if="editingId !== todoData.id">
                <input id="todo1" name="todo1" @change="makeCompleted(todoData.id)" type="checkbox" :checked="todoData.is_completed"
                    class="h-4 w-4 text-teal-600 focus:ring-teal-500 mt-2 border-gray-300 rounded">
                    <div class="flex flex-col w-full space-y-1">
                <label for="todo1" class="ml-3 w-full flex justify-between items-start text-gray-900">
                    <div class="flex flex-col">
                      <span class="text-lg font-medium">{{ todoData.label }}

                      </span>
                         <span class="text-xs flex justify-center items-center font-semibold text-blue-500" v-if="todoData.is_completed">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 10H4V19H20V10ZM15.0355 11.136L16.4497 12.5503L11.5 17.5L7.96447 13.9645L9.37868 12.5503L11.5 14.6716L15.0355 11.136ZM7 5H4V8H20V5H17V6H15V5H9V6H7V5Z"></path></svg>
                          {{ moment(todoData.completed_at).format('DD/MM/yyyy') }}</span>
                    </div>
                    <div>
                         <span class="text-sm font-light text-gray-500">{{ moment(todo.created_at).format('DD/MM/yyyy') }}</span>
                         <div class="flex items-center justify-end px-3">
                          <button @click="editingId = todoData.id" class="text-xs flex font-semibold text-blue-500 mr-2"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg></button>
                          <button @click="deleteTodo(todoData.id)" class="text-xs flex font-semibold text-red-500">
                             <svg xmlns="http://www.w3.org/2000/svg" v-if="deletingId == todoData.id" class="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path></svg>
                            <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path></svg>
                            </button>
                         </div>
                    </div>

                </label>
                <p class="text-xs text-gray-400">{{ todoData.description }}</p>
              </div>
            </div>
              <div class="flex flex-col w-full space-y-2" v-else>
               <input v-model="todoData.label" required
                class="appearance-none bg-gray-50 border-2 border-gray-300 rounded-lg w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text" placeholder="Add a task">
                <textarea v-model="todoData.description" class="appearance-none bg-gray-50  border-2 border-gray-300 rounded-lg w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Task description ..."></textarea>
                <div class="flex w-full justify-center items-center gap-3">
                  <button class="px-3 py-1 text-sm bg-green-500 text-white flex gap-2 rounded-lg" :disabled="loading" @click="updateTodo(todoData)">
                      <svg xmlns="http://www.w3.org/2000/svg" v-if="loading" class="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path></svg>
                    Save</button>
                <button class="px-3 py-1 text-sm bg-red-500 text-white rounded-lg" @click="editingId = null">Cancel</button>
                </div>

            </div>
        </li>
        <li v-else>
          <div class="flex flex-col w-full space-y-2">
            <div class="text-center py-8">
              <svg class="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <h3 class="mt-4 text-lg font-medium text-gray-900">No todos yet</h3>
              <p class="mt-1 text-sm text-gray-500">Get started by creating a new todo item</p>
            </div>
          </div>
        </li>

    </ul>
</div>
  </layoutAuthenticated>
</template>

<script setup>
import LayoutAuthenticated from '@/layout/LayoutAuthenticated.vue'
import { onMounted } from 'vue';
import { ref } from 'vue';
import moment from 'moment'
import { useToast } from 'vue-toast-notification';
const toast = useToast()
const loading = ref(false)
const todo = ref({
  label: '',
  description:''
})
const editingId = ref(null)
const deletingId = ref(null)
const todos = ref([])
const getTodos = async () => {
  try {
    const response = await api().get('/todos')
    todos.value = response.data
  } catch (error) {
    console.error('Failed to fetch todos:', error)
  }
}
const addTodo = async () => {
  loading.value = true
  const response = await api().post('/todos', todo.value)
 getTodos()
  todo.value = {
    label: '',
    description:''
  }
   loading.value = false
}
const makeCompleted = async (id) => {
  try {
    const response = await api().get(`/todo-complete/${id}`)
    toast.success('Todo marked as completed')
    getTodos()
  } catch (error) {
    console.error('Failed to complete todo:', error)
    toast.error('Failed to mark todo as completed')
  }
}
const updateTodo = async (todoData) => {
  loading.value = true
  try {
    todoData._method = 'PUT'
    const response = await api().post(`/todos/${todoData.id}`, todoData)
    toast.success('Todo updated successfully')
    getTodos()
    editingId.value = null
  } catch (error) {
    console.error('Failed to update todo:', error)
    toast.error('Failed to update todo')
  }
  loading.value = false
}
const deleteTodo = async (id) => {
  deletingId.value = id
  try {
    const response = await api().delete(`/todos/${id}`)
    toast.success('Todo deleted successfully')
    getTodos()
  } catch (error) {
    console.error('Failed to delete todo:', error)
    toast.error('Failed to delete todo')
  }
   deletingId.value = null
}
onMounted(() => {
  getTodos()
})
</script>

<style lang="scss" scoped>

</style>
