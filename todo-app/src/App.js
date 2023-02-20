import { useEffect, useState } from "react"
import thingService from './services/things'
import "./App.css";

const Header = () => <h1>THINGS TO DO </h1>

const CheckBox = ({item, updateItem}) => {
const [isChecked, setIsChecked] = useState(item.completed);
const handleCheckChange = () => {
  setIsChecked((prev) => !prev)
}

return (
  <label>
    <input 
      type="checkbox" 
      checked={isChecked} 
      onClick={updateItem}
      onChange={handleCheckChange}/>
  </label>
  )}


const FillTheBox = (props) => (
  <form onSubmit={props.addItem}>
    <input value={props.value} onChange={props.onChange}/>
    <button type="submit">Add new</button>
  </form>
)

const ToDoItem = ({item, deleteItem, updateItem}) => (
<>
<CheckBox item={item} updateItem={updateItem}/>
<b>{item.item}    </b>
 {/* This button will edit the item */}
<button> Edit </button>
<button onClick={deleteItem}>Delete</button>
<p>Created on {item.date}</p>
</>)

const App = () => {
  const [things, setThings] = useState([])
  const [value, setValue] = useState('')
  
  //Get the info from the json server
  useEffect (() => {
    thingService
      .getAll()
      .then(res => {
        setThings(res)
      })
  },[])

  //Add info to the json server
  const addItem = (event) => {
    //event.preventDefault() -> To prevent the browser reload/refresh
    event.preventDefault()
    const newItem = {
      item: value,
      completed: false,
      date: Date()
    }

    thingService
      .create(newItem)
      .then(res => {
        setThings(things.concat(res))
        console.log(`${newItem.item} added`)
      })
      setValue('')
  }

  //Delete info from the json server
  const deleteItem = (thing) => {
    thingService
      .remove(thing.id)
      .then(() => {
        setThings(things.filter(x => x.id !== thing.id))
        console.log(`${thing.item} deleted`)
      })
  }

  const updateItem = (thing) => {
    const newItem = {...thing, completed:!thing.completed}
    let id = thing.id
    thingService
      .update({id, newItem})
      .then(() => {
        setThings(things.map(x => x.id === id ? newItem : x))
      })
  }

  const handleValueChange = (event) => {setValue(event.target.value)}

  return (
    <div>
      <Header />
      <FillTheBox 
        addItem={addItem} 
        value={value} 
        onChange={handleValueChange}/>
      <br />
        {things.map(x => 
        <ToDoItem
          key={x.id}
          updateItem={() => updateItem(x)}
          item={x} 
          deleteItem={() => deleteItem(x)}/>)}
    </div>
  )
}

export default App