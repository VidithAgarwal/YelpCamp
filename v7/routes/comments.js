var express    = require("express"),
    router     = express.Router({mergeParams: true}),
	Campground = require("../models/campgrounds"),
	Comment    = require("../models/comments");

//Comments New
router.get("/new", isLoggedIn, (req, res) => {
	Campground.findById(req.params.id)
		.then((campground)=> {
			res.render("comments/new", {campground: campground});
		})
		.catch((err) => {
			console,log(err);
		})
})

// Comments Create
router.post("/", isLoggedIn, (req, res) =>{
	Campground.findById(req.params.id)
		.then((campground)=> {
			Comment.create(req.body.comment)
				.then((comment) => {
					//Add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//Save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				})
				.catch((err)=> {
					console.log(err);
				})
		})
		.catch((err) => {
			console,log(err);
			res.redirect("/campgrounds")
		})
})

// Middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;