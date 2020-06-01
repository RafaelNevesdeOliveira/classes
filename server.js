const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');

const server = express();

server.use(express.urlencoded({extended:true}))
//Responsável por receber as informações
//do submit da página create.njk, o 
//comando "req.body"
server.use(express.static("public"));
server.use(routes);

server.set("view engine", "njk");

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true,
    watch:true
})

server.listen(4000, function(){
    console.log("server is running");
})
