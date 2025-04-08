const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');
const { required } = require('joi');

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


// Middleware to delete reviews when a listing is deleted
// This middleware is run after a listing is deleted
listingSchema.post('findOneAndDelete', async function (listing) {
    if (listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
});


const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;