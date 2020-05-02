const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const roles = {
	values: [
		'ADMIN_ROL',
		'USER_ROL'
	],
	message: '{VALUE} no es un rol valido'
}

let usuarioSchema = new mongoose.Schema({
	nombre:{
		type: String,
		required: [ true, 'El nombre es necesario']
	},
	email:{
		type: String,
		unique: true,
		required: [true, 'El email es necesario']
	},
	password:{
		type: String,
		required: [true, 'La contraseña es obligatoria ']
	},
	img:{
		type: String
	},
	role:{
		type: String,
		default: 'USER_ROLE',
		enum: roles
	},
	estado:{
		type: Boolean,
		default: true
	},
	google:{
		type: Boolean,
		default: false
	}
});

usuarioSchema.methods.toJSON = function(){
	let usuario = this;
	let usuarioObject = usuario.toObject();
	delete usuarioObject.password;
	return usuarioObject;
};

usuarioSchema.plugin( uniqueValidator,{ message: '{PATH} debe de ser unico' } );

module.exports = mongoose.model('Usuario', usuarioSchema);