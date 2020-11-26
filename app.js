require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("peliculas:principal");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const rutasDirectores = require("./rutas/rutas-directores");
const rutasPeliculas = require("./rutas/rutas-peliculas");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/directores", rutasDirectores);
app.use("/peliculas", rutasPeliculas);
app.get("/", (req, res, next) => {
  res.redirect("/peliculas");
});
app.use((req, res, next) => {
  const mensaje = "La URL solicitada no existe";
  res.status(404).send(mensaje);
  debug(chalk.red(mensaje));
});
app.use((err, req, res, next) => {
  const codigoStatus = err.codigoStatus || 500;
  const mensaje = codigoStatus === 500 ? "Ha ocurrido un error general" : err.message;
  res.status(codigoStatus).json({ msj: mensaje });
  debug(chalk.red(mensaje));
});

const puerto = process.env.PUERTO_SERVIDOR || 3000;

const server = app.listen(puerto, () => {
  debug(chalk.yellow(`El servidor está escuchando en http://localhost:${puerto}`));
});

server.on("error", error => {
  console.log(chalk.red("Error al iniciar el servidor"));
  if (error.code === "EADDRINUSE") {
    console.log(chalk.red(`El puerto ${puerto} ya está siendo usado por otra aplicación`));
  }
});
