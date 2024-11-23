const express = require('express')


const cors = require('cors')

const apiRouter = require('./api/main')

const app = express()

const PORT = 3000


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
app.use(cors())


app.get('/', (req,res)=>{
  res.render('pages/welcome.ejs')
})

app.use('/', apiRouter)

app.listen(PORT, ()=>{
  console.log('app runs on http://localhost:3000')
})