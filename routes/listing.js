const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing  = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require('multer');

const streamifier = require('streamifier');
const { cloudinary } = require("../cloudConfig.js");
const upload = multer({ storage: multer.memoryStorage() });

router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"), 
    async (req, res) => {
      try {
        if (!req.file) {
          req.flash("error", "No image uploaded");
          return res.redirect("/listings/new");
        }

        const uploadToCloudinary = (buffer, folder = "wanderlust_DEV") => {
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder, resource_type: "image" }, 
              (error, result) => {
                if (error) return reject(error);
                resolve(result); 
              }
            );
            streamifier.createReadStream(buffer).pipe(uploadStream);
          });
        };

        const result = await uploadToCloudinary(req.file.buffer);

        console.log("Cloudinary result:", result);

        req.body.image = {
          url: result.secure_url,       
          filename: result.public_id   
        };

        return listingController.createListing(req, res);

      } catch (err) {
        console.error("Upload error:", err);
        req.flash("error", "Image upload failed");
        return res.redirect("/listings/new");
      }
    }
  );


//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
  .get(wrapAsync(listingController.showListing))

  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    async (req, res) => {
      if (req.file) {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "wanderlust_DEV" },
          (error, result) => {
            if (error) {
              req.flash("error", "Image upload failed");
              return res.redirect("back");
            }

            req.body.listing.image = {
              url: result.secure_url,
              filename: result.public_id
            };

            listingController.updateListing(req, res);
          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(uploadStream);

      } else {
        listingController.updateListing(req, res);
      }
    }
  )

  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;