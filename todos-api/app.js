import express from 'express'
import cors from 'cors'
import connectDB from './config/db.connection.js'
import ToDo from './models/Todo.model.js'

const PORT = 3001
connectDB()
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('ToDo API working properly!')
})

app.get('/todos', async (req, res) => {
  try {
    const toDoList = await ToDo.find({})
    return res.status(200).json(toDoList)
  } catch(error) {
    console.log(error)
    return res.status(500).json({message: 'Internal Server Error!'})
  } 
})

app.post('/todos', async (req, res) => {
  try {
    const newToDo = await ToDo.create(req.body)
    return res.status(201).json(newToDo)
  } catch (error) {
    console.log('Error during ToDo creation!', error)
    return res.status(500).json({message: 'Internal Server Error'})
  }
})

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const toDoId = await ToDo.findById(id)

    if (!toDoId) {
      return res.status(404).json({message: "ToDo not found!"})
    }
    return res.status(200).json(toDoId)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'Internal Server Error!'})
  }
})

app.put('/todos/:id', async (req, res) => {
  try {
      const payload = req.body
      const { id } = req.params

      const updatedToDo = await ToDo.findOneAndUpdate({_id: id}, payload, { new: true })
      return res.status(200).json(updatedToDo)
  } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Internal Server Error'})
  }
})

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    await ToDo.findOneAndDelete({_id: id})
    res.status(204).json()
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'Internal Server Error'})
  }
})

app.listen(PORT, () => console.log('Server listening on port ', PORT))