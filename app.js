const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const {MONGODB_URI} = require('./config/keys')

require('./models/post');
require('./models/user')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production") {
    app.use(express.static('front-end/client/build'))
    const path = require('path')
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'front-end','client','build', 'index.html'))
    })
}


const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
})

const customMiddleware = (req, res, next) => {
    console.log("midleeware executed!");
    next();
};

app.use(customMiddleware);

app.get('/', (req,res) => {
    res.send('hello World');
});

app.listen(PORT, () => {
    console.log('Server is running on ' + PORT);
});

