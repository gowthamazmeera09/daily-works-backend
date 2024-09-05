const ADDWORK = require('../model/Addwork');
const User = require('../model/User');

const workadding = async (req, res) => {
    const { workname, experience, location } = req.body;
    const userId = req.params.userId;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

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

module.exports = { workadding };
