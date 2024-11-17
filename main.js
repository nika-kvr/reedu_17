const express = require('express')


const cors = require('cors')

const apiRouter = require('./api/main')
const randomRouter = require('./api/random/random')

const app = express()

const PORT = 3000

app.use(express.json())
app.use(cors())

app.get('/', (req,res)=>{
  res.send('welcome to my application')
})

app.use('/api', apiRouter)
app.use('/', randomRouter)

app.listen(PORT, ()=>{
  console.log('app runs on http://localhost:3000')
})