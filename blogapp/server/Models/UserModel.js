import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
});

const UserModel = mongoose.model("userinfos", userSchema);
export default UserModel;