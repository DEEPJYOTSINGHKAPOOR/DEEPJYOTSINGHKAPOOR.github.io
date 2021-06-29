const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose instanceof mongoose.Mongoose; // true

// Create a new Mongoose instance with its own `connect()`, `set()`, `model()`, etc.
// const m = new mongoose.Mongoose();



// ! Create db named blog ---collection Name: blogDB
mongoose.connect('mongodb+srv://deepjyot-admin:Navneet@123@cluster0.stpwy.mongodb.net/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });



const blogSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true,
        required: [true,'Title cannot be blank'] 
    }, // String is shorthand for {type: String}
    author: String,
    body: {
        type: String,
        default: '',
        trim: true
    },
    // thumbnailImage: {data: Buffer , contentType: String}, 
    comments: [{ body: String, date: { type: Date, default: Date.now } }],
    blogPublishDate: { type: Date, default: Date.now },
    hidden: Boolean,
    tags: [{ tag: String }],
    meta: {
        votes: Number,
        favs: Number
    }
});



module.exports = new mongoose.model("Blog",blogSchema);
