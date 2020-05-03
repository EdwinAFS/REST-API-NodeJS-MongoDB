
HasRole = ( ...args ) =>  {

	const roles = args;

	return function(req, res, next) {
	  
		const role = req.usuario.role;
		
		if( roles.length && ! roles.includes( role ) ){
			return res.json({
				ok: false,
				err:{
					message: `access denied`
				}
			});
		};
		
		next();
	}
}

module.exports = HasRole;