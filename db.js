const mongoose = require('mongoose')

const CONNECTION_URI = 'mongodb://localhost:27017/bookify'

(() => {
    mongoose.connect(CONNECTION_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((result) => {
        if(result) {
            console.log("Mongodb connection successfull");
        }
    }).catch((error) => {
        console.log(error)
    })
})();