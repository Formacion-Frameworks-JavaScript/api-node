const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("peliculas:rutas-peliculas");
const { body, validationResult } = require("express-validator");
const peliculasJSON = require("../peliculas.json");

const rutas = express.Router();

rutas.get("/", (req, res, next) => {
  debug(chalk.blue("Se ha pedido el listado de películas"));
  res.json(peliculasJSON);
});

rutas.get("/detalle/:id", (req, res, next) => {
  const id = +req.params.id;
  debug(chalk.blue(`Se ha pedido el detalle de la película ${id}`));
  let pelicula = peliculasJSON.peliculas.find(pelicula => pelicula.id === id);
  if (!pelicula) {
    const error = new Error(`No hay ninguna película con la id ${id}`);
    error.codigoStatus = 404;
    return next(error);
  }
  pelicula = { ...pelicula };
  delete pelicula.valoracion;
  res.json(pelicula);
});

rutas.post("/nueva", [body("titulo").exists()], (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    const error = new Error("La película no lleva título");
    error.codigoStatus = 400;
    return next(error);
  }
  debug(chalk.blue("Se ha enviado una nueva película"));
  let nuevaPelicula = req.body;
  const nuevaId = peliculasJSON.peliculas[peliculasJSON.peliculas.length - 1].id + 1;
  nuevaPelicula = {
    ...nuevaPelicula,
    id: nuevaId
  };
  peliculasJSON.peliculas.push(nuevaPelicula);
  res.status(201).json(nuevaPelicula);
});

rutas.delete("/borrar/:id", (req, res, next) => {
  const id = +req.params.id;
  const pelicula = peliculasJSON.peliculas.find(pelicula => pelicula.id === id);
  if (!pelicula) {
    const error = new Error(`No se ha encontrado ninguna película con la id ${id}`);
    error.codigoStatus = 404;
    return next(error);
  }
  peliculasJSON.peliculas = peliculasJSON.peliculas.filter(pelicula => pelicula.id !== id);
  debug(chalk.blue(`Se ha borrado la película con id ${id}`));
  res.json(pelicula);
});

rutas.put("/modificar", (req, res, next) => {
  const pelicula = req.body;
  let existePelicula = peliculasJSON.peliculas.find(p => p.id === pelicula.id);
  if (!existePelicula) {
    const error = new Error(`No se ha encontrado ninguna película con la id ${pelicula.id}`);
    error.codigoStatus = 404;
    return next(error);
  }
  peliculasJSON.peliculas = peliculasJSON.peliculas.map(p => {
    if (p.id === existePelicula.id) {
      return {
        ...pelicula
      };
    } else {
      return p;
    }
  });
  existePelicula = {
    ...pelicula
  };
  debug(chalk.blue(`Se ha modificado la película con id ${pelicula.id}`));
  res.json(existePelicula);
});

module.exports = rutas;
