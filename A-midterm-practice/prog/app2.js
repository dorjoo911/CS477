const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded());

//place code below
app.get('/', (req, res, next) => {
   fs.readFile(path.join(__dirname, 'signup.html'), 'utf-8', (err, data) => {
        if(err){
            throw new Error(err.message);
        } else {
            data = data.replace('{error}', '');
            res.send(data);
        }
   });
    
});

app.post('/signup', (req, res, next) => {
    if(req.body.firstname && req.body.lastname) {
        //save to file

        fs.appendFile(path.join(__dirname, 'database.txt'), `,${req.body.firstname}=${req.body.lastname}`, (err) => {
            if(err){
                throw new Error('saved failed');
            } else {
                res.send('saved successfully');
            }
        })

    } else {
       let data = fs.readFileSync(path.join(__dirname, 'signup.html'), 'utf-8');
        data = data.replace('{error}', 'Firstname and lastname are required');
        res.send(data);
    }
});

app.use((req, res, next) => {
    res.status(404).send("URL doesn't exists, try again");
});

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
})

app.listen(3000);