const express = require('express')
const router = express.Router()

const User = require('./User')

const bcrypt = require('bcryptjs')

//listando os usuários
router.get('/admin/users', (req, res)=>{
    User.findAll().then(users=>{
        res.render('admin/users/index', {users: users})
    })
})

//criando novo usuário
router.get('/admin/users/create', (req, res)=>{
    res.render('admin/users/create')
})

//adicionando o novo usuário ao banco de dados
router.post('/users/create', (req, res)=>{
    var email = req.body.email 
    var password = req.body.password 

    User.findOne({
        where: {
            email: email
        }
    }).then(user=>{
        if(user == undefined){

            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)
        
            User.create({
                email: email, 
                password: hash
            }).then(()=>{
                res.redirect('/')
            }).catch(error=>{
                res.redirect('/')
            })

        } else {
            res.redirect('/admin/users/create')
        }
    })

})

module.exports = router