var Campground      = require("./models/campgrounds"),
	bodyParser	    = require("body-parser"),
	mongoose 		= require("mongoose"),
	Comment         = require("./models/comments"),
	express 	    = require("express"),
	seedDB          = require("./seeds"),
	app             = express();


seedDB();	
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		console.log("Database has been connected");
	})
	.catch((error) => {
		console.log(error.message);
	})


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
	res.render("campgrounds/landing");
})

//Index - To Show all the campgrounds

app.get("/campgrounds", (req, res) => {
	Campground.find({})
	.then((Campgrounds) => {
		res.render("campgrounds/Index", {campgrounds: Campgrounds});
	})
	.catch((error) => {
		console.log(error.message);
	})
	
})

// Create - To add a new campground
app.post("/campgrounds", (req, res) => {
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.Description
	var newCampground = {name: name, image: image, description: description};
	Campground.create(newCampground)
		.then((campgrounds) => {
			res.redirect("/campgrounds");
		})
		.catch((err) => {
			console.log(err.message);		
	    })
})

// New - Form to get a new campground
app.get("/campgrounds/new", (req, res) => {
	res.render("campgrounds/New");
})


app.get("/campgrounds/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec()
		.then((foundCampground) => {
			res.render("campgrounds/show", {campground: foundCampground});
		})
	.catch((error) => {
			console.log("ERROR!!!");
		})
	
})

// ====================
// COMMENT ROUTES
// ====================

app.get("/campgrounds/:id/comments/new", (req, res) => {
	Campground.findById(req.params.id)
		.then((campground)=> {
			res.render("comments/new", {campground: campground});
		})
		.catch((err) => {
			console,log(err);
		})
})

app.post("/campgrounds/:id/comments", (req, res) =>{
	Campground.findById(req.params.id)
		.then((campground)=> {
			Comment.create(req.body.comment)
				.then((comment) => {
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

app.listen(3000, () => {
	console.log("YelpCamp Server has started!");
})