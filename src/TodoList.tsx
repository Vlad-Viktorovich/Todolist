import React from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:number)=>void
    changeFilter: (value:FilterValuesType)=>void
}

export const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => <li><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                props.removeTask(t.id)
                            }}>x
                            </button>
                        </li>
                    )
                }
            </ul>
            <div>
                <button onClick={() => {props.changeFilter('All')}}>All</button>
                <button onClick={() => {props.changeFilter('Active')}}>Active</button>
                <button onClick={() => {props.changeFilter('Completed')}}>Completed</button>
            </div>
        </div>
    )
}