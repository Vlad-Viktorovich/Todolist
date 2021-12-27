import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type FilterValuesType = 'All' | 'Completed' | 'Active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}





export const App = () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ])
    let [tasksObj, setTasksObj] = useState<TasksStateType>({
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

    let removeTodolist = (todolistId: string) => {
        setTodolists([...todolists.filter(tl => tl.id !== todolistId)])
        // let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        // setTodolists(filteredTodolist)
        //
        // delete tasksObj[todolistId]
        // setTasksObj({...tasksObj})
    }
    const removeTask = (id: string, todolistId: string) => {
        setTasksObj({...tasksObj, [todolistId]: tasksObj[todolistId].filter(tl => tl.id !== id)})
        // let tasks = tasksObj[todolistId]
        // let filteredTasks = tasks.filter(t => t.id ! = id)
        // tasksObj[todolistId] = filteredTasks
        // setTasksObj({...tasksObj})
    }
    const changeTodolistTitle = (id: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === id ? {...tl, title: newTitle} : tl))
    }
    const addTask = (title: string, todolistId: string) => {
        setTasksObj({...tasksObj, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasksObj[todolistId]]})
        // let task = {id: v1(), title: title, isDone: false}
        // let tasks = tasksObj[todolistId]
        // tasksObj[todolistId] = [task, ...tasks]
        // setTasksObj({...tasksObj})
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasksObj({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].map(tl => tl.id === taskId ? {...tl, isDone: isDone} : tl)
        })
        // // let tasks = tasksObj[todolistId]
        // // let task = tasks.find(t => t.id === taskId)
        // // if (task) {
        // //     task.isDone = isDone
        // //     setTasksObj({...tasksObj})
        // }

    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        setTasksObj({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].map(tl => tl.id === taskId ? {...tl, title: newTitle} : tl)
        })
        //  let tasks = tasksObj[todolistId]
        // let task = tasks.find(t => t.id === taskId)
        //  if (task) {
        //      task.title =newTitle
        //      setTasksObj({...tasksObj})
        //  }

    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
        // let todolist = todolists.find(tl => tl.id === todolistId)
        // if (todolist) {
        //     todolist.filter = value
        //     setTodolists([...todolists])
        // }
    }
    const addTodolist = (title: string) => {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'All',
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasksObj({...tasksObj, [todolist.id]: []})
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
                            let tasksForTodolist = tasksObj[tl.id]
                            if (tl.filter === 'Completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                            }
                            if (tl.filter === 'Active') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                            }

                            return <Grid item>
                                <Paper style={ {padding: '10px'} }>
                                <TodoList
                                key={tl.id}
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