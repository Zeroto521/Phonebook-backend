import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const password = process.env.MONGODB_PASSWORD

const url = `mongodb+srv://fullstack:${password}@cluster0.qexng.mongodb.net/phonebook-app?retryWrites=true&w=majority`


mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const noteSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', noteSchema)

const person = new Person({
  name: 'HTML',
  number: '00000000000'
})

// person.save().then(result => {
//   console.log('phonebook saved!')
//   mongoose.connection.close()
// })


Person.find({}).then(result => {
  result.forEach(p => {
    console.log(p)
  })
  mongoose.connection.close()
})
