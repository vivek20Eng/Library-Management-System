import jwt from 'jsonwebtoken';

const secret = 'yoursecret';

export default function authenticate(req, res, next) {
  try {
    const token = req.headers.cookie.split("token=")[1];
    if (!token) throw new Error("User is not logged in");
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
}