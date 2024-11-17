const { getAllExpenses, getExpenseById, postExpense, deleteById, editById } = require('./utils')

const getAllExpensesSrvc = async(req,res)=>{
  let {page=1, take=5} = req.query
  page = Number(page)
  take = Number(take)
  
  if(take > 10 || take < 1) take = 5

  const data =  await getAllExpenses(page,take)
  res.status(200).json(data)
}

const getExpenseByIdSrvc = async(req,res)=>{
  const {id} = req.params
  const data =  await getExpenseById(id)
  if(!data){
    return res.status(404).json({message: 'expense not found'})
  }

  res.json({data: data})
}

const postExpenseSrvc = async(req,res)=>{
  const {category, price} = req.body
  if(!category || !price){
    return res.status(400).json({message: 'category and price is required'})
  }
  await postExpense(category, price)
  res.status(201).json({message: 'expense posted'})
}

const deleteByIdSrvc = async(req,res)=>{
  const {id} = req.params

  const deleteExpense = await deleteById(id)
  if(!deleteExpense){
    return res.status(400).json({message: 'expanse not found'})
  }
  res.json({message: 'expanse deleted'})

}

const editByIdSrvc = async(req,res)=>{
  const {id} = req.params
  const {category, price} = req.body

  const editedExpanse = await editById(id, category, price)

  if(!editedExpanse){
    return res.status(404).json({message: 'expanse not found'})
  }

  res.json({message: 'expanse updated'})

}

module.exports = {
  getAllExpensesSrvc,
  getExpenseByIdSrvc,
  postExpenseSrvc,
  deleteByIdSrvc,
  editByIdSrvc
}