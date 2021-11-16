import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'All' | 'Completed' | 'Active'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


export const App = () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolidts] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'Active'},
        {id: todolistId2, title: 'What to buy', filter: 'Completed'}
    ])

    let [tasksObj, setTasksObj] = useState<any>({
        [todolistId1]: [
            {id: v1(), title: 'Rararar', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'REDUX', isDone: false}],
        [todolistId2]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'REDUX', isDone: false}]
    })

    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter((t:any) => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj})
    }
    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasksObj({...tasksObj})
    }
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        /*let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }*/
        setTasksObj(
            {
                ...tasksObj,
                [todolistId]: tasksObj[todolistId].map((task:any) => task.id === taskId ? {
                    ...task,
                    isDone: isDone
                } : task)
            })

    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        /*let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
        }*/
        setTodolidts(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }


    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id]
                    if (tl.filter === 'Completed') {
                        tasksForTodolist = tasksForTodolist.filter((t:any) => t.isDone === true)
                    }
                    if (tl.filter === 'Active') {
                        tasksForTodolist = tasksForTodolist.filter((t:any) => t.isDone === false)
                    }

                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        addTask={addTask}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>

    )
}