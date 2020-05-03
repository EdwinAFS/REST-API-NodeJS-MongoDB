const express = require('express');
const app = express();


app.get('/', (req, res) => {
	res.status(200).json({
		bienvenido: 'Bienvenido a la API Cafe'
	});
});

app.use( '/usuario', require('./usuario.routes') );
app.use( '/login', require('./login.routes') );


// rutas 404
app.use(function(req, res ) {
	res.status(404).send({ message: 'URL not found' });
});

// manejador de errores en general
app.use(function(error, req, res, next) {
	res.status(500).json({ message: error.message });
});


module.exports = app;
