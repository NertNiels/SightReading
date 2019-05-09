const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const fs = require('fs');

const noteimg = __dirname + "/noteimg/"

var users = [];
var pitches = [
	{name: "c4", pitch: 261.63},
	{name: "cs4", pitch: 277.18},
	{name: "d4", pitch: 293.66},
	{name: "ds4", pitch: 311.13},
	{name: "e4", pitch: 329.63},
	{name: "f4", pitch: 349.23},
	{name: "fs4", pitch: 369.99},
	{name: "g4", pitch: 392.00},
	{name: "gs4", pitch: 415.30},
	{name: "a4", pitch: 440.00},
	{name: "as4", pitch: 466.16},
	{name: "b4", pitch: 493.88},
	{name: "c5", pitch: 523.25},

	{name: "cs5", pitch: 554.37},
	{name: "d5", pitch: 587.33},
	{name: "ds5", pitch: 622.25},
	{name: "e5", pitch: 659.25},
	{name: "f5", pitch: 698.46},
	{name: "fs5", pitch: 739.99},
	{name: "g5", pitch: 783.99},
	{name: "gs5", pitch: 830.61},
	{name: "a5", pitch: 880.00},
	{name: "as5", pitch: 932.33},
	{name: "b5", pitch: 987.77},
	{name: "c6", pitch: 1046.50},
];

app.get('/', (req, res) => {
	res.sendFile(noteimg + 'a4.png');
});

app.get('/newgame', (req, res) => {
	var r = randomNote();
	var u = {
		id: Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5),
		note: r.name,
		pitch: r.pitch
	}
	users.push(u);
	res.send(u.id);
});

app.get('/g/:id', (req, res) => {
	var id = req.params.id;
	var user = getUser(id);
	if(user) {
		res.send(user);
	}
	res.end();
});

app.get('/g/:id/answer', (req, res) => {
	var id = req.params.id;
	var user = getUser(id);
	if(user) {
		res.send(user.note);
	}
	res.end();
});

app.get('/g/:id/pitch', (req, res) => {
	var id = req.params.id;
	var user = getUser(id);
	if(user) {
		res.send(user.pitch);
	}
	res.end();
});

var randomNote = function () {
    return pitches[ pitches.length * Math.random() << 0];
};

var getUser = function(id) {
	for(i = 0; i < users.length; i++) {
		if(users[i].id == id) return users[i];
	}
}

app.listen(port, () => console.log(`Server running on port ${port}`));