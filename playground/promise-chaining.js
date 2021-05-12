require('../src/db/mongoose');
const User = require('../src/models/user');

// 60877046f023432e74e33e2a

// User.findByIdAndUpdate('60877a1ef49538369898c117',{age:1}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age:1})
// }).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });

const updateAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return count
}

updateAndCount('60877a1ef49538369898c117',3).then((result) => console.log('count=',result))
