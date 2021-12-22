import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core'
import {Backspace, DeleteOutline} from '@material-ui/icons';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {


    const onAllClickHandler = useCallback(() => {
        props.changeFilter('All', props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('Active', props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('Completed', props.id)
    }, [props.changeFilter, props.id])
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    let tasksForTodolist = props.tasks
    if (props.filter === 'Completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
    }
    if (props.filter === 'Active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Backspace fontSize={'medium'} color={'primary'}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    tasksForTodolist.map(t => <Task
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        task={t}
                        todolistId={props.id}
                        key={props.id}
                    />)
                }
            </ul>
            <div>
                <Button variant={'contained'} color={props.filter === 'All' ? 'default' : 'primary'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={'contained'} color={props.filter === 'Active' ? 'default' : 'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={'contained'} color={props.filter === 'Completed' ? 'default' : 'primary'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

