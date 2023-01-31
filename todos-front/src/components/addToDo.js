import axios from "axios";
import { useState } from "react";
import './addToDo.css'

const APIUrl = 'http://localhost:3001/todos'

const AddToDo = () => {
  const [title, setTitle] = useState('')

  const handleSubmit = () => {
    const newToDo = {title}

    axios.post(APIUrl, newToDo)
      .then(response => {
        setTitle('')
      }).catch(error => console.log(error))
  }

  return (
    <div className="addToDo">
      <form onSubmit={ handleSubmit }>
        <div className="input-group-sm flex-nowrap newToDo">
          <span className="input-group-text" id="addon-wrapping">New To Do: </span>
          <input 
            type="text" 
            className="form-control"
            id="add-todo" 
            placeholder="Type a title" 
            aria-label="Title" 
            aria-describedby="addon-wrapping"
            value={title}
            onChange={ e => setTitle(e.target.value) }
            />
        </div>
        <button type="submit" className="btn btn-outline-primary btn-sm submit-btn">Add</button>
      </form>
    </div>
  )
}

export default AddToDo