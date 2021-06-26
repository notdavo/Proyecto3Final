const config = {
  user: "david-admin", //Cambiar por su usuario
  password: "david-admin", //cambiar por su contraseña
  server: "DESKTOP-DJHT36V",
  database: "EnsamblajeBD", //Cambiar por la base a la que se conectará
  options: {
    trustedconnection: true,
    enableArithAort: true,
    instancename: "SQLEXPRESS", //Cambiar por el nombre de la instancia a la que se va a conectar
  },
  port: 1433, //Cambiar por el puerto en el que está corriendo su SQL
};

module.exports = config;
