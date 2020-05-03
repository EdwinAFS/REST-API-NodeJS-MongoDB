const { Router } = require('express');
const { Usuario } = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/authentication');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = Router();

router.get('/', verifyToken, ( req, res)=>{
	res.json({
		ok: true,
		usuario: req.usuario
	});
});

router.post('/', ({ body }, res)=>{

	Usuario.findOne({email: body.email}, (err, usuarioDB) => {
		
		if(err) {
			return res.status( 400 ).json({
				ok: false,
				err
			}); 
		}

		if( !usuarioDB ){
			return res.status( 400 ).json({
				ok: false,
				err:{ message: 'Usuario o contraseña incorrectos'}
			}); 		
		}
			

		if( ! bcrypt.compareSync( body.password, usuarioDB.password ) ){
			return res.status( 400 ).json({
				ok: false,
				err:{ message: 'Usuario o contraseña incorrectos'}
			}); 
		}

		let token = jwt.sign({
			usuario: usuarioDB
		}, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRATION });
		
		res.json({
			ok: true,
			usuario: usuarioDB,
			token: token
		});
	});

});

// Google config
async function verify( token ) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID
	});
	const payload = ticket.getPayload();

	return {
		nombre: payload.name,
		email: payload.email,
		img: payload.picture,
		google: true 
	}
}


router.post('/tokensignin', async ({ body }, res)=>{

	const token = body.idtoken;

	const googleUser = await verify( token )
		.catch( err => {
			return res.status(403).json({
				ok: false,
				err
			})								
		});

	Usuario.findOne({email: googleUser.email}, (err, usuarioDB) =>{
		
		if(err) {
			return res.status( 400 ).json({
				ok: false,
				err
			}); 
		}
		
		if( usuarioDB ){
			if( !usuarioDB.google ){
				return res.status( 400 ).json({
					ok: false,
					err:{ message: 'Debe de usar su autenticacion normal'}
				}); 		
			} else {
				
				let token = jwt.sign({
					usuario: usuarioDB
				}, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRATION });

				return res.json({
					ok: true,
					usuario: usuarioDB,
					token
				});
			}
		} else {
			const usuario = new Usuario();
			usuario.nombre = googleUser.nombre; 
			usuario.email = googleUser.email; 
			usuario.img = googleUser.img; 
			usuario.google = googleUser.google; 
			usuario.password = 'no-password'; 

			usuario.save( (err, usuarioDB) => {
				
				if(err) {
					return res.status( 400 ).json({
						ok: false,
						err
					}); 
				}

				let token = jwt.sign({
					usuario: usuarioDB
				}, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRATION });

				return res.json({
					ok: true,
					usuario: usuarioDB,
					token
				});
			});

		}

	});

})


module.exports = router;
