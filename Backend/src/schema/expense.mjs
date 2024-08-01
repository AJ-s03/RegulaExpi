import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({

    name: {
        type: mongoose.Schema.Types.String,
        required: true,
       
    },
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        
    },
    upi: {
        type: mongoose.Schema.Types.String,
        required: true,
        
    },
    user: {
        type: mongoose.Schema.Types.String,
        required: true,
        
    }
})

export const Expense = mongoose.model("Expense", ExpenseSchema); 