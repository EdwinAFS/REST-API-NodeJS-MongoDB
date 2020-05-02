const express = require('express');
var bodyParser  = require('body-parser');

const app = express();

// Config
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
	res.status(200).json({
		bienvenido: 'Bienvenido a la API Cafe'
	});
});

app.post('/usuario', (req, res) => {
	res.status(201).json({
		usuario: req.body 
	});
});

app.listen(app.get('port'), ()=>{
	console.log( `server en el puerto ${app.get('port') }`);
});