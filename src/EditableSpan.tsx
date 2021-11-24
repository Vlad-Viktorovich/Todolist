import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    onChange:(newValue:string)=>void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let[editMode,setEditMode]=useState(false)
    let[title,setTitle]=useState("")

    const activeEditMode=()=> {
        setEditMode(true)
        setTitle(props.title)
    }
    const activeViewMode=()=>{
        setEditMode(false)
        props.onChange(title)
    }
    const onCgangeTitleHandler=(event:ChangeEvent<HTMLInputElement>)=>setTitle(event.currentTarget.value)


    return (editMode
        ? <TextField size={'medium'} value={title} onChange={onCgangeTitleHandler} onBlur={activeViewMode} autoFocus/>
       : <span onDoubleClick={activeEditMode}>{props.title}</span>
    )

}
