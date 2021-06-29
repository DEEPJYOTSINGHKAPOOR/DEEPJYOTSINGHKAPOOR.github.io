//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
var fs = require('fs');
const path = require('path');
const _ = require("lodash");
const ejs = require("ejs");

const Blog = require('./models/blog_model');

//! Creating blog collection-->that has to satisfy the blogSchema

const blogAndroid = new Blog({
    title: "Android",
    author: "DJ",
    body: "this is the android blog ....",
    comments: [{
        body: 'this is comment sakcd',

    }],
    hidden: true,
    tags: [{
        tag: 'java'
    }, {
        tag: 'android'
    }],
    meta: {
        votes: 12,
        favs: 10
    }
});

const blogPython = new Blog({
    title: "Python",
    author: "DJ",
    body: "this is the python blog ....",
    comments: [{
        body: 'this is comment.',

    }],
    hidden: true,
    tags: [{
        tag: 'python'
    }, {
        tag: 'python3.0'
    }],
    meta: {
        votes: 12,
        favs: 10
    }
});




//! now save this blog document in collection-
// blog.save();



// Blog.insertMany([
//     blogAndroid,
//     blogPython,
// ]).then(function () {
//     console.log("Data inserted"); // Success

//     mongoose.connection.close();
// }).catch(function (error) {
//     console.log(error);      // Failure
// });






const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



let posts = [];



// const homeStartingContent = `Lorem ipsum dolor sit amet consectetur, 
// adipisicing elit. Excepturi, at? Molestiae, itaque 
// dicta beatae doloribus voluptatibus obcaecati velit ipsum assumenda fugit deleniti dignissimos ea quod ratione perspiciatis sit consequatur
//  voluptate?`;


// ? https://stackoverflow.com/questions/43261318/node-js-express-how-do-i-render-a-file-that-is-inside-views-subfolder/43262234
app.set(
    'views',
    [
        path.join(__dirname, 'views'),
        path.join(__dirname, 'partials/'),
        path.join(__dirname, 'views/home/'),
        path.join(__dirname, 'views/blogs/'),
        path.join(__dirname, 'views/blogs/blog_compose'),
        path.join(__dirname, 'views/blogs/blog_list_display'),
        path.join(__dirname, 'views/blogs/blog_content_display'),
    ]
);

app.get("/", function (req, res) {
    res.render("home_main");
});


app.get("/blogs", function (req, res) {
    res.render("blog_list_main", {
        posts: posts
    });
    // res.send("hello");
});


//!Get a particular blog
app.get('/blogs/:blog_title', function (req, res) {


    var found = false;
    posts.forEach(post => {
        if (_.lowerCase(post.blogTitle) === _.lowerCase(req.params.blog_title)) {
            found = true;

            console.log("rendered post is: " + JSON.stringify(post));
            res.render('blog_content_main', {
                post: post
            });

            return found;
        }
    });
    if (found !== true)
        res.send('File Not Found!!!!!!!');
});





app.get("/blog_compose", function (req, res) {
    res.render("blog_compose_main");
});

app.post("/blog_compose", function (req, res) {
    // const blogTitle = req.body.blogTitle;
    // const blogContent = req.body.blogContent;
    const post = {
        blogTitle: req.body.blogTitle,
        blogContent: req.body.blogContent,
        blogAuthorName: 'Deepjyot',
        blogReadTime: '2 min',
        blogPublishDate: '25-10-2020'
    };
    posts.push(post);

    //! Save the information in db. here.
    const blogAndroid = new Blog({
        title: req.body.blogTitle,
        author: req.body.blogAuthor ?? "Default AuthorName",
        body: "this is the android blog ...." ?? "No conent added by the author...",
        comments: [{
            body: 'this is comment sakcd',
    
        }],
        hidden: true,
        tags: [{
            tag: 'java'
        }, {
            tag: 'android'
        }],
        meta: {
            votes: 12,
            favs: 10
        }
    });

    blogAndroid.save(function(err,results){
        if(err){
            console.log(`this is the err--> ${results} `);    
        }else{
            console.log(results._id);
        }
        
    });

    res.redirect("/blogs");
});







app.listen(3000, function () {
    return;
});