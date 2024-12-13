const Profile = require('../model/profileModel');
const path = require('path');

exports.createOrUpdateProfile = async (req, res) => {
    try {
        const logo = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : req.body.logo;

        let profile = await Profile.findOne();
        if (profile) {
            profile.logo = logo; // Update existing profile
            await profile.save();
            return res.status(200).json({ message: 'Profile updated successfully', profile });
        } else {
            profile = new Profile({ logo }); // Create new profile
            await profile.save();
            return res.status(201).json({ message: 'Profile created successfully', profile });
        }
    } catch (error) {
        console.error('Error in creating/updating profile:', error);
        res.status(500).json({ error: error.message });
    }
};


exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne(); // Consider adding criteria for finding a specific profile
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ profile }); // Wrap profile in an object for consistency
    } catch (error) {
        console.error('Error fetching profile:', error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};

