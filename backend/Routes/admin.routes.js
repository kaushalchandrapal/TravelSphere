const express = require("express");
const router = express.Router();
const AdminController = require("../Controllers/admin.controller");

// Admin routes
router.get("/analytics", AdminController.getAnalytics); // Get dashboard analytics
router.get("/users", AdminController.getUsers); // Get all users
router.delete("/users/:id", AdminController.deleteUser); // Delete a user
router.get("/posts", AdminController.getPosts); // Get all posts
router.get("/plans", AdminController.getPlans); // Get all plans
router.get("/liveupdates", AdminController.getLiveUpdates); // Get all live updates
router.delete("/posts/:id", AdminController.deletePost); // Delete a post
router.delete("/plans/:id", AdminController.deletePlan); // Delete a plan
router.delete("/liveupdates/:id", AdminController.deleteLiveUpdate); // Delete a live update

module.exports = router;
