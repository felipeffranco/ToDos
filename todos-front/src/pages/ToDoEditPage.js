import './ToDoEditPage.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const APIUrl = 'http://localhost:3001/todos/'

const EditToDo = () => {
  const [title, setTitle] = useState('')
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${APIUrl}${id}`)
      .then(response => {
        const {
          title,
          completed
        } = response.data
        setTitle(title)
        setCompleted(completed)
        setLoading(false)
      }).catch(err => console.log(err))
  }, [id])


  const handleSubmit = e => {
    e.preventDefault()

    const editToDo = {
      title, completed}


    axios.put(`${APIUrl}${id}`, editToDo)
      .then(response => {
       
        navigate('/')
      }).catch(err => console.log(err))
  }

  if (loading) {
    return <h1>TO DO not found!</h1>
  }

  return (
    <div className="ToDoEditPage">
      
      {(
        <form onSubmit={ handleSubmit }>
          <div className="input-group-sm flex-nowrap newToDo">
            <label className="input-group-text todo-edit" id="addon-wrapping" >To Do:</label>
            <input 
              type="text" 
              className="form-control"
              id="field" 
              placeholder="Type your updates here" 
              value={title}
              onChange={ e => setTitle(e.target.value) }
              />
          </div>
          {/* <div className="input-group-sm flex-nowrap newToDo">
            <label className="input-group-text" id="addon-wrapping">Completed: </label>
            <input 
              type="text" 
              className="form-control"
              id="completed" 
              placeholder="true or false" 
              value={completed}
              onChange={ e => setCompleted(e.target.value) }
            />
          </div> */}
          <button type="submit" className="btn btn-outline-primary btn-sm submit-btn save-btn2">SAVE</button>
        </form>
      )}
    </div>
  )
}

export default EditToDo