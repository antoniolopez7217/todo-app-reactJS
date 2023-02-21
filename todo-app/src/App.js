import { useEffect, useState } from "react"
import thingService from './services/things'
import "./App.css";

const Header = () => <h1>THINGS TO DO </h1>

const FillTheBox = (props) => (
  <form onSubmit={props.addThing}>
    <input value={props.value} onChange={props.onChange}/>
    <button type="submit">Add new</button>
  </form>
)

const CheckBox = ({item, updateCompleted}) => {
  const [isChecked, setIsChecked] = useState(item.completed)
  const handleCheckChange = () => {
      setIsChecked((prev) => !prev)
    }

  return (
    <label>
      <input 
        type="checkbox" 
        checked={isChecked} 
        onClick={updateCompleted}
        onChange={handleCheckChange}/>
    </label>
)}

const EditButton = ({thing, things, setThings}) => {
  const [editValue, setEditValue] = useState('')

  
    const updateItem = (event) => {
      event.preventDefault()
      const changedThing = {...thing, item:editValue}
      let id = changedThing.id
      console.log(changedThing)
      thingService
        .update({id, changedThing})
        .then(() => {
          setThings(things.map(x => x.id === id ? changedThing : x))
        })
      setEditValue('')
    }
  
    const handleEditValueChange = (event) => {
      setEditValue(event.target.editValue)}
  
  return (
  <form onSubmit={updateItem}>
    <input value={editValue} onChange={handleEditValueChange}/>
    <button type="submit">Edit</button>
  </form>
)}

const ToDoItem = ({item, deleteThing, updateCompleted, things, setThings}) => (
  <div>
    <CheckBox item={item} updateCompleted={updateCompleted}/>
    <span style={{textDecorationLine: item.completed? 'line-through' : ''}}>{item.item}    </span>
    <button onClick={deleteThing}>Delete</button>
    <EditButton thing={item} things={things} setThings={setThings}/>
    <br />
  </div>
)

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
  const addThing = (event) => {
    if(!value){
      setTimeout(window.alert("You are trying to create an empty item")
      , 2000)
      return
      }
      //event.preventDefault() -> To prevent the browser reload/refresh
    event.preventDefault()
    let newThing = {
      item: value,
      completed: false,
      date: Date()
    }

    thingService
      .create(newThing)
      .then(res => {
        setThings(things.concat(res))
        console.log(`${newThing.item} added`)
      })
      setValue('')
  }

  //Delete info from the json server
  const deleteThing = (thing) => {
    thingService
      .remove(thing.id)
      .then(() => {
        setThings(things.filter(x => x.id !== thing.id))
        console.log(`${thing.item} deleted`)
      })
  }

  const updateCompleted = (thing) => {
    let changedThing = {...thing, completed:!thing.completed}
    updateThing(changedThing)
  }
 

  const updateThing = (changedThing) => {
    let id = changedThing.id

    thingService
      .update({id, changedThing})
      .then(() => {
        setThings(things.map(x => x.id === id ? changedThing : x))
      })
  }

  const handleValueChange = (event) => {setValue(event.target.value)}

  return (
    <div>
      <Header />
      <FillTheBox 
        addThing={addThing} 
        value={value} 
        onChange={handleValueChange}/>
      <br />
        {things.map(x => 
        <ToDoItem
          things={things}
          key={x.id}
          updateCompleted={() => updateCompleted(x)}
          item={x} 
          deleteThing={() => deleteThing(x)}/>)}
    </div>
  )
}

export default App