const express = require('express');
const cors = require('cors');

const productRouter = require('./routes/productRouter');
const {mongoConnect} = require('./utils/database3');

const app = express();

app.use(cors());
app.use(express.json()); //req.body = {}

app.use('/products', productRouter);
app.use((req, res, next) => {
    res.status(404).send({error: 'API NOT SUPPORTED'});
})
mongoConnect(() => {
    app.listen(3000);
});
