const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('index')
})

router.get('/articles', (req, res)=>{

})

router.get('/admin/articles/new', (req, res)=>{

})

module.exports = router