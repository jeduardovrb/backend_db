const express = require('express');
const router = express.Router();

// tratar aitenticação

const Pessoa = require("../models/pessoa");

router.post("/signup", (req, res) => {
    Pessoa.findOne({email: req.body.email})
    .then(doc_pessoa => {
        if (doc_pessoa) {  
            return res.status(400).json({emailerro: "Email já registrado no sistema"});
        } else {
            const novo_reg_pessoa = Pessoa({
                name: req.body.name,
                email: req.body.email,
                senha: req.body.senha,
                usename: req.body.usename,
            });
            // salvar no bd
            novo_reg_pessoa
            .save()
            .then(p => res.json(p))
            .catch(err => console.log(err));
        }
    })
    .catch(err => console.log(err));
});

router.get("/", (req, res) => res.json({status: "Acessp permitido"}));

module.exports = router;