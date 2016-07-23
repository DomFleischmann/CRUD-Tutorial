const express = require('express');

const bodyParser = require('body-parser');

const app =  express();

const MongoClient = require('mongodb').MongoClient;
app.use(express.static('public'));
app.use(bodyParser.json());
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
    app.put ('/quotes',function  (req, res){
        db.collection('quotes').findOneAndUpdate({name: 'Master Yoda'}, {
            $set: {
                name: req.body.name,
                quote : req.body.quote
            } 
        }, {
            sort: {_id: -1},
            upsert: true
        }, function (err, result) {
           res.send(result); 
        });
        
    });
    app.delete('/quotes', function(req,res){
        db.collection('quotes').findOneAndDelete({name: req.body.name},
        function(err,result){
                if(err) return res.send(500,err);
                res.send('A darth vadar quote got deleted');
        });
    });
});


