import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "لاگ ان ہونا ضروری ہے (Access token required)" });
  }

  const secret = process.env.JWT_SECRET || "madrasa_sahib_uz_zaman_secret_jwt_key_2026_super_secure";

  jwt.verify(token, secret, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ success: false, message: "ٹوکن غلط یا ایکسپائر ہو چکا ہے (Invalid or expired token)" });
    }
    req.user = decodedUser;
    next();
  });
};
