// middleware/parseJSONFields.js
module.exports  = (req, res, next) => {
  if (req.body.variants && typeof req.body.variants === "string") {
    try {
      req.body.variants = JSON.parse(req.body.variants);
    } catch (err) {
      return res.status(400).json({ success: false, msg: "Invalid JSON in variants" });
    }
  }
  next();
};
