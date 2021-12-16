import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';


type ActionType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string

}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: Array<TodolistType> = [
    {id: todolistId1, title: 'What to learn', filter: 'All'},
    {id: todolistId2, title: 'What to buy', filter: 'All'}
]

export const todolistReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            // const todolistId = v1()
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'All'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                //если нашелся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist)
                // если нашелся - изменит ему заголовок
            {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            return state
    }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistActionAC = (title: string, todolistId: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: todolistId}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId}
}
