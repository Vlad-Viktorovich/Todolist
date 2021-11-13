import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';



export const App =()=>{
    let tasks:Array<TaskType> = [
        {id:1,title:"CSS",isDone:true},
        {id:2,title:"JS",isDone:true},
        {id:3,title:"REACT",isDone:false}
    ]


    return(
        <div className="App">
<TodoList title="What to learn" tasks={tasks}/>
</div>

    )
}