import mongoose from 'mongoose'

const todoSchema = mongoose.Schema({
    id: Number,
    completed: Boolean,
    text: String,
})

export default mongoose.model('todo', todoSchema)