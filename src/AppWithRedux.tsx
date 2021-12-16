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
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';

export type FilterValuesType = 'All' | 'Completed' | 'Active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState,Array<TodolistType>>(state=>state.todolists)
    const tasks = useSelector<AppRootState,TasksStateType>(state=>state.tasks)


    const removeTask = (id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeStatusAC(taskId, isDone, todolistId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    const changeFilter = ( value: FilterValuesType,todolistId: string) => {
        dispatch(changeTodolistFilterAC(value,todolistId))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
        dispatch(removeTodolistAC(todolistId))
    }
    const changeTodolistTitle = (id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id,newTitle))
    }
    const addTodolist = (title: string) => {
        const todolistId = v1()
        dispatch(addTodolistActionAC(title,todolistId))
        dispatch(addTodolistActionAC(title,todolistId))
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