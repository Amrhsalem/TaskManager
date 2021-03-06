const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type: Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('age must be a positive number')
            }
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:6,
        validate(value){
            if(value.includes('password')){
                throw new Error('password must not contain password')
            }
        }

    },
    tokens:[{
        token:{
            type:String,
            required:true}
    }]
})


userSchema.methods.generateAuthToken=async function (){
    const user=this
    const token= jwt.sign ({_id:user._id.toString()},'thisismynewcourse')
    
    user.tokens= user.tokens.concat({token})
    await user.save()
    
    return token
}
//Declare user model and set properties and defaults

userSchema.statics.findByCredentials= async (email,password)=>{
    const user = await User.findOne({email})
    if (!user){
        throw new Error ('unable to find user')
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('unable to find user p')
    }
    return user
}


//hash password
userSchema.pre('save',async function(next){
    const user=this
    console.log('just before saving');
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
    }
    next()
})

const User=mongoose.model('user',userSchema)


module.exports=User
