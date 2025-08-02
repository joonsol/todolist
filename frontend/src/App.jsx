
import './App.css';
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import React, { useEffect, useState, useMemo } from 'react';
import axios from "axios"
function App() {
  const [todos, setTodos] = useState([])
  const API = `${import.meta.env.VITE_API_URL}/api/todos`

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(API)


        const data = Array.isArray(res.data) ? res.data : res.data.todos ?? [];
        setTodos(data)

        console.log(data)

      } catch (error) {
        console.log('  가져오기 실패', error)
      }
    }
    fetchTodos()
  }, [])

  const onCreate = async (todoText) => {

    if (!todoText?.trim()) return;
    try {
      const res = await axios.post(API, { text: todoText.trim() })

      const created = res.data?.todo ?? res.data

      if (Array.isArray(res.data?.todos)) {
        setTodos(res.data.todos)
      } else {
        setTodos((prev) => [created, ...prev])
      }
    } catch (error) {
      console.log('추가 실패', error)
    }


  }
  const onUpdatedChecked = async (id, next) => {
    try {
      const { data } = await axios.patch(`${API}/${id}/check`, { isCompleted: next })


      if (Array.isArray(data?.todos)) {
        setTodos(data.todos)
      }
      else {
        const updated = data?.todo ?? data;
        setTodos((prev) => prev.map(t => (t._id === updated._id ? updated : t)))
      }
    } catch (error) {
      console.error(" 체크 상태 업데이트 실패", error)
    }
  }

  const updatedText = async (id, next) => {

    const value=next?.trim()
    if(!value) return
    try {
      const { data } = await axios.patch(`${API}/${id}/text`, { text:value })


      if (Array.isArray(data?.todos)) {
        setTodos(data.todos)
      }
      else {
        const updated = data?.todo ?? data;
        setTodos((prev) => prev.map(t => (t._id === updated._id ? updated : t)))
      }
    } catch (error) {
      console.error(" 체크 상태 업데이트 실패", error)
    }
  }



  return (
    <div className='App'>

      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList
        todos={Array.isArray(todos) ? todos : []}
        updatedText={updatedText}
        updatedChecked={onUpdatedChecked} />
    </div>
  );
}

export default App;
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> c1a21799ef565bf15d51da5c2859e464cdd18b20
