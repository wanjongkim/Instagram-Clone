const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type:String,
        default: "https://res.cloudinary.com/igclone/image/upload/v1624243282/no-image-icon-23486_ckgfrh.gif"
    },
    followers: [{type: ObjectId, ref: "User"}],
    following: [{type: ObjectId, ref: "User"}],
});

mongoose.model("User", schema);