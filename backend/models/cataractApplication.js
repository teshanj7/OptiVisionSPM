const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CataractDoc = new Schema({
    userID : {
        type : String,
        require: true,
    },
    Fullname : {
        type : String,
        require : true,
    },
    Email : {
        type : String,
        require : true,
    },
    Address : {
        type : String,
        require : true,
    },
    TelephoneNumber : {
        type : Number,
        require : true,
    },
    Age : {
        type : String,
        require : true
    },
    Gender : {
        type : String,
        require : true
    },
    comments: [{
        comment : {
            type: String,
            require: true
        },
        postedBy: {
            type: String,
            require: true
        }
    }],
    image: {
        type : String,
        require : false,
    }
})

const Cataract = mongoose.model("cataract",CataractDoc);
module.exports = Cataract;