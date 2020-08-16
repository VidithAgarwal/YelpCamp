var express 	    = require("express"),
	mongoose 		= require("mongoose"),
	bodyParser	    = require("body-parser");

var app = express();
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

var campground_schema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campground_schema);


// var campgrounds = [
// 	{name: "Sandakphu", image: "https://www.nomadicweekends.com/wp-content/uploads/2019/02/dsc_1066_Main_800.jpg"},
// 	{name: "Darjeeling", image: "https://res.cloudinary.com/simpleview/image/upload/v1584361003/clients/poconos/Campgrounds_Exterior_Keen_Lake_1_PoconoMtns_d606c492-eb33-450d-a725-e173b70c6cb8.jpg"},
// 	{name: "Sydona", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDbV_PTeKxNti5mnjM0tr9GzQxmx9xuHVrwQ&usqp=CAU"},
// 	{name: "Sandakphu", image: "https://www.nomadicweekends.com/wp-content/uploads/2019/02/dsc_1066_Main_800.jpg"},
// 	{name: "Darjeeling", image: "https://res.cloudinary.com/simpleview/image/upload/v1584361003/clients/poconos/Campgrounds_Exterior_Keen_Lake_1_PoconoMtns_d606c492-eb33-450d-a725-e173b70c6cb8.jpg"},
// 	{name: "Sydona", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDbV_PTeKxNti5mnjM0tr9GzQxmx9xuHVrwQ&usqp=CAU"},
// 	{name: "Sandakphu", image: "https://www.nomadicweekends.com/wp-content/uploads/2019/02/dsc_1066_Main_800.jpg"},
// 	{name: "Darjeeling", image: "https://res.cloudinary.com/simpleview/image/upload/v1584361003/clients/poconos/Campgrounds_Exterior_Keen_Lake_1_PoconoMtns_d606c492-eb33-450d-a725-e173b70c6cb8.jpg"},
// 	{name: "Sydona", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDbV_PTeKxNti5mnjM0tr9GzQxmx9xuHVrwQ&usqp=CAU"}
// ];


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
	Campground.findById(req.params.id)
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