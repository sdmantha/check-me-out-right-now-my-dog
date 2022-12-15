import mongoose from 'mongoose'

const listSchema = new mongoose.Schema({
    name: String,
    items: [{
        title: String,
        status: String,
        deadline: String
    }]
})

export default mongoose.model('List', listSchema)
