# Flymango

#### Flymango is a web application where users can share their good memories from their trips and search for the next destination.

---

<details open="open"><summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#reason">Purpose of the Project</a></li>
    <li><a href="#use-tech">Use tech</a></li>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#authentication">Authentication Process</a></li>
    <li><a href="#new">Lessons</a></li>
    <li><a href="#reference">Reference</a></li>
  </ol>
</details>

---

<div id="reason"/>

## Purpose of the project

- To build a Full Stack Web Application using MongoDB - Express - React - Node.
- Authentication & Login with JWT (Json Web Token)
- Creating Realtime Web App with CRUD function
- App with Redux Framework with React Hooks

<!--USE TECH-->

## Used tech

<span id="use-tech">
  <img src="https://img.shields.io/badge/Javascript-orange?style=flat-square&logo=JavaScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/css-blue?style=flat-square&logo=CSS3&logoColor=white"/>
  <img src="https://img.shields.io/badge/HTML-red?style=flat-square&logo=HTML5&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-blue?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/ReactRouter-32b7f0?&logoColor=white"/>
  <img src="https://img.shields.io/badge/ReactHooks-e1a9f5?&logoColor=white"/>
  <img src="https://img.shields.io/badge/mongoDB-yellow?style=flat-square&logo=firebase&logoColor=white"/>

</span>

### Dependency
After 'git-clone', you can simply run this application from your local server by installing each dependencies from Client and Server
Client : yarn add jwt-decode react-google-login / Server: yarn add bcrypt jsonwebtoken

##Server side##
. npm i body-parser : to POST request
. npm i cors : Cross Origin Resource Sharing : a middleware to Connect/ Express
. npm i express : a framework for creating the Routing of our application
. npm i mongoose : to create models of our POST
. npm i nodemon : auto reset the server
. npm i bcryptjs jsonwebtoken

##Client side##
. npm i @material-ui/core : ui kit used in this project
. npm i axios : for making api request
. npm i moment : library working with time and date
. npm i react-file-base
. npm i redux redux-thunk : asynchronous actions with redux
. npm i jwt-decode react-google-login

---

<!-- ABOUT THE PROJECT -->

## About The Project

[Demo link](https://flymango.netlify.app/)

### Landing Page

---

<div>
<img width="45%" alt="img" src="https://user-images.githubusercontent.com/49248131/116836328-efa72300-ab7a-11eb-95aa-8dcbe4cd5877.png">
<img width="46%" alt="img" src="https://user-images.githubusercontent.com/49248131/116836333-f46bd700-ab7a-11eb-9157-fd6579ade191.png">
</div>

<div>
<img width="45%" alt="img" src="https://user-images.githubusercontent.com/49248131/116952602-e5029180-ac3f-11eb-83a4-dcf1ae820e48.png">
<img width="46%" alt="img" src="https://user-images.githubusercontent.com/49248131/116836333-f46bd700-ab7a-11eb-9157-fd6579ade191.png">
</div>

### Structure

```
.
│  
└── Client
│    └── src
│    │    ├── actions
│    │    ├── api
│    │    ├── components
│    │    ├── constants
│    │    └── reducers
│    │
│    ├── App.js
│    └── index.js
│ 
└── Server
     ├── controller
     ├── middleware
     ├── models
     ├── routes
     └── index.js

```

---

### Features

<img width="450" style="margin:10; padding:0;" alt="shot" src="https://user-images.githubusercontent.com/49248131/116954678-788a9100-ac45-11eb-821e-24bd620ada35.png">

---
<div id="authentication"/>
**|Login Process|**

1. Client / Auth.js : The Login Information entered by users received from Auth.js file and here the action is dispatched so the data is sent to Reducers.

```javascript
   const handleSubmit =(e)=> {
      e.preventDefault();

      if (isSignup) {
        dispatch(signup(form, history))
      } else {
        dispatch(signin(form, history))     
      }
 }

 const handleChange=(e)=> {
   setForm({...form,[e.target.name]: e.target.value});
 }
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
   try {
     dispatch({type: 'AUTH', data:{result, token}});

     history.push('/');
   } catch (error) {
     console.log(error);
   }
  
  }

  const googleFailure =( error ) => {
   console.log("Google Sign In was unsuccessful. Try Again Later")
   console.log(error);
  }

```
---
2. Client / Reducer > Auth.js : Once the action is dispatched to a reduce, based on the action type, it will be sent to reduces. In this case the action type was Auth so the Auth.js in reduces folder will be executed and the {state & action} will be received into Reducer.

```javascript
const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

```
---
3. Server / controllers > user.js : This is where our server actually pass in the input data and save into our server. 

```Javascript
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "test";


export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};


export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
```


<div id="new"/>

## Lessons

- MongoDB for the database
- Node & Express for the server-side
- React for the client-side
