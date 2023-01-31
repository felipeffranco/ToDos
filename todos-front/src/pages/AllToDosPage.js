import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AddToDo from '../components/addToDo'
import loading from '../assets/images/loading.gif'
import todoGif from '../assets/images/todoGif.gif'
import './AllToDosPage.css'

const APIUrl = 'http://localhost:3001/todos/'

const AllToDosPage = () => {
  const [ toDos, setToDos ] = useState([])
  const [refresh, setRefresh] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(APIUrl)
      .then(response => {
        setToDos(response.data)
      }).catch(error => console.log(error))
  }, [refresh])

  const deleteToDo = ToDoId => {
    axios.delete(`${APIUrl}${ToDoId}`)
      .then(response => {
        setRefresh(!refresh)
        navigate('/')
      }).catch(error => console.log(error))
  }

  return (
    <div className="AllToDosPage">
      <h1 id='pageTitle'>To Do List</h1>
      <img src={ todoGif } alt="Gif To Do" width="100px"/>
      <div className="list">
        <AddToDo />
        {
          toDos.length === 0 ?
          <div>
            <p>Wait while we update our list</p>
            <img src={ loading } alt="Loading GIF" />
          </div>
          :
          toDos.map(todo => {
            return (
                <div key={todo._id} className='todo-editBtn'>
                  <h5 className='singleToDo'>{ todo.title }</h5>
                  <div className="btns">
                    <Link 
                      className="edit-btn delete-btn btn btn-outline-primary btn-sm submit-btn"
                      to={`${todo._id}`}
                      >Edit
                    </Link>
                    <button
                      onClick={ () => deleteToDo(todo._id) }
                      id='delete'
                      className="edit-btn delete-btn btn btn-outline-primary btn-sm submit-btn"
                      >X
                    </button>
                  </div>
                </div>
              )
            })
          }
      </div>
    </div>
  )
}

export default AllToDosPage