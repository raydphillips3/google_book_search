const router = require("express").Router();
const apiRoutes = require("./api");
const db = require("../models");

// API Routes
router.use("/api", apiRoutes);


router.post("/api/book", (req, res) => {
  db.Book.findOne(req.body).then((book) => {
      req.login(user, function (err) {
          if (err) { return console.log(err); }
          return res.send('book');
      });
  }).catch((err) => res.json(err));
});


// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html")); 
});

module.exports = router;