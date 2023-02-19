import { useEffect, useState } from "react"
import thingService from './services/things'

const Header = () => <h1>THINGS TO DO </h1>

const FillTheBox = (props) => (
  <form onSubmit={props.addItem}>
    <input value={props.value} onChange={props.onChange}/>
    <button type="submit">Add new</button>
  </form>
)

const ToDoItem = ({note, deleteItem}) => (<>
<b>{note.item}    </b>
<button onClick={deleteItem}>Delete</button>
<p>Created on {note.date}</p>
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

  //event.preventDefault() -> To prevent the browser reload/refresh
  const addItem = (event) => {
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

  const deleteItem = (id) => {
    thingService
      .remove(id)
      .then(() => {
        setThings(things.filter(x => x.id !== id))
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
          note={x} 
          deleteItem={() => deleteItem(x.id)}/>)}
    </div>
  )
}

export default App