const {Router} = require('express')

const randomRouter = Router()

const reqAccess = (req,res,next)=>{
  if(Math.random() > 0.5){
    return res.status(400).json({message: "request can't be done"})
  }
  next()
}

randomRouter.get('/random',reqAccess, (req,res)=>{
  res.json({message:"welcome to random page"})
})

module.exports = randomRouter