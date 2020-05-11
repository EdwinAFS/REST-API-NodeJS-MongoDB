const { Router } = require('express');
const { Usuario } = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const hasRole = require('../middleware/hasRole');

const router = Router();

router.get('/', ({ query }, res)=>{
	
	let from = query.from || 0;
	let limit = query.limit || 5;

	Usuario.find({estado: true}, "nombre email role estado google img")
		.skip( Number(from) )
		.limit( Number(limit) )
		.exec((err, usuarios) => {

			if(err) {
				return res.status( 400 ).json({
					ok: false,
					err
				});
			};

			Usuario.countDocuments({estado: true}, (err, count) => {

				if(err) {
					return res.status( 400 ).json({
						ok: false,
						err
					});
				};

				res.json({
					ok: true,
					usuarios,
					count 
				})
			});

		});
});

router.post('/', hasRole('ADMIN_ROL'), ({body}, res) => {

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
		
		if(err) {
			return res.status( 400 ).json({
				ok: false,
				err
			});
		};

		res.status(201).json({
			usuario: usuarioDB
		});

	});
});

router.put('/:id', ({body, params}, res) => {

	const id = params.id;
	const usuario = _.pick( body, ['nombre', 'email', 'img', 'role', 'estado']);

	Usuario.findByIdAndUpdate(id, usuario, {new: true, runValidators: true}, (err, usuarioDB) => {
		
		if(err) {
			return res.status( 400 ).json({
				ok: false,
				err
			});
		};
		
		return res.status(200).json({
			ok: true,
			usuario: usuarioDB
		});

	});

});

router.delete('/:id', hasRole('ADMIN_ROL'), ({params}, res) =>{
	
	const id = params.id;

	Usuario.findByIdAndUpdate(id, { estado: false },{ new: true}, (err, usuarioDB)=>{
		if(err) {
			return res.status( 400 ).json({
				ok: false,
				err
			});
		};

		res.json({
			ok: true,
			usuario: usuarioDB
		});

	});
});


module.exports = router;
