const express = require('express');
const router = express.Router();

// tratar aitenticação

const Pessoa = require("../models/pessoa");

const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
    Pessoa.findOne({email: req.body.email, name: req.body.name, comentario: req.body.comentario})
    .then(doc_pessoa => {
        if (doc_pessoa) {  
            return res.status(400).json({Erro: "Dados já registrado no sistema"});
        } else {
            const novo_reg_pessoa = Pessoa({
                name: req.body.name,
                email: req.body.email,
                senha: req.body.senha,
                comentario: req.body.comentario,
            });

            // criptografar a senha
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(novo_reg_pessoa.senha, salt, function(err, hash) {
                    if (err) throw err;
                    novo_reg_pessoa.senha = hash;
                    
                    // salvar no bd
                    novo_reg_pessoa
                    .save()
                    .then(p => res.json(p))
                    .catch(err => console.log(err));
                });
            });

            router.get('/', express.static(__dirname + '/src'));
        }
    })
    .catch(err => console.log(err));
});

router.get("/", (req, res) => res.json({status: "Acesso permitido"}));

router.get("*", (req, res) => res.json({Erro: "Página Inválido: 404"})); 

module.exports = router;