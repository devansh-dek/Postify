import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
        unique: true
    }
    ,
    email: {
        type: String,
        required: true
    }
    ,
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })

UserSchema.pre('save', function (next) {
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
    next();
})


UserSchema.method.comparePassword = function compare(password) {
    return bcrypt.compareSync(password, this.password);
}
UserSchema.method.getJWT = function generate() {
    return jwt.sign({ id: this._id, email: this.email },
        'twitter_secret', {
        expiresIn: '1h'
    });
}


const User = mongoose.model('User', UserSchema)
export default User