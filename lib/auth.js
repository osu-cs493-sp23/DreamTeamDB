import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({
  path: "./.env.local",
});

export function validateRole(allowedRoles = []) {
  return function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token && req.body.role !== "admin") {
      return next();
    }

    if (!token) {
      return res
        .status(403)
        .json({ message: "Forbidden. Authentication required." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const requestingUserRole = decoded.user.role;

      if (requestingUserRole === "admin") {
        req.user = decoded.user;
        return next();
      }

      if (allowedRoles.includes(requestingUserRole)) {
        req.user = decoded.user;
        return next();
      }

      return res
        .status(403)
        .json({ message: "Forbidden. Insufficient permissions." });
    } catch (e) {
      return res.status(400).json({ message: "Invalid or no token provided." });
    }
  };
}

export function validateCreateAdminOrInstructor(req, res, next) {
  const { role } = req.body;

  if (role !== "admin" && role !== "instructor") {
    return next();
  }

  const requestingUserRole = req.user.role;

  if (role === "admin" || role === "instructor") {
    if (requestingUserRole === "admin") {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden. Insufficient permissions." });
    }
  }
  return next();
}

export function generateAuthToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}