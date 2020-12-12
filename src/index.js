import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'

import { Person } from './model.js'
import { unknownEndpoint } from './middleware.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findById(id).then(person => {
    res.json(person)
  })
})


app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined) {
    return req.status(400).json({ error: 'name missing' })
  }
  if (body.number === undefined) {
    return req.status(400).json({ error: 'number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})


app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
