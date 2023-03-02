import { useEffect, useState } from "react"
import thingService from './services/things'
import {NewThing, FilterButtons} from './components/buttons.js'
import {ToDoItem, Header} from './components/bodyHeader.js'
import './App.css'

const App = () => {
  const [things, setThings] = useState([])
  const [value, setValue] = useState('')
  const [filter, setFilter] = useState("all")

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

  //Update complete status
  const updateCompleted = (thing) => {
    let changedThing = {...thing, completed:!thing.completed}
    let id = changedThing.id

    thingService
      .update({id, changedThing})
      .then(() => {
        setThings(things.map(x => x.id === id ? changedThing : x))
        console.log(`${changedThing.item} updated`)
      })
  }

  const filterThings = filter==="completed" ? things.filter(thing => thing.completed===true) :
  filter === "all" ? things : things.filter(thing => thing.completed===false)

  const handleValueChange = (event) => {setValue(event.target.value)}

  return (
    <div>
      <Header />
      <NewThing 
        addThing={addThing} 
        value={value} 
        onChange={handleValueChange}/>
      <FilterButtons setFilter={setFilter}/>
      <br />
        {filterThings.map(x => 
        <ToDoItem
          key={x.id}
          updateCompleted={() => updateCompleted(x)}
          item={x} 
          deleteThing={() => deleteThing(x)}/>)}
      </div>
  )
}

export default App