const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.info('Conectado a la base de datos');
    } catch (error) {
        console.error(error);
        throw new Error('Error al conectar a la base de datos');
    }
}

module.exports = { dbConnection }