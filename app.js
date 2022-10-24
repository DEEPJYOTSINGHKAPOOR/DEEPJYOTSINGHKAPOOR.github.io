//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
var fs = require('fs');
const path = require('path');
const _ = require("lodash");
const ejs = require("ejs");

const Blog = require('./models/blog_model');
const ProjectModel = require('./models/projects_model');
const ExperienceModel = require('./models/experience_model');


//! Creating blog collection-->that has to satisfy the blogSchema
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



let experiences  = [
    new ExperienceModel('Jr. Full Stack Engineer','Cognizant','https://www.cognizant.com/in/en/', 'Sep21 - Present','Pune, IN',
    [`Developed .Net Core Web API using Test Driven Development (TDD) based on business
    requirements.`,
     `Worked with the Design architecture team and used Docusign connect
      to invoke our Aws Lambda webhook after the
       envelope was completed (e-Signature).` ,`Worked with UI/UX designer and created
        Reactive Form with regex pattern
    validations using Angular.`,
    `Enhanced the user experience by adding new 
    functionalities like auto-completion based on search result
     and inline recommendations using
    angular, which helped us gain agents(application users), making
     it easier for them
     to find what they were looking for.`
    ]),
    new ExperienceModel('Intern','Cognizant','https://www.cognizant.com/in/en/', 'Apr21 - Sep21','Pune, IN',
    [
    `Handson on with various technologies 
    in full stack engineering
     domain - .Net Core, SQL Server, Micrsoft Azure`,
    `Using 3-Tier Architecture, developed API to handle HTTP requests using .Net Core by following Test Driven 
    Development (TDD) development practice and later tested using Swagger UI.`,
    `Helped in improving the security and performance 
    of our API layer with JWT Bearer Token by reducing
     the overhead related to 
    maintaining sessions for each request route since users
     can be authenticated once their requests are
      passed through this authentication process on a single API endpoint.`
    ]),
    new ExperienceModel('Application Developer (Client Project)','Marwar Print','https://www.marwarprint.com/', 'Dec20 - Feb21','Pune, IN',
    [`Developed the entire frontend of the application named ‘Marwar Print’ using flutter SDK for the client
    that has over 100K+ downloads on Google’s Play Store.`,
    `Used Flutter BLOC for state management to handle interactions with UI and business logic`
    ,`Interacted with backend team to consume the api's in the application.`,
    `Used Cached Network image package to cache the network images offline and was able to increase the performance of retrival images by 70%`,
]),
    new ExperienceModel('Android Developer Intern','Geniobits Pvt Ltd','https://geniobits.com/', 'Dec19 - Feb20','Pune, IN',
    [`Assisted Senior Mobile application developers in development and troubleshooting.`,
    `Responsible for implementing Recycler view in fragment to display the images.`
    ,`Used Volley Library to send and receive API request and developed calendar using
    calendar view to display the attendance of the user.`]),
];
let projects = [
    new ProjectModel('Laundary Home- Android Application ',
        'Android Mobile Application',
        'Native Android, Django , SqlLite, Volley, Google Map API',
        'Mar-2021',`Made a complete end-to-end mobile application using native android 
        which provides laundry services to the users.
        The app helps users offer customers dry cleaning 
        and other laundry services. Presented the application at college 
        Smart India Hackathon(SIH) event, where it was awarded as the best startup idea.
        Developed complete authentication flow with mobile OTP verification.
        Used Android SQLite for local storage and Django to
        create the rest API's with Django's default SQLite.
        Integrated Google Maps API allows the user to select their location entered in the search.
        Used Android's VOLLEY library to make an HTTP request with the backend server.
        Segregated clothing items into 4 tabs - Top, Bottom, Household, Dress, and Tab Layout with View pager to display the items(with price) in their respective check.
        Used fragment Created a feature where users can apply different promotions based on the order price. Integrated Razorpay payment gateway allows the user to make payments through the application.`,
        "/images/projects/laundary_welcome_activity.jpeg"
    ),
    new ProjectModel(
        'Transportation Solution',
        'Blockchain - Truffle, React, IoT - Raspberry Pi Zero Wireless and SKG13BL module',
        'Truffle Blockchain & Raspberry Pi',
        'Mar-2021',
        `A React Truffle based Webapp in which transactions of the business is stored in a smart contract using Truffle.
         Motivation behind this was from personal experience: one of
         my uncle owned a transportation business and faced many difficulties because 
         the transactions he recorded in the book were often corrupted or altered by a degenerate
          employee and the theft of gas(petrol) from the trucks he owned. Moreover, the second feature of the project is
           to track the location of the vehicles for which we interfaced an
           SKG13BL GPS Module with a Raspberry Pi Zero Wireless.
            After making the proper connection and installing GPSD on
            Raspberry Pi, we were able to display the latitude and longitude of the vehicle.`,
        "/images/projects/transportation_solution_trips_portal_image.png"
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
new ProjectModel('Cat or Not?', 'Machine Learning',
'Neural Network, Image Processing, Logistic Regression', 'Mar-2021',
`Made a 5-L neural network classification model to identify 
whether image is a cat or not with using ReLU activation for first 4 
layers and Sigmoid activation for the last layer.
I achieved a 78% accuracy rate through this approach, significantly higher than the 71% accuracy I achieved through just logistic regression.`,
"/images/projects/cat.jpg"
),
    new ProjectModel('Chat Application Flutter', 'Flutter', "Provider Package, Firestore",
        "Mar-2020",
        `Created email chat application using Flutter framework where the
     user can authenticate itself. The authentication service of google's firebase is used.
    Also, UI created is user friendly with letting the user know the time of message in the group and
     do a group chat with friends. For state management in flutter application, provider package is 
    used which guarantees clean and efficent code.`,
        "/images/projects/chat_login_signup.jpeg"),
  
    
    new ProjectModel('Climate Prediction - Flutter Apllication', 'Flutter', 'set-state state management', 'Mar-2021',
        `Made a climate prediction application using open-weather API, where the user can enter the city name and  obtain the temperature information and what type of clothes are suitable for that weather, used
        set-state to manage the state of the UI 
       in a flutter, also used the Dio package to make an HTTP request 
       to Open-Weather's API.`,
        "/images/projects/weather_MAIN.jpeg"
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
    console.log('exper is: '+experiences);
    res.render("home_main",{
        experiences: experiences
    });
});


app.get("/blogs", function (req, res) {
    res.render("blog_list_main", {
        posts: posts
    });
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
    port = 3000;
}


app.listen(port, function () {
    console.log("server has started");
    return;
});

