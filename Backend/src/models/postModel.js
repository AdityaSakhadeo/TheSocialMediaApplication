import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
	postId: {
	    type: Number,
	    required: true,
	},
	safety: {
	    type: Number,
	    required: true,
	},
	accessibility: {
	    type: Number,
	    required: true,
	},
	cost: {
	    type: Number,
	    required: true,
	},
	totalStars: {
	    type: Number,
	    default: 0,
	},
	likes: {
	    type: Number,
	    default: 0,
	},
	image: {
	    type: String,
	    required: true,
	},
	caption: {
	    type: String,
	    required: true,
	},
	comments: {
	    type: [String],
	    default: [],
	},
	destination: {
	    type: Schema.Types.ObjectId,
	    ref: 'Destination',
	    required: true,
	},
    });
    
    const Post = mongoose.model('Post', postSchema);
    
    export default Post;
    