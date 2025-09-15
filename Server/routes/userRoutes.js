import express from "express";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

// Example protected route
router.get("/profile", requireAuth, (req, res) => {
  res.json({
    message: "Protected data",
    user: req.user,
  });
});

export default router;