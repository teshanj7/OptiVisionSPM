const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const GlaucomaDoc = new Schema({
    userID : {
        type : String,
        require: true,
    },
    image: {
        type : String,
        require : false,
    }
})

const Glaucoma = mongoose.model("glaucoma",GlaucomaDoc);
module.exports = Glaucoma;