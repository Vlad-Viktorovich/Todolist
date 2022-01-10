import React, {useEffect, useState} from 'react'
import {todolistApi} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistApi.getTodos()
        .then((res) => {
            const todos = res.data
            setState(todos)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = '1111111'
       todolistApi.createTodo(title)
           .then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = ''
      todolistApi.deleteTodo(todoId)
        .then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const todoId = ''
    const title = '22222'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
     todolistApi.updateTodoTitle(todoId,title)
       .then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
