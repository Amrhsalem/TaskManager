const mongoose = require('../src/db/mongoose.js');
const { count } = require('../src/models/task.js');
const Task = require('../src/models/task.js');

Task.findByIdAndDelete('60875cf16201a343500854b6').then((result) => {
    console.log(result)
    return Task.countDocuments({completed:false})
}).then((result) => {
    
    console.log(result)
}).catch((err) => {
    console.log(err);
});

const deleteTaskAndCount=async (id) => {
    const task= await Task.findByIdAndDelete(id)
    const count= await Task.countDocuments({completed:false})
    return count;       
}

deleteTaskAndCount('6088b321d08fb93b4c51cb89').then((count) => {
    console.log(count); 
}).catch((err) => {
    console.log(err);
});