import React from 'react'
import './css/TodoList.css'
import TodoItem from './TodoItem'

const TodoList = ({ todos, updatedChecked ,updatedText,onDelete}) => {
    return (
        <div className="TodoList">
            <h4>Todo List 🌱</h4>
            <input placeholder="검색어를 입력하세요" />
            <div className="todos_wrapper">
                {todos.map((todo) => (

                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onDelete={onDelete}
                        updatedText={updatedText}
                        updatedChecked={updatedChecked}
                    />
                ))}
            </div>
        </div>
    )
}

export default TodoList