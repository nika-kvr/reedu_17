const { getAllExpenses, getExpenseById, postExpense, deleteById, editById } = require('./utils')

const getAllExpensesSrvc = async(req,res)=>{

  const data =  await getAllExpenses()
  res.render('pages/home.ejs', {data})
}

const getExpenseByIdSrvc = async(req,res)=>{
  const {id} = req.params
  const data =  await getExpenseById(id)
  if(!data){
    return res.render('pages/about.ejs', {data})
  }

  res.render('pages/about.ejs', {data})
}

const addExpenseSrvc = (req,res)=>{
  res.render('pages/add.ejs')
}

const editExpenseSrvc = async(req,res)=>{
  const {id} = req.params
  const data =  await getExpenseById(id)
  res.render('pages/edit.ejs', {data})
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
  editByIdSrvc,
  addExpenseSrvc,
  editExpenseSrvc
}