const { default: mongoose } = require("mongoose");

const expensesSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true
    },
    price: Number
  },
  {timestamps: true}
)


module.exports = mongoose.model('expenses', expensesSchema)