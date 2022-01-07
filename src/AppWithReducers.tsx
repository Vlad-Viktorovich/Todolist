import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistActionAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from './state/todolist-reducer';
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from './state/tasks-reducer';

export type FilterValuesType = 'All' | 'Completed' | 'Active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithReducers = () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ])
    let [tasks, dispatchToTasksReducer] = useReducer(taskReducer, {
        [todolistId1]: [
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
        dispatchToTasksReducer(removeTaskAC(id, todolistId))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatchToTasksReducer(addTaskAC(title, todolistId))
    }
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchToTasksReducer(changeStatusAC(taskId, isDone, todolistId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    const changeFilter = ( value: FilterValuesType,todolistId: string) => {
        dispatchToTodolistsReducer(changeTodolistFilterAC(value,todolistId))
    }
    const removeTodolist = (todolistId: string) => {
        dispatchToTasksReducer(removeTodolistAC(todolistId))
        dispatchToTodolistsReducer(removeTodolistAC(todolistId))
    }
    const changeTodolistTitle = (id: string, newTitle: string) => {
        dispatchToTodolistsReducer(changeTodolistTitleAC(id,newTitle))
    }
    const addTodolist = (title: string) => {
        const todolistId = v1()
        dispatchToTasksReducer(addTodolistActionAC(title,todolistId))
        dispatchToTodolistsReducer(addTodolistActionAC(title,todolistId))
    }

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={9}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasks[tl.id]
                            if (tl.filter === 'Completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                            }
                            if (tl.filter === 'Active') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                            }

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        id={tl.id}
                                        addTask={addTask}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}