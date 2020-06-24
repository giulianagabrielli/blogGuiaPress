const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')

const CategoriesController = require('./categories/CategoriesController')
const ArticlesController = require('./articles/ArticlesController')

const Article = require('./articles/Article')
const Category = require('./categories/Category')

//view engine
app.set('view engine', 'ejs')

//Static
app.use(express.static('public'))

//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão com banco de dados feita com sucesso!")
    }).catch((error)=>{
        console.log("Erro na conexão com o banco de dados.")
    })


app.use('/', CategoriesController)
app.use('/', ArticlesController)


app.listen(3333, ()=>{
    console.log('Servidor iniciado na porta 3333.')
})