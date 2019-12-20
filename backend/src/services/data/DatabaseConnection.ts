import mongoose, {Connection, mongo, Mongoose, Schema} from 'mongoose';

const dbUser = 'my-meeting';
const dbPass = 'JRva33nJganDXFoavYXoYeZB';
const dbHost = 'localhost';
const dbPort = '27017';
const dbDatabase = 'my-meeting-db';
const databaseUri = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbDatabase}`;

let connection: Mongoose;

export async function initDatabase() {
    return mongoose.connect(databaseUri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).then(mongoose => {
        connection = mongoose;
        console.log('database connection initialized');
    });
}

export async function getConnection(): Promise<Connection> {
    if (connection === undefined || connection.connection.readyState !== 1) {
        await initDatabase();
    }
    return connection.connection;
}
