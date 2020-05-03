const jwt = require('jsonwebtoken');

let verifyToken = ( req, res, next ) => {
	
	const token = req.get('Authorization');
	
	jwt.verify(token, process.env.SEED, (err, decoded) => {

		if(err) {
			return res.status( 401 ).json({
				ok: false,
				message: 'invalid token'
			}); 
		}

		req.usuario = decoded.usuario;

		next();

	});

}

module.exports = {
	verifyToken
};