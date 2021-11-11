const jwt = require('jsonwebtoken');

const generarJWT = ( current_user ) => {

    return new Promise( (resolve, reject) => {
        console.log('process.env.JWT_SECRET: '+ process.env.JWT_SECRET)
        const payload = { current_user };

        jwt.sign( payload, process.env.JWT_SECRET || 'secret_key', {
            expiresIn: process.env.JWT_SECRET_TIME || '24h'
        }, (err, token) => {
            if(err) {
                console.error(err);
                reject('Token JWT no generado');
            } else {
                resolve(token);
            }
        });

    })

}

const verificarJWT = ( token ) => {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, decoded) => {
        if (err) {
            return {ok: false, usuario: null};
        }
        return {ok: true, usuario: decoded.current_user};
    });
}

module.exports = {
    generarJWT,
    verificarJWT,
}
