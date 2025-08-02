import React, { useState } from 'react'
import './css/TodoEditor.css'

const TodoEditor = ({ onCreate }) => {
    const [text, setText] = useState("")


    const submit = (e) => {
        e.preventDefault()
        onCreate(text)
        setText("")
    }
    return (
        <form onSubmit={submit} className="Editor">
            <input
                value={text}
                onChange={(e) => { setText(e.target.value) }}
                placeholder="새로운 Todo..." />
            <button onClick={submit}>추가</button>
        </form>
    )
}

export default TodoEditor