import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const url = process.env.MONGODB_URL

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(result => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})


const noteSchema = new mongoose.Schema({
  name: String,
  number: String
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', noteSchema)

export { Person } 
