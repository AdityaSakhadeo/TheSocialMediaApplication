import mongoose, {Schema} from 'mongoose';

const commentSchema = new Schema({
	text: {
	    type: String,
	    required: true,
	},
	likes: {
	    type: Number,
	    default: 0,
	},
	dislikes: {
	    type: Number,
	    default: 0,
	},
    });
    
    const Comment = mongoose.model('Comment', commentSchema);
    
    export default Comment;