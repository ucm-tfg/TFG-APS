const bd = require('../../config');
const usuario = () => bd("usuario").select("*");
module.exports = { usuario };