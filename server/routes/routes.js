const express = require('express');
const app = express();
const { verifyToken } = require('../middleware/authentication');

app.get('/', (req, res) => {
	res.status(200).json({
		bienvenido: 'Bienvenido a la API Cafe'
	});
});

app.use( '/login',  require('./login.routes') );
app.use( '/usuario', verifyToken, require('./usuario.routes') );

// rutas 404
app.use(function(req, res ) {
	res.status(404).send({ message: 'URL not found' });
});

// manejador de errores en general
app.use(function(error, req, res, next) {
	res.status(500).json({ message: error.message });
});


module.exports = app;
