const express 	= require("express");
const router	= express.Router();
const User 		= require("../models/user.js");

router.get("/", async (req, res)=> {
	const users = await User.find();
	console.log(users);
	res.render("index", {
		users
	});
});

router.post("/add", async (req, res)=> {
	const user = new User(req.body);
	await user.save();
	res.redirect("/");
});

router.get("/delete/:i", async (req, res)=> {
	const {i} = req.params;
	await User.remove({_id: i});
	res.redirect("/");
});

router.get("/edit/:i", async (req, res) => {
	const {i} = req.params;
	const edit = await User.findById(i);
	res.render("edit", {
		edit
	});
});

router.post("/edit/:i", async (req, res) => {
	const {i} = req.params;
	await User.update({_id: i}, req.body);
	res.redirect("/");
});


module.exports = router;