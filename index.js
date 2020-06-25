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

//rota home
app.get('/', (req, res)=>{
    Article.findAll({
        order: [['id', 'DESC']],
        limit: 4
    }).then(articles=>{
        Category.findAll().then(categories=>{
            res.render('index', {articles: articles, categories: categories})
        })
    })
})

//procurar artigo pelo slug
app.get('/:slug', (req, res)=>{
    var slug = req.params.slug 
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article=>{
        if(article != undefined){
            Category.findAll().then(categories=>{
                res.render('article', {article: article, categories: categories})
            })
        } else {
            res.redirect('/')
        }
    }).catch(error=>{
        res.redirect('/')
    })
})

//filtro de categorias
app.get('/category/:slug', (req, res)=>{
    var slug = req.params.slug 
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category=>{
        if(category != undefined){
            Category.findAll().then(categories=>{
                res.render('index', {articles: category.articles, categories: categories})
            })
        } else {
            res.redirect('/')
        }
    }).catch(error=>{
        res.redirect('/')
    })
})

app.listen(3333, ()=>{
    console.log('Servidor iniciado na porta 3333.')
})