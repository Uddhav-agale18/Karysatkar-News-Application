import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChangeProfile = ({ onLogoChange }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [message, setMessage] = useState('');
    const [profileLogo, setProfileLogo] = useState(''); // State for storing the profile image URL
    const fileInputRef = useRef(null);

    // Fetch profile data on component mount
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile');
                // Assuming the logo URL is in response.data.profile.logo
                if (response.data && response.data.profile) {
                    setProfileLogo(response.data.profile.logo);
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                // Call the onLogoChange function passed from NavBar
                if (typeof onLogoChange === "function") {
                    onLogoChange(reader.result); // Send back the base64 image URL
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (selectedImage) {
            const formData = new FormData();
            formData.append('logo', selectedImage);

            try {
                const response = await axios.post('http://localhost:5000/api/profile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setMessage('Logo/Profile updated successfully!');

                // Assuming response.data.profile.logo contains the new logo URL
                const newLogoUrl = response.data.profile.logo;
                setProfileLogo(newLogoUrl);

                // Call the onLogoChange function to update the logo in NavBar
                if (typeof onLogoChange === "function") {
                    onLogoChange(newLogoUrl);
                }

                setSelectedImage(null);
            } catch (error) {
                setMessage('Failed to update the logo. Please try again.');
                console.error('Error uploading image:', error);
            }
        } else {
            setMessage('Please select an image to upload.');
        }
    };


    return (
        <div className="change-profile container mx-auto p-5">
            <h2 className="text-2xl font-bold mb-4">Change Logo/Profile</h2>
            <div className="d-flex align-items-center mb-2">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="me-2"
                />
                <button
                    type="button"
                    onClick={handleUpload}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                >
                    Upload
                </button>
            </div>
            {selectedImage && (
                <div className="mt-2">
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Preview"
                        className="rounded border"
                        style={{ maxWidth: "100%", height: "200px" }}
                    />
                </div>
            )}
            {profileLogo && ( // Display the uploaded logo if it exists
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Current Profile Logo:</h3>
                    <img
                        src={profileLogo}
                        alt="Profile Logo"
                        className="rounded border"
                        style={{ maxWidth: "100%", height: "200px" }}
                    />
                </div>
            )}
            {message && (
                <p className="mt-4 text-green-600">{message}</p>
            )}
        </div>
    );
};

export default ChangeProfile;
