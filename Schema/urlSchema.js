const mongoose = require(`mongoose`);
const urlSchema = mongoose.Schema({
    useremail: { type: String, required: true, },
    redirectURL: { type: String, required: true, },
    shortId: { type: String, required: true,  unique: true},
    visited:[{
        timestamp:{type:Number},
    }]

},{timestamps:true})
const urlModel = mongoose.model("Url",urlSchema);
module.exports = urlModel;