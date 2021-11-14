import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';

export type FilterValuesType = 'All' | 'Completed' | 'Active'

export const App = () => {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'REACT', isDone: false},
        {id: 4, title: 'REDUX', isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('All')


    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter=(value:FilterValuesType)=>{
        setFilter(value)

    }

    let tasksForTodolist = tasks
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            /></div>

    )
}