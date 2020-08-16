var express    = require("express"),
	router     = express.Router(),
	Campground = require("../models/campgrounds");


//Index - To Show all the campgrounds
router.get("/", (req, res) => {
	Campground.find({})
	.then((Campgrounds) => {
		res.render("campgrounds/Index", {campgrounds: Campgrounds});
	})
	.catch((error) => {
		console.log(error.message);
	})
	
})

// Create - To add a new campground
router.post("/", isLoggedIn, (req, res) => {
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.Description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, description: description, author: author};
	Campground.create(newCampground)
		.then((campgrounds) => {
			res.redirect("/campgrounds");
		})
		.catch((err) => {
			console.log(err.message);		
	    })
})

// New - Form to get a new campground
router.get("/new", isLoggedIn, (req, res) => {
	res.render("campgrounds/New");
})

// Show - shows more about a campground
router.get("/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec()
		.then((foundCampground) => {
			res.render("campgrounds/show", {campground: foundCampground});
		})
	.catch((error) => {
			console.log("ERROR!!!");
		})
})

//Middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
module.exports = router;