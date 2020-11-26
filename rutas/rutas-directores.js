const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("peliculas:rutas-directores");
const peliculasJSON = require("../peliculas.json");

const rutas = express.Router();

const getDirectores = () => peliculasJSON.peliculas
  .map(pelicula => (
    {
      director: pelicula.director
    }))
  .filter((director, i, directores) => directores.indexOf(director) === i);

rutas.get("/", (req, res, next) => {
  debug(chalk.blue("Se ha pedido el listado de directores"));
  res.json(getDirectores());
});

rutas.get("/peliculas/:nombre", (req, res, next) => {
  const nombre = req.params.nombre;
  const directorExiste = getDirectores().find(director => director.director.toLowerCase().startsWith(nombre.toLowerCase()));
  if (!directorExiste) {
    const error = new Error(`No se ha encontrado el director ${nombre}`);
    error.codigoStatus = 404;
    return next(error);
  }
  const peliculasDirector = peliculasJSON.peliculas.filter(pelicula => pelicula.director === directorExiste.director);
  debug(chalk.blue(`Se ha pedido el director ${nombre}`));
  res.json(peliculasDirector);
});

module.exports = rutas;
