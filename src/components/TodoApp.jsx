import React, { useEffect, useState } from 'react'
import Todo from './Todo';

function TodoApp() {

  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);

  function handleChange(e) {
    e.preventDefault();
    const value = e.target.value;
    setTitle(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    }

    const temp = [...todos];
    temp.unshift(newTodo);

    setTitle('')
    setTodos(temp);

    localStorage.setItem('data', JSON.stringify(temp));
  }

  function handleUpdate(id, value) {
    const temp = [...todos];
    const item = temp.find(item => item.id === id);
    item.title = value;
    localStorage.setItem('data', JSON.stringify(temp));
    setTodos(temp);
  }

  function handleDelete(id) {
    const temp = todos.filter(item => item.id != id);
    localStorage.setItem('data', JSON.stringify(temp));
    setTodos(temp);
  }

  useEffect(() => {
    const todoList = localStorage.getItem('data');
    if (todoList) {
      const array = JSON.parse(todoList);
      setTodos(array);
    }
  }, [])


  return (
    <div className='container mt-5'>
      <div className='row'>
        <h1 className='text-center mb-4 text-dark fw-medium'>To Do App</h1>
        <div className='col-md-2'></div>
        <div className='col-md-8'>
          <form onSubmit={handleSubmit} className='form-control shadow pt-4'>
            <input onChange={handleChange} type="text" className='form-control shadow' value={title} />
            <button type="submit" className='btn btn-dark mt-3 mb-2 shadow'>Crear</button>
          </form>
        </div>
        <div className='col-md-2'></div>
        <div className='mt-5'>
          {
            todos.map(item => (
              <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))
          }
        </div>
      </div>
    </div>


  )
}

export default TodoApp