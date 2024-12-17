const expensesModel = require('../models/expenses')
const { isValidObjectId } = require('mongoose')

const getAllExpensesSrvc = async(req,res)=>{
  let page = Number(req.query.page) || 1
  let take = Number(req.query.take) || 5

  if(take > 5) take = 5

  const productQnty = await expensesModel.countDocuments()
  const pageQnty = Math.ceil(productQnty / take)

  const data =  await expensesModel.find().skip((page-1)* take).limit(take)

  res.render('pages/home.ejs', {data, pageQnty, page})

}

const getExpenseByIdSrvc = async(req,res)=>{
  const {id} = req.params
  if(!isValidObjectId(id)){
    res.status(400).json({message: 'wrong mongo db id'})
    return
  }
  const data =  await expensesModel.findById(id)
  if(!data){
    res.render('pages/about.ejs', {data})
    return 
  }
  res.render('pages/about.ejs', {data})
}

const addExpenseSrvc = (req,res)=>{
  res.render('pages/add.ejs')
}

const editExpenseSrvc = async(req,res)=>{
  const {id} = req.params

  if(!isValidObjectId(id)){
    res.status(400).json({message: 'wrong mongo db id'})
    return
  }

  const data = await expensesModel.findById(id)
  res.render('pages/edit.ejs', {data})
}

const postExpenseSrvc = async(req,res)=>{
  const {category, price} = req.body

  if(!category || !price){
    return res.status(400).json({message: 'category and price is required'})
  }
  const expense = await expensesModel.create({category, price})
  res.status(201).json({message: 'expense posted', data: expense})
}

const deleteByIdSrvc = async(req,res)=>{
  const {id} = req.params

  if(!isValidObjectId(id)){
    res.status(400).json({message: 'wrong mongo db id'})
    return
  }

  const deleteExpense = await expensesModel.findByIdAndDelete(id)
  if(!deleteExpense){
    return res.status(400).json({message: 'expanse not found'})
  }
  res.json({message: 'expanse deleted'})

}

const editByIdSrvc = async(req,res)=>{
  const {id} = req.params

  if(!isValidObjectId(id)){
    res.status(400).json({message: 'wrong mongo db id'})
    return
  }

  const editedExpanse = await expensesModel.findByIdAndUpdate(id, req.body, {new: true})

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
