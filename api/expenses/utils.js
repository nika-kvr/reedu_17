const fs = require('fs/promises')

const getAllExpenses = async(page, take) => {

  let response = await fs.readFile('expenses.json', 'utf-8')
  if(!response){
    await fs.writeFile('expenses.json', '[]')
    response = '[]'
  }
  if(page && take){
    const paginatedData = JSON.parse(response).slice((page - 1)* take, page * take)
    return paginatedData
  }

  const data = JSON.parse(response)
  return data
}

const getExpenseById = async(id)=>{
  const response = await fs.readFile('expenses.json')
  const data = JSON.parse(response)

  const expense = data.find(el => el.id === Number(id))

  if(!expense){
    return false
  }

  return expense

}

const postExpense = async(category, price) => {
  const data = await getAllExpenses()
  const lastId = data[data.length -1] ? data[data.length -1].id : 0
  const newExpense = {
    id: lastId + 1,
    category: category,
    price: price,
    date: new Date()
  }
  data.push(newExpense)
  await fs.writeFile('expenses.json', JSON.stringify(data))
}

const deleteById = async(id)=>{
  const data = await getAllExpenses()
  const index = data.findIndex(el => el.id === Number(id))

  if(index === -1){
    return false
  }

  const deletedExpense = data.splice(index, 1)
  await fs.writeFile('expenses.json', JSON.stringify(data))
  return deletedExpense

}

const editById = async(id, category, price)=>{
  const data = await getAllExpenses()
  const index = data.findIndex(el => el.id === Number(id))

  if(index === -1){
    return false
  }

  data[index] = {
    id: Number(id),
    category: category? category : data[index].category,
    price: price? price: data[index].price,
    date: data[index].date
  }

  await fs.writeFile('expenses.json', JSON.stringify(data))
  return true

}

module.exports = {
  getAllExpenses,
  postExpense,
  deleteById,
  editById,
  getExpenseById
}