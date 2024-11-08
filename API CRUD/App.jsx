import { useEffect, useState } from 'react';
import './App.css'
import { AddItem } from './AddItem';
import apiRequest from './apiRequest';

function App() {
  const API_URL = "http://localhost:3500/tasks";
  const [tasks, setTasks] = useState([]);
  const [fetchErr, setFetchErr] = useState(null);
  const [ newTask, setNewTask ] = useState('')

  useEffect(()=>{
    const fetchTaks = async() => {
      try{
        const response = await fetch(API_URL);
        if(!response.ok)
          throw Error("Data not received")
        const tasks = await response.json()
        setTasks(tasks)
        console.log(tasks)
        setFetchErr(null)
      }
      catch(err){
        setFetchErr(err.stack)
      }
    }
    fetchTaks()
  },[tasks]);

  const addTask = async(newtask)=>{
    const id = tasks.length ? parseInt(tasks[tasks.length - 1].id) + 1 : 1;
    const userId = tasks.length ? tasks[tasks.length - 1].userId + 1 : 1;
    const addNewTask = {id, completed:false, title : newtask, userId}
    const listTasks = [...tasks, addNewTask]
    setTasks(listTasks)

    //add to API
    const postOptions = {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(addNewTask)
    }
      const result = await apiRequest(API_URL, postOptions)
      if(result) setFetchErr(result)
  }

  const handlenewTask = (e)=>{
    e.preventDefault();
    if(!newTask) return;
    addTask(newTask);
    setNewTask('');
  }

  const handleUpdate = async (id) =>{
    const listTasks = tasks.map((task)=> task.id === id ?  {...task, completed:!task.completed} : task)
    setTasks(listTasks)

    //update on API
    const myTasktoUpdate = listTasks.filter((task) => task.id === id)

    const updateOptions = {
      method : 'PATCH', //used to update particular data in json object
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({completed:myTasktoUpdate[0].completed}) //here we modifiy only completed key in json
    }

    const urlforupdate = `${API_URL}/${id}`
    const result = await apiRequest(urlforupdate, updateOptions)
    if(result) setFetchErr(result)
  }

  const handleDelete = async (id) => {
    const listTasks = tasks.map((task)=> task.id!==id)
    setTasks(listTasks)

    const deleteOptions = {
      method : 'DELETE'
    }

    const urlfordel = `${API_URL}/${id}`
    const result = await apiRequest(urlfordel, deleteOptions)
    if(result) setFetchErr(result)

  }

  return (
    <>
      {fetchErr && <p>{`Error: ${fetchErr}`}</p>}
      <h1>Tasks from API</h1>
      <AddItem newTask={newTask} setNewTask = {setNewTask} handlenewTask = {handlenewTask}/>
      <div id="tasks">
          {tasks.map(task => (
            <div className="task" key={task.id}>
                <h4>id : {task.id}</h4>
                <h4>Task: {task.title}</h4>
                <p>Status: {task.completed ? "Completed" : "Pending"}</p>
                <button onClick={()=>handleUpdate(task.id)}>Complete Task</button>
                <button onClick={()=>handleDelete(task.id)}>Delete Task</button>
            </div>
          ))}
      </div>
    </>
  )
}

export default App
