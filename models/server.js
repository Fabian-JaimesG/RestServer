const exp = require("constants");
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const dbConnection = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      authpath :'/api/auth',
      categorias :'/api/categorias',
      products :'/api/products',
      search :'/api/search',
      usuariosPath :'/api/usuarios',
    }
    //Conectar a base de datos
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //Rutas de app
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //cors
    this.app.use(cors());

    //Lecura y parseo del body
    this.app.use(express.json());

    //Dir Public
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.paths.authpath, require("../routes/auth"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.usuariosPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}.`);
    });
  }
}

module.exports = Server;
