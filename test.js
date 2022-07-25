/*
User makes a request to http://localhost:8080/, the browser displays a page with a signup form which has two inputs: firstname and lastname, and 1 submit button.
When user clicks submit button in the browser, browser makes a POST request to http://localhost:8080/signup URL. On the server side, the web application gets user’s 
the inputs(firstname and lastname), then stored in the database.txt file, should append not replace.
If firstname or lastname is empty, goes back to signup form with error message: "Firstname and lastname are required".
If stored successfully, display “saved successfully” message in the browser.
If stored failed, throw error with message “saved failed”.
For all other URLs accessed to this website, show "URL doesn't exists, try again".
If there's error happens on the server side, display error message in the browser.

When you store user's info, The format of database.txt file looks like below:

john=smith,Bella=Lord,Edward=Hopkin */
const express = require("express");

const path = require("path");

const app = express();
