const {Router} = require('express')
const expensesRouter = require('./expenses/expenses')

const apiRouter = Router()


apiRouter.use('/expenses', expensesRouter)

module.exports = apiRouter