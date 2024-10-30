/** @format */
import React, { useState, useEffect } from "react";
import { Button, Navbar, InputField } from "../../components";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Path from "../../constants/Path";
import { toast, ToastContainer } from 'react-toastify';
import "./Profile.css";

// Simple Modal Component for Edit Profile
const EditProfileModal = ({ isOpen, onClose, formValues, setFormValues }) => {
    const [tempValues, setTempValues] = useState(formValues);

    useEffect(() => {
        // Reset temp values when modal opens
        setTempValues(formValues);
    }, [formValues, isOpen]);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            // Update the main form values
            setFormValues(tempValues);
            
            // Save to localStorage
            localStorage.setItem("profileData", JSON.stringify(tempValues));
            
            // Show success message
            toast.success("Profile updated successfully!");
            
            // Close the modal
            onClose();
        } catch (error) {
            toast.error("Failed to update profile. Please try again.");
            console.error("Error updating profile:", error);
        }
    };

    const handleCancel = () => {
        setTempValues(formValues); // Reset to original values
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleCancel}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Name</label>
                        <InputField
                            name="name"
                            value={tempValues.name}
                            handleChange={handleInputChange}
                            placeholder="Enter your name"
                            type="text"
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Location</label>
                        <InputField
                            name="location"
                            value={tempValues.location}
                            handleChange={handleInputChange}
                            placeholder="Enter your location"
                            type="text"
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Social Media</label>
                        <InputField
                            name="socialMedia"
                            value={tempValues.socialMedia}
                            handleChange={handleInputChange}
                            placeholder="Enter your social media handle"
                            type="text"
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Bio</label>
                        <InputField
                            name="bio"
                            value={tempValues.bio}
                            handleChange={handleInputChange}
                            placeholder="Enter your bio"
                            type="text"
                        />
                    </div>
                    
                    <div className="modal-buttons">
                        <Button variant="blue" type="submit" name="Save Changes" />
                        <Button variant="transparent" onClick={handleCancel} name="Cancel" />
                    </div>
                </form>
            </div>
        </div>
    );
};

const Profile = () => {
    // Get initial values from localStorage or use defaults
    const getInitialValues = () => {
        const savedProfile = localStorage.getItem("profileData");
        if (savedProfile) {
            return JSON.parse(savedProfile);
        }
        return {
            name: "Manav Vanecha",
            location: "Kitchener, CA",
            socialMedia: "manav.vanecha",
            bio: "Leaving a bit of sparkle everywhere I go ✨",
        };
    };

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [formValues, setFormValues] = useState(getInitialValues);
    const [posts, setPosts] = useState([]);
    const [liveUpdates, setLiveUpdates] = useState([]);

    useEffect(() => {
        // Fetch posts and live updates
        const fetchData = async () => {
            try {
                const [postsRes, updatesRes] = await Promise.all([
                    axios.get(`http://localhost:2020/post/view/${123}`),
                    axios.get(`http://localhost:2020/liveupdate/view/${123}`)
                ]);
                
                setPosts(postsRes.data);
                setLiveUpdates(updatesRes.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                toast.error("Failed to load some content. Please refresh the page.");
            }
        };

        fetchData();
    }, []);

    // Rest of the component remains the same...
    return (
        <>
            <Navbar />
            <ToastContainer position="top-right" />
            <div className="profile_page_div">
                <div className="profile_container">
                    {/* Profile section */}
                    <div className="profile_pic_and_userName">
                        <div className="profile_pic_in_profile_page">
                            <img
                                className="profile-image"
                                src="/Images/profilePic.jpg"
                                alt="Profile"
                            />
                        </div>
                        <div className="userName_in_profile_page">
                            <h1 className="userName">{formValues.name}</h1>
                            <div className="location_img_and_location">
                                <img
                                    className="location_image"
                                    src="./Images/location.jpg"
                                    alt="location"
                                />
                                <span className="location">{formValues.location}</span>
                            </div>
                            <div className="instagram_img_and_userName">
                                <img
                                    className="instagram_image"
                                    src="./Images/instagram.png"
                                    alt="instagram"
                                />
                                <span className="insta_userName">
                                    {formValues.socialMedia}
                                </span>
                            </div>
                            <div className="bio">
                                <span className="bio_text">{formValues.bio}</span>
                            </div>
                        </div>
                        <div className="profile_edit_button_in_profile_page">
                            <div className="edit_profile_and_setting_btn_div">
                                <Button
                                    type="button"
                                    onClick={() => setIsEditProfileOpen(true)}
                                    variant="transparent"
                                    name="Edit Profile"
                                />
                                <Button
                                    variant="transparent"
                                    name="⚙️"
                                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                />
                            </div>
                        </div>
                        {isSettingsOpen && (
                            <div className="settingsModal">
                                <Link to={Path.EMAIL_UPDATE}>
                                    <Button variant="blue" name="Email Address" />
                                </Link>
                                <Link to={Path.PASSWORD_UPDATE}>
                                    <Button variant="blue" name="Change Password" />
                                </Link>
                                <Link to={"/"}>
                                    <Button variant="blue" name="Logout" />
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    {/* Live updates section */}
                    <div className="live_updates_div">
                        {liveUpdates.map((update, index) => (
                            <div key={index} className="live-update-item">
                                <img
                                    src={update.image}
                                    alt="Live update"
                                    className="live-update-image"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Posts section */}
                    <div className="user_posts_div">
                        {posts.map((post, index) => (
                            <div key={index} className="post-card">
                                <div className="post-header">
                                    <span className="post-username">{post.userName}</span>
                                    <span className="post-location">{post.location}</span>
                                </div>
                                <img
                                    src={post.image}
                                    alt="Post"
                                    className="post-image"
                                />
                                <p className="post-description">{post.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditProfileOpen}
                onClose={() => setIsEditProfileOpen(false)}
                formValues={formValues}
                setFormValues={setFormValues}
            />
        </>
    );
};

export default Profile;