
/*
#NODEJS
How to write a production-ready Node and Express app
Shailesh Shekhawat
Shailesh Shekhawat
How  to write a production-ready Node and Express app
Project Structuring
When I started building Node & Express applications, I didn’t know how important it was to structure your application. Express doesn’t come with strict rules or guidelines for maintaining the project structure.

You are free to use any structure you want. When your codebase grows you end up having long route handlers. This makes your code hard to understand and it contains potential bugs.

If you’re working for a startup, most of the time you won’t have time to refractor your project or modularize it. You can end up with an endless loop of bug fixing and patching.


Over time, while working with both small teams and large teams, I realized what kind of structure can grow with your project and still be easy to maintain.

Model View Controller
The MVC pattern helps in rapid and parallel development. For example, one developer can work on the view, while another one can work on creating the business logic in the controller.

Let’s take a look at an example of a simple user CRUD application.


project/
  controllers/ ------------>Define your app route handlers and business logic
    users.js
  util/     ---->Writes utility/helper functions here which can be used by any controllers. For example, you can write a function like mergeTwoArrays(arr1, arr2)
    plugin.js
  middlewares/ ----->You can write middlewares to interpret all incoming requests before moving to the route handler. For example,  router.post('/login', auth, controller.login) where auth is a middleware function defined in middlewares/auth.js.
    auth.js
  models/ ------->also a kind of middleware between your controller and the database. You can define a schema and do some validation before writing to the database. For example, you can use an ORM like Mongoose which comes with great features and methods to use in the schema itself
    user.js
  routes/ ---------->Define your app routes, with HTTP methods. For example, you can define everything related to the user.
    user.js
    router.js
  public/
    js/
    css/
    img/
  views/
    users/
      index.jade
  tests/
    users/
      create-user-test.js 
      update-user-test.js
      get-user-test.js
  .gitignore
  app.js
  package.json

*/
//TODO   https://www.freecodecamp.org/news/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c/


//TODO EMbed git hub gist: https://betterstack.dev/blog/how-to-embed-a-github-gist-in-your-website/#:~:text=Embedding%20a%20gist%20into%20your,your%20gist%20after%20creating%20it.







///heroku:

// deploying from branch beside main: 
// git push heroku testbranch:main
