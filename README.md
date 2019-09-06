# Blogger

![](https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)
## Goals:
The goal of this project is to build a blog engine for Blogger, the Blog company! We want to be able to get all blogs or get a specific blog by its id, additionally if a user logs in they can create a blog, edit a blog if they are its author or delete that blog based on its id (again only if they are the author). After a blog has been created users can also see all the comments on the blog, and if logged in perform the same actions that they would for their own blogs (create, edit, delete) for comments. Students will use node, express, mongoose, bcrypt, cors, controllers and services to create a server that persists data to a database. 

## The Setup

This project consists solely of the back-end(server) side of the application. The front end will be handled for you. However, you must write your routes to accommodate this functionality on the front-end. The `bcw-create` then `Node-Server-Auth` should get all your authentication routes created for you as well as providing you the authentication middleware. From there the rest of the supporting routes are up to you.

### Step 1
In this project you will be completely responsible for creating and implementing the routes, schema, and database communications. Effectively use the controller and services pattern to pass data or requests to the service. You will want to create a schema that supports the following format

A blog will have:

```javascript
{
  title: "The Era of E-Sports" //max length should be 60 characters
  summary: "A short description." // no more than 120 characters
  author: { // How could this data get.... populated 
    _id: "12lkj3lkj24ljhlkj23lj231klf",
    name: "Jim Bob" 
  },
  img: "https://placehold.it"
  body: "A bunch of stuff about E-Sports", 
}

// timestamps: true
```

A comment will have: 

```javascript
{
  blogId: "12fdsalkadsf12932dk",
  body: "The Era of E-Sports",
  author: { // How could this data get.... populated 
    _id: "12lkj3lkj24ljhlkj23lj231klf",
    name: "Jim Bob" 
  }
}
// timestamps: true
```



### Step 2
Your server will need to support the follwing functionality, be sure to create the following routes that can interact with the database:

    Retrieve all blogs
    Retrieve a blog by id
    Create a blog*
    Edit a blog*
    Delete a blog*
    Retrieve Blog Comments
    Create a comment*
    Edit a comment*
    Delete a comment*
    
> *This will require a user to be logged in

### Step 3 
Never trust the client! Insure that you are getting the user information off of the session and not through the request body, this helps insure that things are not created under the wrong user, or deleted by someone who should not have access.

## Requirements:


#### Functionality
- [ ] Users Can Register, Login, and Logout (this should work out of the box, don't break it)
- [ ] Blogs can be retrieved by All or by Id
- [ ] Once logged in Users can Create Edit and Delete blogs
- [ ] Users can retrieve all the comments for a blog
- [ ] Once logged in Users can Create Edit and Delete comments
- [ ] Users can only modify/delete data they created
- [ ] All data returns with its creators name

### Have fun!
There are a lot of extended challenges and features that can be added to your blog engine. The Blog Company expects this feature set, but they encourage creativity! Some challenges could be allowing adding tags to a blog to increase searchablity. Upvoting or downvoting a blog. Retrieving most popular blog by the number of upvotes. You can use both our front end testing tool, and postman to test your server.
