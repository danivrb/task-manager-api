const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },


    password: {
        type: String,
        required: true,
        trim: true,
        validate(pass) {
            if (pass.length < 7) {
                throw new Error('Your password should containt at least 7 characters')
            }
            else if(pass.toLowerCase().includes('password')){
                throw new Error('Your password must be different; choose another one')
            }
        }
    },

    email: {
            type: String,
            unique: true,
            require: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
    },

    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0){
                throw new Error('Age must be a positive number')
            }
            else if(value > 80) {
                throw new Error('Age must be less then 80')
            }
        }
    },
    
        avatar: {
            type: Buffer
        }
    ,

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})


userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})




userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()


    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}




userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token

}




userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
        throw new Error('Unable to login')
    } 
        return user
}


// Hash the plain text password before saving
userSchema.pre('save', ( async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
}))

//Delete user task when user is removed

userSchema.pre('deleteOne', {document : true,query : false},async function(next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
  });

const User = mongoose.model('User', userSchema)

module.exports = User