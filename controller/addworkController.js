const ADDWORK = require('../model/Addwork');
const User = require('../model/User');
const path = require('path');
const fs = require('fs');

// Existing workadding function updated to handle multiple images
const workadding = async (req, res) => {
    const { workname, experience, location } = req.body;
    const userId = req.params.userId;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Process uploaded files
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "At least one image is required" });
        }

        // Construct absolute URLs for the images
        const imageUrl = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);

        // Check if the work with the given name, experience, and location exists
        let work = await ADDWORK.findOne({ workname, experience, location });

        if (work) {
            // Check if this work is already associated with the user
            if (user.addwork.includes(work._id)) {
                return res.status(400).json({ message: "This work is already added by the user" });
            }
            return res.status(400).json({ message: "This work already exists with the same details" });
        } else {
            // If the work does not exist, create a new entry
            work = new ADDWORK({
                workname,
                experience,
                location,
                imageUrl, // Store array of image URLs
                user: user._id
            });
            const savedWork = await work.save();
            work = savedWork; // Use the newly created work
        }

        // Add the work reference to the user's `addwork` array
        user.addwork.push(work._id);
        await user.save();

        // Respond with success message and the work
        res.status(201).json({ success: "Work added successfully", work });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// New function to add images to an existing work
const addImageToWork = async (req, res) => {
    const workId = req.params.workId;

    try {
        // Find the work by ID
        const work = await ADDWORK.findById(workId);
        if (!work) {
            return res.status(404).json({ error: "Work not found" });
        }

        // Check if files are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No images uploaded" });
        }

        // Construct absolute URLs for the new images
        const newImageUrl = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);

        // Add new images to the imageUrl array
        work.imageUrl.push(...newImageUrl);
        await work.save();

        res.status(200).json({ success: "Images added successfully", imageUrl: newImageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// New function to delete an individual image from a work
const deleteImageFromWork = async (req, res) => {
    const workId = req.params.workId;
    const imageName = req.params.imageName;

    try {
        // Find the work by ID
        const work = await ADDWORK.findById(workId);
        if (!work) {
            return res.status(404).json({ error: "Work not found" });
        }

        // Construct the imageUrl based on imageName
        const imageUrlToDelete = `${req.protocol}://${req.get('host')}/uploads/${imageName}`;

        // Find the index of the imageUrl
        const imageIndex = work.imageUrl.indexOf(imageUrlToDelete);
        if (imageIndex === -1) {
            return res.status(404).json({ error: "Image not found in this work" });
        }

        // Remove the imageUrl from the array
        work.imageUrl.splice(imageIndex, 1);

        // Delete the image file from the filesystem
        const filePath = path.join(__dirname, '..', 'uploads', imageName);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete image file: ${filePath}`, err);
                // Proceed without stopping
            }
        });

        await work.save();

        res.status(200).json({ success: "Image deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Existing deletework function remains unchanged
const deletework = async(req, res) => {
    const workId = req.params.workId; 
    try {
        const deletedWork = await ADDWORK.findByIdAndDelete(workId);
        if (!deletedWork) {
            return res.status(400).json({ message: "No work found" });
        }

        // Optionally, delete associated images from the filesystem
        if (deletedWork.imageUrl && deletedWork.imageUrl.length > 0) {
            deletedWork.imageUrl.forEach(imageUrl => {
                const imageName = imageUrl.split('/').pop();
                const filePath = path.join(__dirname, '..', 'uploads', imageName);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image file: ${filePath}`, err);
                        // Proceed without stopping
                    }
                });
            });
        }

        res.status(200).json({ message: "Deleted successfully" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); 
    }
};

module.exports = { workadding, deletework, addImageToWork, deleteImageFromWork };
