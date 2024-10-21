import React, { useEffect, useState } from 'react'
import UserCard from './UserCard';
import {useForm} from 'react-hook-form'
import { useRef } from 'react';

function App() {
  let [userId, setUserId] = useState(0)
  let [userToDos, setUserToDos] = useState([]);
  let [due, setDue] = useState(Date)
  let taskInput = useRef();
  let dueDateInput = useRef();
  
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  function addTask(event){
    event.preventDefault();
    let newTask = document.getElementById('newTask');
    newTask.classList.remove('hidden');
  }
  useEffect(()=>{
    setUserToDos(userToDos);
  },[taskInput])

  function submitHandler(event){
    event.preventDefault();
    let todo={
      id : userId,
      title : taskInput.current.value,
      dueDate : new Date(dueDateInput.current.value).toLocaleDateString('en',options)
    }
    setUserToDos([...userToDos,todo]);
    setUserId(userId+1);
    taskInput.current.value = '';   
  }
    function deleteTask(id){
      let newIndex = userToDos.findIndex(x => x.id == id);
      console.log('index is ', newIndex);
      let newToDo = userToDos.splice(newIndex,1);
      setUserToDos([...userToDos,newToDo])
      console.log('splice todo', newToDo);
    }
  return (
    <div>
      <div>
        <div className='bg-black text-white h-14 mx-auto w-full'>
          <h1 className='w-full mx-auto text-center py-4 font-light'>If you have got tasks, start managing today</h1>
        </div>
        <div className='mt-16 w-[360px] mx-auto'>
          <h1 className='text-blue-600 font-bold text-xl'>Manage your task <span className='text-neutral-600 font-bold'>@sajan</span></h1>
          <p className='text-neutral-500 mt-1'>Add your tasks and start organizing them quickly</p>
          <form action="" onSubmit={submitHandler}>
            <div className='mt-10 w-full hidden' id='newTask'>
              <div className='w-full flex items-center gap-4'>
                <input ref={taskInput} className='w-[87%] border px-4 py-3 rounded-xl focus:outline-none focus:border-violet-400 focus:ring-2' type="text" placeholder='eg: Learn Javascript' />
                <input ref={dueDateInput}  id='dueDate' className='w-[13%] border px-3 py-3 rounded-lg focus:outline-none' type="datetime-local" name="" />
              </div>
              <input type='submit' value='Add Task' className='mt-2 bg-black text-white px-3 py-2 rounded-lg font-light'/>    
            </div>
          </form>
          <div>
            <div className='w-full mt-10'>
              {
                 userToDos.length > 0 ? userToDos.map(user => <UserCard key={user.id} id={user.id} title={user.title} dueDate={user.dueDate} deleteTask={deleteTask}/>) : ""
              }
            </div>
          </div>
        </div>
        <div>
          <button  id="addTaskButton" onClick={addTask}  className="fixed bottom-10 w-10 h-10 rounded-full right-10 bg-black text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus mx-[8px]" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
