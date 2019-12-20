import {Connection, Model, Schema, Document, model} from "mongoose";
import {getConnection} from "../DatabaseConnection";
import * as bcrypt from 'bcrypt';

export interface UserEntity extends User, Document {

}

export interface User {
    username: String,
    name?: String,
    email: String,
    password: String,
}

const convertUser = (userEntity: UserEntity): User => {
    return {
        email: userEntity.username, name: userEntity.name, password: userEntity.password, username: userEntity.username
    }
};

const userSchema = new Schema({
    username: {type: String, required: true, unique: true, trim: true},
    name: {type: String, required: false, trim: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true, trim: true},
}).pre('save', function (this: UserEntity, next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            next(err);
        }
        user.password = hash;
        next();
    })
});

const schema = () => getConnection().then(connection => {
    return connection.model<UserEntity>('User', userSchema);
});


export async function getUserByUsername(username: String): Promise<User | null> {
    console.log('searching db for user', username);
    return await schema().then(async schema => {
        return await schema.findOne({username: username}).exec()
            .then(value => value === null ? null : convertUser(value));
    })
}

export function createUser(user: User, onSuccess: Function, onFail: Function) {
    console.log('Trying to create a new user with username', user.username);
    schema().then(async model => {
        return model.create(user, (err: Error, res: UserEntity) => {
            if (err) {
                console.log('no user created');
                onFail();
            } else {
                const user = convertUser(res);
                console.log('created user', user);
                onSuccess(user);
            }
        });
    })
}

