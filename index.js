import express from 'express'
import connection from './connection.js'
import List from './models/List.js'


//this is sayign i want to store the instance of express and then put it inside of app
const app = express()
//need to add this line below for the post to work, u r taking the funcitonlaity from json and when it sees json it recognizes it as json
app.use(express.json())
//you want it to listen(listening and waiting for a request{hey, server!}) on app 3000 and then the console log to lyk it did
app.listen(3000, () => console.log('listening on 3000'))



//hey express server instance, when u get a get requiest , i want you to send back a response that says "my dope list api"
app.get('/', async (req, res) => {
    res.send('my dope list api')
})

//we added list after the first / bc we're just saiying where we want this info, it can just be the / by itself if we change it to jus tthe / by itself
app.get('/list', async (req, res) => {
    res.json(await List.find({}))
})
//below looks for everything that name is chris
// app.get('/list', async (req, res) => {
//     res.json(await List.find({name: Chris}))
// })


//below is how to type the number in the url so u can search somethign by the id
app.get('/list/:id', (req, res) => {
    List.findById(req.params.id).then(list => {
      res.json(list)
    })
  })
  
  //below is how to look for sum by just the name in the local host (http://localhost:3000/list/name/Chris)
  app.get('/list/name/:name', (req, res) => {
    List.find({name: req.params.name}).then(lists => {
      res.json(lists)
  })
})


//you need to download postman for this to work
app.post('/list', (req, res) => {
    List.create(req.body).then(list => {
      res.json(list)
    })
  })
  

//in the package.json i created a "dev": "nodemon index.js" bc the nodemon index.js in the terminal did not want to work

//getiing node demon working
//nodemon index.js

//we installed post man.com
//  install postman homebrew on line

//when server get request itll activate this call back func
//find by id and update that specific item that is called by the id number in the url
//localhost:3000/list/639b7ec82c0ef83d67be7603/item
app.post('/list/:id/item', (req, res) => {
    List.findByIdAndUpdate(
      req.params.id,
      { $push: { items: req.body } },
      { new: true }
    ).then(list => {
      res.json(list)
    })
  })
  // type the new things in the postman
  //ex 1 that was written in the postman, after typing the localhost:3000 in the url part, change the left button to post, then type in the top box nd click send to see the result in the second box
  //{
//     "name": "third todo",
//     "items":[
//         {
//             "title": "send this request",
//             "status": "complete",
//             "deadline": "THE PAST"
//         }
//     ]
// }

// //ex 2
//   {
//     "title": "some new task for my todo list",
//     "status": "never done, never finished",
//     "deadline": "eternity"
// }


//make new route, app.put() so we can make a update, post is to make a new thing and put will just modify the thing that is already there and just edit it
app.put('/list/:id', (req, res)=>{
    List.findOneAndUpdate(
        //what are my restricions? first search for particular doc
        {_id: req.params.id },
        //second argument, the stuff i want to modify 
        req.body,
        {new: true}
        //now we need a .then to send out a respose
    ).then(list => res.json(list))
})

//now go to postman localhost:3000/list/639b7ea87151c23d79728057

//going to delete now, going to delete 639b7ec82c0ef83d67be7603, third todo

app.delete('/list/:id', (req,res)=>{
    List.findOneAndRemove({
        _id: req.params.id
    }).then(list => res.json(list))
})

// create new tab and change left button to delete and type localhost:3000/list/639b7ec82c0ef83d67be7603 and then send thru and it will happen