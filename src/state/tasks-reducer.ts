import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodosActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from './store';
import {setAppErrorAC, setAppStatusAC, SetErrorAC, SetStatusAC} from './app-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}


type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodosActionType
    | SetTasksActionType
    | SetStatusAC
    | SetErrorAC


const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        case 'SET-TODOS': {
            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            return {
                ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todo.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}


export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setAppStatusAC('succeeded'))
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}

export const addFetchTask = (id: string, title: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const {data} = await todolistsAPI.createTask(id, title)
        if (data.resultCode === 0) {
            dispatch(addTaskAC(data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            if (data.messages.length) {
                dispatch(setAppErrorAC(data.messages[0]))
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
            }
            dispatch(setAppErrorAC('failed'))
        }
    } catch (e) {
    }
}


export const removeFetchTask = (taskId: string, todolistId: string) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const {data} = await todolistsAPI.deleteTask(todolistId, taskId)
        if (data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(removeTaskAC(taskId, todolistId))
        }
    } catch (e) {

    }
}

export const changeFetchTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>, getState: () => AppRootStateType) => {
    const state = getState()
    const allTasks = state.tasks
    const tasksForCurrentTodo = allTasks[todolistId]
    const currentTask = tasksForCurrentTodo.find((t) => {
        return t.id === taskId
    })
    if (currentTask) {
        const model: UpdateTaskModelType = {
            title: currentTask.title,
            status,
            deadline: currentTask.deadline,
            description: currentTask.description,
            startDate: currentTask.startDate,
            priority: currentTask.priority
        }
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
            })
    }
}