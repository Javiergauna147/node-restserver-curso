const jwt = require('jsonwebtoken');


//===========
// Verificar Token
//===========

let verificaToken = (req, res, next) => {

	let token = req.get('token');
	jwt.verify(token, process.env.SEED, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				ok: false,
				err: {
					message: 'token no válido'
				}
			});
		}

		req.usuario = decoded.usuario;
		next();

	});
	
};

//===========
// Verifica AdminRole
//===========

let verificaAdmin_Role = (req, res, next) => {

	let usuario = req.usuario;

	if (usuario.role === 'ADMIN_ROLE') {
		next();
	}else{
		return res.json({
			ok:true,
			err: {
				message: 'El usuario no es administrador'
			}
		});
	}
}

//===========
// Verifica token para imagen
//===========


let verificaTokenImg = (req, res, next) => {

	let token = req.query.token;

	jwt.verify(token, process.env.SEED, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				ok: false,
				err: {
					message: 'token no válido'
				}
			});
		}

		req.usuario = decoded.usuario;
		next();
	});
}




module.exports = {
	verificaTokenImg,
	verificaToken,
	verificaAdmin_Role
}