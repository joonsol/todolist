import React, { useState } from 'react'
import './css/TodoItem.css'

const TodoItem = ({ todo, updatedChecked, updatedText ,onDelete}) => {

    const [editing, setEditing] = useState(false)
    const [text, setText] = useState(todo.text)

    const startEdit = () => {
        setText(todo.text)
        setEditing(true)
    }

    const cancelEdit = () => {
        setText(todo.text)
        setEditing(false)
    }

    const saveEdit = async () => {
        const next = text.trim()

        if (!next || next === todo.text) {
            return setEditing(false)
        }
        await updatedText(todo._id, next)
        setEditing(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') saveEdit()
        if (e.key === 'Escape') cancelEdit()
    }
    return (
        <div className="TodoItem">
            <input type="checkbox" onChange={() => updatedChecked(todo._id, !todo.isCompleted)} checked={todo.isCompleted} />

            {editing ? (
                <div className="edit-wrap">
                    <input
                        className='edit-input'
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        placeholder='수정할 내용을 입력하세요'
                    />
                    <div className="date">{new Date(`${todo.date}`).toLocaleDateString()}</div>
                    <div className="btn-wrap">
                        <button className='updateBtn' onClick={saveEdit} disabled={!text.trim()}> 수정</button>
                        <button className='deleteBtn' onClick={cancelEdit}>취소</button>
                    </div>
                </div>

            ) : (
                <div className='content-wrap'>
                    <div className="content">{todo.text}</div>
                    <div className="date">
                        {new Date(todo.createdAt || todo.date).toLocaleDateString('sv-SE')}
                    </div>
                    <div className="btn-wrap">
                        <button className="updateBtn" onClick={startEdit}>수정</button>
                        <button className="deleteBtn"
                        onClick={()=>onDelete(todo._id)}
                        >삭제</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TodoItem