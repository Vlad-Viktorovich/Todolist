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
        return instance.get<ResponseType<{item:TodoType}>>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{}>>('todo-lists', {title})
    },
    deleteTodo(todoId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todoId}`)
    },
    updateTodoTitle<ResponseType>(params: { todoId: string, title: string }) {
        return instance.put(`todo-lists/${params.todoId}`, {title: params.title})
    }
}

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: string
}

type ResponseType<T> ={
    data: T
    fieldErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

