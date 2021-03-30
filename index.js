const express = require('express');
const app = express();

// Banco de Dados
const mongoose = require('mongoose');
const db_access = require('./setup/db').mongoURL;

mongoose
.connect(db_access, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Conexao ao MongoDB bem sucedida!"))
.catch(err => console.log(err));

// Login
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// rota da index
app.use(bodyparser.urlencoded({ extended: false}));
app.use('/', express.static(__dirname + '/src'));

const auth = require("./routes/auth");

app.use("/auth", auth);

app.use("/", auth);

const port = 3000;

app.listen(port, () => console.log(`Escutando na porta ${port}`));