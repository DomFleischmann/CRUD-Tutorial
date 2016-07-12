const express = require('express');

const bodyParser = require('body-parser');

const app =  express();

const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://crud:crud@ds011472.mlab.com:11472/pdd-db', function(err,database){
	
	if (err) return console.log(err);

	db = database;

	app.use(bodyParser.urlencoded({extended:true}));

	app.set('view engine', 'ejs');

	app.listen(3000,function(){

		console.log('listening on 3000');

	});

	app.get('/', function(req, res){

		db.collection('quotes').find().toArray(function(err, result){
			if (err) return consol.log(err);

			res.render('index.ejs', {quotes: result});
		});
	});

	app.post('/quotes', function(req, res){

		db.collection('quotes').save(req.body, function(err,result){

			if (err) return console.log(err);

			console.log('saved to database');

			res.redirect('/');

		});
	});
});


