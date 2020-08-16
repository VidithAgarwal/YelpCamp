var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
	{name: "Sandakphu", image: "https://www.nomadicweekends.com/wp-content/uploads/2019/02/dsc_1066_Main_800.jpg"},
	{name: "Darjeeling", image: "https://res.cloudinary.com/simpleview/image/upload/v1584361003/clients/poconos/Campgrounds_Exterior_Keen_Lake_1_PoconoMtns_d606c492-eb33-450d-a725-e173b70c6cb8.jpg"},
	{name: "Sydona", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDbV_PTeKxNti5mnjM0tr9GzQxmx9xuHVrwQ&usqp=CAU"},
	{name: "Sandakphu", image: "https://www.nomadicweekends.com/wp-content/uploads/2019/02/dsc_1066_Main_800.jpg"},
	{name: "Darjeeling", image: "https://res.cloudinary.com/simpleview/image/upload/v1584361003/clients/poconos/Campgrounds_Exterior_Keen_Lake_1_PoconoMtns_d606c492-eb33-450d-a725-e173b70c6cb8.jpg"},
	{name: "Sydona", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDbV_PTeKxNti5mnjM0tr9GzQxmx9xuHVrwQ&usqp=CAU"},
	{name: "Sandakphu", image: "https://www.nomadicweekends.com/wp-content/uploads/2019/02/dsc_1066_Main_800.jpg"},
	{name: "Darjeeling", image: "https://res.cloudinary.com/simpleview/image/upload/v1584361003/clients/poconos/Campgrounds_Exterior_Keen_Lake_1_PoconoMtns_d606c492-eb33-450d-a725-e173b70c6cb8.jpg"},
	{name: "Sydona", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDbV_PTeKxNti5mnjM0tr9GzQxmx9xuHVrwQ&usqp=CAU"}
];

app.get("/", (req, res) => {
	res.render("landing");
})

app.get("/campgrounds", (req, res) => {
	res.render("campgrounds", {campgrounds: campgrounds});
})


app.post("/campgrounds", (req, res) => {
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
})

app.get("/campgrounds/new", (req, res) => {
	res.render("New");
})

app.listen(3000, () => {
	console.log("YelpCamp Server has started!");
})