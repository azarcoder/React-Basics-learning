export const AddItem = ({newTask, setNewTask, handlenewTask }) => {
  return (
    <div>
        <form onSubmit={handlenewTask}>
            <input type="text" placeholder="Enter new task" onChange={(e)=>setNewTask(e.target.value)} value={newTask} required/>
            <button type="submit">Add</button>
        </form>
    </div>
  )
}
