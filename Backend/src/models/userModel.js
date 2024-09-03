import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        index:true,
        lowercase:true
    },
    password: {
        type: String,
        required: [true, "Password is necessary"],
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    followers: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    followedPeople: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    followedPages: {
        type: [Schema.Types.ObjectId],
        ref: 'destination',
        default: [],
    },
    associatedPosts: {
        type: [Schema.Types.ObjectId],
        ref: 'Post',
        default: [],
        validate: [async function(value) {
            // Check if every ObjectId in the array exists in the 'Post' collection
            const allExist = await Promise.all(value.map(id => mongoose.model('Post').exists({ _id: id })));
            return allExist.every(Boolean);
        }, 'One or more associated posts do not exist'],
    },
    profilePhoto: {
        type: String,
        default: 'default.jpg',
    },
    userBio: {
        type: String,
        default: '',
    },
    refreshToken:{
        type:String
    }
},
{
    timestamps:true
});

userSchema.pre("save",async function(next){
	if (this.isModified("password")) return next();
	this.password = bcrypt.hash(this.password,10)
	next()
    });

userSchema.methods.isPasswordCorrect = async function(password)
    {
	return await bcrypt.compare(password,this.password);
    }    

module.exports = mongoose.model('users', UserSchema);




// const userSchema = new Schema({
// 	userName: {
// 		type: String,
// 		required: true,
// 		unique: true,
// 		lowercase: true,
// 		trim: true,
// 		index: true,
// 	},

// 	password: {
// 		type: String,
// 		required: true,
// 	},

// 	fullName: {
// 		type: String,
// 		required: true,
// 	},

// 	phoneNumber: {
// 		type: String,
// 		required: true,
// 	},

// 	followers: {
// 		type: [Schema.Types.ObjectId],
// 		default: [],
// 	},

// 	followedPeople: {
// 		type: 




