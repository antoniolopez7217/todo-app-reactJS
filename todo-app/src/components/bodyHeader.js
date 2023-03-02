import {CheckBoxCompleted, DeleteButton} from './buttons.js'

const Header = () => <h1>THINGS TO DO </h1>

const ToDoItem = ({item, deleteThing, updateCompleted}) => (
  <div>
    <CheckBoxCompleted item={item} updateCompleted={updateCompleted}/>
    <DeleteButton deleteThing={deleteThing} />
    <br />
  </div>
)

export {Header, ToDoItem}