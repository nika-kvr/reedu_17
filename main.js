const express = require('express')
const app = express()

const connectDb = require('./db/db')

connectDb()

const cors = require('cors')

const expensesRouter = require('./expenses/expenses')
const userRouter = require('./users/user.route')

const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
app.use(cors())


app.get('/', (req,res)=>{
  res.render('pages/welcome.ejs')
})

app.use('/expenses', expensesRouter)
app.use('/users', userRouter)

app.listen(PORT, ()=>{
  console.log('app runs on http://localhost:3000')
})