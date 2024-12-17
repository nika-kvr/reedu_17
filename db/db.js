const { default: mongoose } = require("mongoose")
require('dotenv').config()

module.exports = async()=>{
  try{

    await mongoose.connect(process.env.MONGODB_URL )
    console.log('connected to database!')

  } catch(e){
    console.log(e,'cannot connected to database')
  }
}

