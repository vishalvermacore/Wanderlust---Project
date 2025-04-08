const Listing = require("../models/listing.js");

//index route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

//new route
module.exports.renderNewForm = async (req, res) => {
    res.render("listings/new.ejs");
};

//show route
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            },
        })
        .populate('owner');
    if (!listing) {
        req.flash('error', 'Listing not found!');
        res.redirect('/listings');
    }
    // console.log(listing);
    res.render('listings/show.ejs', { listing });
};


//create route
module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash('success', 'Successfully created a new listing!');
    res.redirect('/listings');
};


//edit route
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Cannot find that listing!');
        res.redirect('/listings'); // Use `return` to prevent further execution
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("upload", "upload/w_200,c_fill");
    res.render('listings/edit.ejs', { listing, originalImageUrl });
};

//update route
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash('success', 'Successfully updated the listing!');
    res.redirect(`/listings/${id}`); // Use `return` to prevent further execution
};

//delete route
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash('success', 'Successfully deleted the listing!');
    return res.redirect('/listings'); // Use `return` to prevent further execution
};

