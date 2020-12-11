import mongoose from 'mongoose'

const password = process.env.MONGO_PASSWORD

const url = `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/phonebook-app?retryWrites=true`

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

const Phonebook = mongoose.model('Phonebook', noteSchema)

const phonebook = new Phonebook({
  name: 'HTML',
  number: '00000000000'
})

phonebook.save().then(result => {
  console.log('phonebook saved!')
  mongoose.connection.close()
})


Phonebook.find({}).then(result => {
  result.forEach(p => {
    console.log(p)
  })
  mongoose.connection.close()
})