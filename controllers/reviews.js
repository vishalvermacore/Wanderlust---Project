// Description: This file contains all the review related functions.
// It is imported by the review routes file to handle the review routes.
const Listing = require("../models/listing");
const Review = require("../models/review");

// create a review
module.exports.createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new review added");
    req.flash("success", "Successfully added a new review!");
    res.redirect(`/listings/${listing._id}`);
};

// delete a review
module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted a review!");
    res.redirect(`/listings/${id}`);
};
