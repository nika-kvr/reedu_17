const {Router} = require('express')
const { 
  getAllExpensesSrvc,
  getExpenseByIdSrvc,
  postExpenseSrvc, 
  deleteByIdSrvc, 
  editByIdSrvc,
  addExpenseSrvc,
  editExpenseSrvc
} = require('./expenses.service')

const expensesRouter = Router()

expensesRouter.get('/', getAllExpensesSrvc)
expensesRouter.get('/add', addExpenseSrvc)
expensesRouter.get('/:id', getExpenseByIdSrvc)
expensesRouter.get('/edit/:id', editExpenseSrvc)

expensesRouter.post('/', postExpenseSrvc)
expensesRouter.delete('/:id', deleteByIdSrvc)
expensesRouter.put('/:id', editByIdSrvc)

module.exports = expensesRouter
