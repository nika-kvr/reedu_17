const isAdmin = (req,res,next)=>{
  if(Number(req.headers.admin) !== 1234){
    return res.status(400).json({message:"can't access to page"})
  }
  next()
}

const checkParams = (req,res,next)=>{
  const {category, price} = req.body
  if(!category || !price){
    return res.status(400).json({message: "category and price fields are required!"})
  }
  next()
}

module.exports = {
  isAdmin,
  checkParams
}