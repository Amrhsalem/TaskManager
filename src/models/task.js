const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const taskSchema= new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        required:false,
        default:false
    }
})

// taskSchema.pre('save',async function(next){
//     const task=this
//     if(user.isModified('password')){
//         user.password=await bcrypt.hash(user.password,8)
//     }
//     next()
// })

const Task=mongoose.model('task',taskSchema);
module.exports = Task;