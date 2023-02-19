import { useEffect, useState } from "react"
import thingService from './services/things'

const Header = () => <h1>THINGS TO DO</h1>
const ToDoItem = (props) => <p>{props.note}</p>
const FillTheBox = (props) => (
  <form>
    <input value={props.value} onChange={props.onChange}/>
  </form>
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

  //const addPerson = (event)


  const handleValueChange = (event) => {setValue(event.target.value)}

  return (
    <div>
      <Header />
      <FillTheBox value={value} onChange={handleValueChange}/>
      <ul>
        {things.map(x => 
        <li><ToDoItem note={x.item}/></li>)}
      </ul>
    </div>
  )
}

export default App