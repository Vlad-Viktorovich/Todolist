import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/',
    withCredentials: true,
    headers: {
        'api-key': '312f7870-a2e6-4219-b282-e67b5f5962c7'
    }
})

export const todolistApi = {
    getTodos() {
        return instance.get('todo-lists')
    },
    createTodo(title: string) {
        return instance.post('todo-lists', {title})
    },
    deleteTodo(todoId: string) {
        return instance.delete(`todo-lists/${todoId}`)
    },
    updateTodoTitle(todoId: string, title: string) {
        return instance.put(`todo-lists/${todoId}`, {title})
}}