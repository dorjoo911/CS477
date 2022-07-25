const express = require('express');

const router = express.Router();

router.get('/add', (req, res) => {
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
            <h1>Add a Product</h1>
            <form action="product" method="post">
                Title: <input name="title" /> <br/>
                Price: <input type="number" min="1" name="price" />
                <button>Add a Product</button>
            </form>
            
        </body>
        </html>
    `);
});

router.post('/add', (req, res) => {
    console.log(req.body);
    res.send('save PRODUCT successfully!!');
});


module.exports = router;