const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const listingController = require('../controllers/listings.js');
// console.log('listingController', listingController);
const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });

// // INDEX ROUTE && CREATE ROUTE
router.route('/')
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createListing));


// NEW ROUTE
router.get('/new', isLoggedIn, wrapAsync(listingController.renderNewForm));

// SHOW ROUTE && UPDATE ROUTE && DELETE ROUTE    
router.route('/:id')
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner,upload.single('listing[image]'), wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// EDIT ROUTE
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;

