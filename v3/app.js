var Campground      = require("./models/campgrounds"),
	bodyParser	    = require("body-parser"),
	mongoose 		= require("mongoose"),
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
	res.render("landing");
})

//Index - To Show all the campgrounds

app.get("/campgrounds", (req, res) => {
	Campground.find({})
	.then((Campgrounds) => {
		res.render("Index", {campgrounds: Campgrounds});
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
	res.render("New");
})


app.get("/campgrounds/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec()
		.then((foundCampground) => {
			res.render("show", {campground: foundCampground});
		})
	.catch((error) => {
			console.log("ERROR!!!");
		})
	
})

app.listen(3000, () => {
	console.log("YelpCamp Server has started!");
})