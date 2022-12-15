import mongoose from 'mongoose'
import connection from '../connection.js'
import List from '../models/List.js'


try {
    await List.deleteMany({})
    await List.create(
        [
            {
                name: "Chris",
                items: [
                    {
                        title: 'buy bread',
                        status: 'incomplete',
                        deadline: 'tomorrow'
                    },
                    {
                        title: 'teach express CRUD',
                        status: 'in progress',
                        deadline: '5pm'
                    }
                ]
            },
            {
                name: "you",
                items: [
                    {
                        title: 'learn to code',
                        status: 'in progress',
                        deadline: 'aaaaaaaaah'
                    }
                ]
            }
        ] 
    )
    console.log('done!')
    mongoose.disconnect()
} catch (error) {
    console.error('Error!', error)
}
