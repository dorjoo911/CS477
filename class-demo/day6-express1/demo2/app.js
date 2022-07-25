const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));

app.use('/add-product', (req, res, next)=> {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form action="save-product" method="post">
            <label for="title">Title:</label><br>
            <input type="text" id="title" name="title"><br>
            <label for="price">Price:</label><br>
            <input type="text" id="price" name="price"><br><br>
            <input type="submit" value="Submit">
          </form> 
    </body>
    </html>
    `);
});



app.use('/save-product', (req, res, next) => {
    res.send(JSON.stringify(req.body));
});




app.listen(3000);