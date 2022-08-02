const express = require('express'); 
const ejs = require('ejs');
const path = require('path'); 
routes = require('./routes')
var dirname = path.resolve();
const app = express();
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const MongoDBURI = 'mongodb://localhost:27017/hiranmoycc'; 
mongoose.connect(MongoDBURI, {
useUnifiedTopology: true, 
useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', () => {
});
app.use(session({ 
secret: 'work hard', 
resave: true,
saveUninitialized: false, 
store: MongoStore.create({
mongoUrl: MongoDBURI,
})
}));
app.set('views', path.join( dirname, 'views')); 
app.set('view engine', 'ejs');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static( dirname + '/views'));

const index = require('./routes/index'); 
app.use('/', index);

// catch 404 and forward to error handler 
app.use((req, res, next) => {
const err = new Error('File Not Found'); 
err.status = 404;
next(err);
});

// error handler
// define as the last app.use callback 
app.use((err, req, res, next) => {
res.status(err.status || 500); 
res.send(err.message);
});
// listen on port 3000 
app.listen(process.env.PORT || 3000, () => {
console.log('Express app listening on port 3000');
});