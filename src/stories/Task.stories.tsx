import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../Task';

export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {}
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = () => {
    const [task, setTask] = useState({id: '122', isDone: true, title: 'JS'})
    const changeTaskStatus = () => setTask({id: '122', isDone: !task.isDone, title: 'JS'})
    return <Task
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={action('changeTaskTitle')}
        removeTask={action('removeTask')}
        task={task}
        todolistId="1"
    />
};

export const TaskStory = Template.bind({});
TaskStory.args = {}