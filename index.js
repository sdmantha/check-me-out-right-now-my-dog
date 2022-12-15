import express from 'express'
import connection from './connection.js'
import List from './models/List.js'

const app = express()

app.listen(3000, () => console.log('listening on 3000'))

app.get('/', async (req, res) => {
    res.json(await List.find({}))
})
