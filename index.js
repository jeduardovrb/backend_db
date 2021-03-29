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

const auth = require("./routes/auth");

app.use("/auth", auth);

const port = 3000;

app.get('/', (req, res) => {
  res.send("Hello Word");
});

app.get('*', (req, res) => {
  res.send("Página Inválido: 404");
}); 

app.listen(port, () => console.log(`Escutando na porta ${port}`));