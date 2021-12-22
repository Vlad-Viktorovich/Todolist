import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from './todolist-reducer';


export type RemoveTaskType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}
export type AddTaskType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeStatusType = {
    type: 'CHANGE-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleType = {
    type: 'CHANGE-TITLE'
    taskId: string
    title: string
    todolistId: string
}
type ActionType =
    RemoveTaskType
    | AddTaskType
    | ChangeStatusType
    | ChangeTaskTitleType
    | AddTodolistActionType
    | RemoveTodolistActionType


const initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
        {id: v1(), title: 'REDUX', isDone: false}],
    [todolistId2]: [
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
        {id: v1(), title: 'REDUX', isDone: false}]
}

export const taskReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let todoTask = state[action.todolistId]
            state[action.todolistId] = todoTask.filter(f => f.id !== action.taskId)
            return {...state}
        case 'ADD-TASK': {
            let task = {id: v1(), title: action.title, isDone: true};
            let newTasks = state[action.todolistId]
            state[action.todolistId] = [task, ...newTasks]
            return {...state}
        }
        case 'CHANGE-STATUS': {
            let todoTask = state[action.todolistId]
            state[action.todolistId] = todoTask.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            return ({...state})
        }
        case 'CHANGE-TITLE': {
            let todoTask = state[action.todolistId]
            state[action.todolistId] = todoTask.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return ({...state})

        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeStatusType => {
    return {type: 'CHANGE-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TITLE', taskId, title, todolistId}
}