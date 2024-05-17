const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})


const me = new User({
    name: 'Dani',
    age: 25
})

me.save().then((me) => {
    console.log(me)

}).catch((error) => {
    console.log('Error!', error)
})