const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();

app.get('/usuario', ({ query }, res)=>{
	
	let from = query.from || 0;
	let limit = query.limit || 5;

	Usuario.find({estado: true}, "nombre email role estado google img")
		.skip( Number(from) )
		.limit( Number(limit) )
		.exec((err, usuarios) => {

			handlerError( err, res );

			Usuario.count({estado: true}, (err, count) => {

				handlerError( err, res );

				res.json({
					ok: true,
					usuarios,
					count 
				})
			});

		});
});

app.post('/usuario', ({body}, res) => {

	const usuario = new Usuario({
		nombre: body.nombre,
		email: body.email,
		password: bcrypt.hashSync( body.password, 10 ),
		// img: body.img,
		role: body.role,
		// estado: body.estado,
		// google: body.google
	});

	usuario.save((err, usuarioDB) => {
		
		handlerError( err, res );

		res.status(201).json({
			usuario: usuarioDB
		});

	});
});

app.put('/usuario/:id', ({body, params}, res) => {

	const id = params.id;
	const usuario = _.pick( body, ['nombre', 'email', 'img', 'role', 'estado']);

	Usuario.findByIdAndUpdate(id, usuario, {new: true, runValidators: true}, (err, usuarioDB) => {
		
		handlerError( err, res );
		
		return res.status(200).json({
			ok: true,
			usuario: usuarioDB
		});

	});

});

app.delete('/usuario/:id', ({params}, res) =>{
	
	const id = params.id;

	Usuario.findByIdAndUpdate(id, { estado: false },{ new: true}, (err, usuarioDB)=>{
		handlerError(err, res);

		res.json({
			ok: true,
			usuario: usuarioDB
		});

	});
});

function handlerError( err, res, errorCode = 400 ){
	if(err) {
		return res.status( errorCode ).json({
			ok: false,
			err
		});
	};
}

module.exports = app;
