import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const url = process.env.MONGODB_URL


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


Person.find({ "name": "1" }).then(result => {
    console.log(result)
    mongoose.connection.close()
})