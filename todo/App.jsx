import { FaTrashAlt } from "react-icons/fa";
import './App.css'
import { useState } from "react";
import { AddItem } from "../AddItem";
import { SearchItem } from "./SearchItem";

function App() {
  // const[fruits, setFruit] = useState(
  // [
  //   {name : 'Apple', rate : 75, from : 'Kashmir', id:1, chk:true},
  //   {name : 'Orange', rate : 65, from : 'Iran', id:2, chk:true},
  //   {name : 'Date', rate : 95, from : 'Saudi', id:3, chk:false},
  //   {name : 'Tomato', rate : 35, from : 'India', id:4, chk:true},
  //   {name : 'Kiwi', rate : 105, from : 'Turkey', id:5, chk:true}
  // ])

  //load from local storage
  const [fruits, setFruit] = useState(JSON.parse(localStorage.getItem('fruits')) || []);
  const [newItem, setItem] = useState('');
  const [search, setSearch] = useState('');

  function handleSubmit(e)
  {
      e.preventDefault() //stop from submitting form
      if(!newItem) return;
      console.log(fruits)
      addItem(newItem)
      setItem('')
  }

  const addItem = (item) => {
    const id = fruits.length ? fruits[fruits.length - 1].id + 1 : 1;
    const addNewItem = {id, name : item, rate:0, from:'trichy',  chk : false}; 
    const listItems = [...fruits, addNewItem]
    setFruit(listItems)
    localStorage.setItem("fruits", JSON.stringify(listItems))
     
  }

  const handleCheck = (id) =>{
    const new_fruits = fruits.map((i)=> i.id === id ? {...i, chk:!i.chk} : i)
    setFruit(new_fruits)
    localStorage.setItem("fruits", JSON.stringify(new_fruits))
  }

  const handleDelete = (id) => {
    const new_fruits = fruits.filter((i)=> i.id !== id)
    setFruit(new_fruits)
    localStorage.setItem("fruits", JSON.stringify(new_fruits))
  }

  const filteredFruits = fruits.filter((i) => 
    i.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <>
      <h1>Fruits</h1>
      <AddItem newItem={newItem} setItem={setItem} handleSubmit={handleSubmit} />
      <SearchItem search={search} setSearch = {setSearch}/>
      {filteredFruits.length === 0 && <h1>No Fruits</h1>}
      <ul>
        {/* {fruits.filter(i =>  i.rate<70).map(i=> <li> {i.name}  </li>)} */}
        {
          filteredFruits.map((i)=>(
            <li key={i.id}>
                <input type="checkbox" checked={i.chk} onChange={()=> handleCheck(i.id)}/> <label style={i.chk ? {textDecoration:'line-through'} : null} onDoubleClick={()=> handleCheck(i.id)}> {i.name} </label>
                <FaTrashAlt role='button' tabIndex="0" onClick={()=> handleDelete(i.id)}/>
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default App
