let express = require('express')
let app = express();
let bodyParser = require("body-parser")
let helmet = require("helmet")
let cookieParser = require('cookie-parser')
let morgan = require('morgan')
let favicon = require('serve-favicon')
let bcrypt = require('bcrypt')
let jwt = require("jsonwebtoken")
let path = require('path')

const JWT_TOKEN = "39bfVIivO2RbDdZlnECA6gtV4TqFag7W"

app.use(favicon(path.join(__dirname, 'static/imgs', 'LogoSDev.png')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'))
app.use(helmet());

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/joinus', (req, res)=>{
    res.render('joinus')
})


app.listen(2301, function(){
    console.log("Le serveur écoute sur le port 2301. Logs :")
});
