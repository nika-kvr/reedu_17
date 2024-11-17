const {Router} = require('express')
const { getAllExpensesSrvc, getExpenseByIdSrvc, postExpenseSrvc, deleteByIdSrvc, editByIdSrvc } = require('./expenses.service')
const { isAdmin, checkParams } = require('./middlewares')

const expensesRouter = Router()

expensesRouter.get('/', getAllExpensesSrvc)
expensesRouter.get('/:id', getExpenseByIdSrvc)
expensesRouter.post('/', checkParams, postExpenseSrvc)
expensesRouter.delete('/:id', isAdmin,  deleteByIdSrvc)
expensesRouter.put('/:id', editByIdSrvc)

module.exports = expensesRouter
