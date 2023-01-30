import express from 'express'
import cors from 'cors'
import connectDB from './config/db.connection.js'
import ToDo from './models/Todo.model.js'

//Define a porta na qual a API/Server escutará
const PORT = 3001

//Conecta-se ao banco de dados
connectDB()

//Cria a instância do express
const app = express()

//Habilita o middleware que nos permite trabalhar com requests JSON
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Welcome to the ToDo API!')
})

//Cria uma nova ToDo
app.post('/todos', async (req, res) => {
    try {
        const newToDo = await ToDo.create(req.body)
        return res.status(201).json(newToDo)
    } catch (error) {
        console.log('Erro ao criar ToDo', error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

//Lista todas as ToDos
app.get('/todos', async (req, res) => {
    try {
        const todos = await ToDo.find({})
        return res.status(200).json(todos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

//Obtém detalhes de uma ToDo pelo ID
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const todo = await ToDo.findById(id)

        if(!todo) {
            return res.status(404).json({message: 'ToDo not found'})
        }

        return res.status(200).json(todo)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

//Atualiza uma ToDo
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

//Deleta uma ToDo
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

//Inicializa o meu servidor/api
app.listen(PORT, () => console.log('Server listening on port ', PORT))