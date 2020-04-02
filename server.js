var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors= require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const initpassport = require('./config/passport');
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var postRoutes = require('./routes/post');
const MongoStore = require('connect-mongo')(session);
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server)
var Chat = require('./models/Chat');
mongoose.connect('mongodb://localhost:27017/cook-it');

app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200'],
  credentials:true

}));
app.use(cookieParser('secret'));

app.use(
  session({
  name:'myname.sid',
    secret: 'secret',
    cookie:{
      maxAge:36000000,
      httpOnly:false,
      secure:false
    },
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
  })
);
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser({limit: '50mb'}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});


  
var from_user_id;
var to_user_id;
var sent_messages;
var received_messages;
var from;
var result;
server.listen(4000);
io.on('connection',function(socket){
  socket.on('connected user id',function(data){
    //get user id of the user trying to initiate a conversation
    from = data.from_user_id;
    io.of('/'+from).on('connection',function(socket){
  
      socket.on('get messages',function(data){

     //get all the current and previous messsages for the user trying to start a conversation and the user with whom the current user is starting
      Chat.find({$and:[{from:data.from_user_id},{to:data.to_user_id}]} ,function(err,res){
        sent_messages = res;
       })
      Chat.find({$and:[{to:data.from_user_id},{from:data.to_user_id}]},function(err,res){
        received_messages = res
      socket.emit('all messages',{sent_messages:sent_messages,received_messages:received_messages})
    })
   })
   socket.on('send message',function(data){
    Chat.find({$and:[{to:data.to_user_id},{from:data.from_user_id}]},function(err,result){

      var c = result[0].update({$push:{messages:{msg:data.message,date:Date.now()}}},function(err,res){

       }).getUpdate()
      io.of('/'+data.from_user_id).emit('new messages',{sent_messages:c,date:Date.now()});
      io.of('/'+data.to_user_id).emit('new messages',{received_messages:c,date:Date.now()});
        }) 
      })
    })
  })
})


  
app.use('/user', userRoutes);
app.use('/post', postRoutes);

app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});
app.listen('3000', function (){
    console.log("Listening for Local Host 3000");
});
module.exports = app;
