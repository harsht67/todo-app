import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'

import Todo from './dbTodo.js'

const app = express()
const PORT = process.env.PORT || 5000
const CONN_URL = "mongodb+srv://admin:admin67@cluster0.bpcw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//db
mongoose.connect(CONN_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// mw
app.use(express.json())
app.use(Cors())

// API end points
app.get('/', (req, res) => {
    res.json('todo server')
})

// fetch all todos
app.get('/todos', (req, res) => {
    Todo.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

// add a new todo
app.post('/todo', (req, res) => {
    let todo = req.body 
    Todo.create(todo, (err, data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
})

// toggle completed status of a todo based on id
app.put('/todo', (req, res) => {
    const {_id, completed} = req.body
    Todo.updateOne({_id}, {completed: !completed}, (err, data) => {
        if(err) {
            res.status(500).send(err) 
        }
        else {
            let response = data.acknowledged ? _id : null
            res.status(200).send(response) 
        }
    })
})

// delete todo based in id
app.delete('/todo/:id', (req, res) => {
    let id = req.params.id
    Todo.deleteOne({_id: id}, (err, data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            let response = data.acknowledged ? id : null
            res.status(200).send(response)
        }
    })
})

// delete all completed todos
app.delete('/todos', (req, res) => {
    Todo.deleteMany({completed: true}, (err, data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data.acknowledged)
        }
    })
})

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
})