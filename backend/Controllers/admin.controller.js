const User = require("../Models/Registerandlogin.model");
const Post = require("../Models/post.model");
const Plan = require("../Models/plan.model");
const LiveUpdate = require("../Models/liveUpdate.model");

// Admin analytics
exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();
    const totalPlans = await Plan.countDocuments();
    const totalLiveUpdates = await LiveUpdate.countDocuments();

    res.status(200).json({ totalUsers, totalPosts, totalPlans, totalLiveUpdates });
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics", error: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-pass"); // Exclude password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error: error.message });
  }
};

// Get all plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plans", error: error.message });
  }
};

// Delete a plan
exports.deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await Plan.findByIdAndDelete(id);
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting plan", error: error.message });
  }
};

// Get all live updates
exports.getLiveUpdates = async (req, res) => {
  try {
    const liveUpdates = await LiveUpdate.find();
    res.status(200).json(liveUpdates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching live updates", error: error.message });
  }
};

// Delete a live update
exports.deleteLiveUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    await LiveUpdate.findByIdAndDelete(id);
    res.status(200).json({ message: "Live update deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting live update", error: error.message });
  }
};
