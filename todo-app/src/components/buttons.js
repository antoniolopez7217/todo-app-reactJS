import {useState} from "react"

const NewThing = (props) => (
	<form onSubmit={props.addThing}>
	  <input value={props.value} onChange={props.onChange}/>
	  <button type="submit">Add</button>
	</form>
  )
  
const CheckBoxCompleted = ({item, updateCompleted}) => {
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
			<span style={{textDecorationLine: item.completed? 'line-through' : ''}}>
			{item.item}
		</span>
		</label>
)}

const FilterButtons = ({setFilter}) => (
	<div >
	  <button onClick={() => {setFilter("all")}}> All</button>
	  <button onClick={() => {setFilter("Active")}}> Active</button>
	  <button onClick={() => {setFilter("completed")}}> Completed</button>
	</div>
  )

const DeleteButton = (props) => (<button onClick={props.deleteThing}>Delete</button>)


export {NewThing, CheckBoxCompleted, FilterButtons, DeleteButton}