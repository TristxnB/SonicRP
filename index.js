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
let fs = require('fs')
let adminUser = require('./database/admin.json')
if(!fs.existsSync("./database/posts.json")){
    fs.writeFileSync("./database/posts.json", "[]")
}

let posts = require('./database/posts.json')

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

app.get('/blog/create', (req, res)=>{
    verifyToken(req.cookies.token).then((userInfos)=>{
        res.render('admin')
    }).catch(()=>{
        res.redirect('/blog/login')
    })

})

app.get('/blog/login', (req, res)=>{
    verifyToken(req.cookies.token).then((userInfos)=>{
        res.redirect('/blog/create')
    }).catch(()=>{
        res.render('login', {
            err: null
        })
    })

})

app.post("/blog/login", (req, res)=>{
    let user = req.body.srp_admin
    let pass = req.body.srp_password

    if(user == adminUser.username && pass == adminUser.password){
        res.cookie('token', jwt.sign({user: user}, JWT_TOKEN))
        res.redirect('/blog/create')
    }else{
        res.render('login', {
            err: "Identifiants incorrects !"
        })
    }
})

function verifyToken(token){
    return new Promise((resolve, reject) =>{
        jwt.verify(token, JWT_TOKEN, function(err, decoded){
            if(err){
                reject()
            }else{
                resolve(decoded)
            }
        })
    })
}


app.listen(2301, function(){
    console.log("Le serveur écoute sur le port 2301. Logs :")
});
