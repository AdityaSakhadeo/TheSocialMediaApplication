import mongoose, { Schema } from 'mongoose';

const destinationSchema = new Schema({
	_id: {
	    type: Number,
	    required: true,
	},
	followers: {
	    type: [Number],
	    default: [],
	},
	name: {
	    type: String,
	    required: true,
	},
	location: {
	    type: String,
	    required: true,
	},
	bannerImage: {
	    type: String,
	    required: true,
	},
	subImages: {
	    type: [String],
	    default: [],
	},
	posts: {
	    type: [String],
	    default: [],
	},
    });
    
    const Destination = mongoose.model('destination', destinationSchema);
    
    export default Destination;
