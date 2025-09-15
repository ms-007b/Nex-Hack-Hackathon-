export default function requireAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next(); // User is logged in
  }
  return res.status(401).json({ message: "Unauthorized" });
}