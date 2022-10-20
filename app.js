//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
var fs = require('fs');
const path = require('path');
const _ = require("lodash");
const ejs = require("ejs");

const Blog = require('./models/blog_model');
const ProjectModel = require('./models/projects_model');


//! Creating blog collection-->that has to satisfy the blogSchema
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



let posts = [];

let projects = [
    new ProjectModel('Chat Application Flutter', 'Flutter', "Provider Package, Firestore",
        "Mar-2020",
        `Created email chat application using Flutter framework where the
     user can authenticate itself. The authentication service of google's firebase is used.
    Also, UI created is user friendly with letting the user know the time of message in the group and
     do a group chat with friends. For state management in flutter application, provider package is 
    used which guarantees clean and efficent code.`,
        "/images/projects/chat_login_signup.jpeg"),
  
    new ProjectModel('Laundary Home- Android Application ',
        'Android Mobile Application',
        'Android',
        'Mar-2021',
        `Made a complete mobile application using native android which provides laundary services.Laundry App offers dry cleaning 
        and other laundry services to the customer. Got selected as 
        the best start up idea for college level SIH event.
        Android app communicate with each other with help of REST API. 
        Razorpay payment gateway was also integrated.
        `,
        "/images/projects/laundary_welcome_activity.jpeg"
    ),
    new ProjectModel('Climate Prediction - Flutter Apllication', 'Flutter', 'set-state state management', 'Mar-2021',
        `Made a climate prediction application using open-weather's api, used
     set state state management to maintain the state of the ui 
    in flutter, also used dio package to make http request 
    to open-weather's api.`,
        "/images/projects/weather_MAIN.jpeg"
    ),
    new ProjectModel(
        'Transportation Solution',
        'Blockchain - Truffle, React, IoT(Raspberry Pi Zero Wireless and SKG13BL modules)',
        'Bloc state management',
        'Mar-2021',
        `A React Webapp in which transactions of the business is stored in a smart contract using Truffle. Motivation behind this was from personal experience: one of
         my uncle being owner of the transportation business struggled keeping his transactions 
         in the register(notebook), where it was vulnerable to fraud by altering it. Moreover
         , the second feature of the project was to find the
          track the location of the vehicles for which we interfaced an
           SKG13BL GPS Module with a Raspberry Pi Zero Wireless.
            After making the proper connection and installing GPSD on
            Raspberry Pi, we were able to track the latitude and longitude of the vehicle.`,
        "/images/projects/transportation_solution_trips_portal_image.png"
    ),
    new ProjectModel('Cat or Not?', 'Machine Learning',
    'Logistic Regression, Image Processing', 'Mar-2021',
    `Made a classification model to identify 
    whether image is a cat or not.
     Able to achieve 75% accrucay.`,
    "/images/projects/cat.jpg"
),
    new ProjectModel('Movie Reviews- Sentiment Analysis ',
        'NLP',
        'Sentiment Intensity Analyzer',
        'Mar-2021',
        `Used sentiment analyzer from nltk's sentiment.vader package to 
        analyze the  sentiments  of moview reviews. 
        Able to achieve 70% of accuracy.`,
        "/images/projects/movie_review_nlp.jpg"
    ),
    new ProjectModel('Quora Questions- Topic Modelling ',
        'NLP',
        'NMF Topic Modelling Algorithm',
        'Mar-2021',
        `Used NMF topic modelling algorithm and 
        segregated quora questions into 20 different topics.`,
        "/images/projects/quora_image.jpg"
    ),
];


// ? https://stackoverflow.com/questions/43261318/node-js-express-how-do-i-render-a-file-that-is-inside-views-subfolder/43262234
app.set(
    'views',
    [
        path.join(__dirname, 'views'),
        path.join(__dirname, 'partials/'),
        path.join(__dirname, 'views/home/'),
        path.join(__dirname, 'views/projects/'),
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


app.route('/projects')
    .get(function (req, res) {
        res.render("projects_main", {
            projects: projects
        });
    });






app.route('/blog_compose')
    .get(function (req, res) {
        res.render("blog_compose_main");
    })
    .post(function (req, res) {
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

        blogAndroid.save(function (err, results) {
            if (err) {
                console.log(`this is the err--> ${results} `);
            } else {
                console.log(results._id);
            }

        });

        res.redirect("/blogs");
    });

let port = process.env.PORT;

if (port == null || port == "") {
    port = 4000;
}


app.listen(port, function () {
    console.log("server has started");
    return;
});

