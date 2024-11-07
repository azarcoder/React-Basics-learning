import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const API_URL = "http://localhost:3500/tasks";
  const [tasks, setTasks] = useState([]);
  const [fetchErr, setFetchErr] = useState(null);

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
  },[]);

  return (
    <>
      {fetchErr && <p>{`Error: ${fetchErr}`}</p>}
      <h1>Tasks from API</h1>
      <div id="tasks">
          {tasks.map(task => (
            <div className="task" key={task.id}>
                <h4>id : {task.id}</h4>
                <h4>Task: {task.title}</h4>
                <p>Status: {task.completed ? "Completed" : "Pending"}</p>
            </div>
          ))}
      </div>
    </>
  )
}

export default App
