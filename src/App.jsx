import { useEffect, useState } from 'react'
import { TodoProvider } from './context/TodoContext'
import TodoForm from './component/TodoForm'
import TodoItem from './component/TodoItem'
import './App.css'

function App() {
  const [todo, setTodo] = useState([]);

  const addTodo = (todo) => {
    setTodo((prev) => [{id: Date.now(), ...todo}, ...prev]);
  };

  const updatedTodo = (todo, id) => {
    setTodo((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  };

  const removeTodo = (id) => {
    setTodo((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const togleCompleted = (id) => {
    setTodo((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo, isCompleted: !prevTodo.isCompleted} : prevTodo)));
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    console.log("LOADED FROM STORAGE: ", todos);
    if(todos && todos.length > 0){
      setTodo(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo))
  }, [todo]);

  return (
    <TodoProvider value={{todo, addTodo, updatedTodo, removeTodo, togleCompleted}}>
      <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <div className="mb-4">
                  {/* Todo form goes here */} 
                  <TodoForm />
              </div>
              <div className="flex flex-wrap gap-y-3">
                  {/*Loop and Add TodoItem here */}
                  {todo.map((todo) => (
                    <div key={todo.id}
                    className='w-full'
                    >
                      <TodoItem todo={todo} />
                    </div>
                  ))}
              </div>
          </div>
      </div>
    </TodoProvider>
  )
}

export default App
