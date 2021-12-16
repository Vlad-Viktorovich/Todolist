import { v1 } from 'uuid';
import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolist-reducer';


export type RemoveTaskType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId:string
}
export type AddTaskType = {
    type: 'ADD-TASK'
    title:string
    todolistId:string
}
export type ChangeStatusType ={
    type:'CHANGE-STATUS'
    taskId:string
    isDone:boolean
    todolistId:string
}
export type ChangeTaskTitleType = {
    type: 'CHANGE-TITLE'
    taskId:string
    title:string
    todolistId:string
}
type ActionType = RemoveTaskType | AddTaskType | ChangeStatusType | ChangeTaskTitleType | AddTodolistActionType | RemoveTodolistActionType

export const taskReducer = (state:TasksStateType, action: ActionType):TasksStateType => {
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
        case 'CHANGE-STATUS':{
            let todoTask = state[action.todolistId]
            let task = todoTask.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return {...state}
        }
        case 'CHANGE-TITLE':{
            let todolistTask = state[action.todolistId]
            let task = todolistTask.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return {...state}
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
            throw new Error ('I dont Understand')
    }
}
export const removeTaskAC = (taskId:string, todolistId:string):RemoveTaskType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string):AddTaskType => {
    return {type: 'ADD-TASK', title,todolistId}
}
export const changeStatusAC = (taskId: string, isDone: boolean, todolistId: string):ChangeStatusType => {
    return {type: 'CHANGE-STATUS', taskId,isDone,todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string):ChangeTaskTitleType => {
    return {type: 'CHANGE-TITLE', taskId,title,todolistId}
}