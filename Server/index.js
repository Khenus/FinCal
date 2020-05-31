//Restful services by NodeJS

var crypto = require('crypto');
var uuid = require('uuid');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

//Connecting to mySql
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	port: '3308',
	password: '',
	database: 'financierbase'
});

//Password encryption
var genRandomString = function(length){
	return crypto.randomBytes(Math.floor(length/5))
				.toString('hex')
				.slice(0, length);
}

function saltHashPassword(userPassword){ 
	var salt = genRandomString(16); 				//Gen random string with 16 character to salt
	var passwordData = sha512(userPassword, salt);
	return passwordData;
}

function hashLoginPass(enteredPassword, salt){	
	var enteredPasswordData = sha512(enteredPassword, salt);
	return enteredPasswordData;
}

var sha512 = function(password, salt){
	var hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	var value = hash.digest('hex');
	return {
		salt: salt,
		passwordHash: value
	};
};

var app = express();									//Creating new express object
app.use(bodyParser.json());								//Accepting JSON parameters
app.use(bodyParser.urlencoded({extended: true}));		//Accepting URL Encoded parameters

//Start Server
app.listen(3000, () => {
	console.log('Financier DB running on port 3000');
});

con.connect(function (err){
	if (err){
		throw err;
	} else {
		console.log("Connected!");
	}
});

app.post('/register/', (req, res) => {
	var postData = req.body;								//Getting the POST parameters
	
	var uuniqueID = uuid.v4();								//Get UUID V4
	var plaintPassword = postData.Password;					//Get password from post params
	var hashData = saltHashPassword(plaintPassword);		//Encrypting the password
	var actualPassword = hashData.passwordHash;				//Get the hased password
  var actualSalt = hashData.salt;							//Get the hashed salt

	var phone = postData.Phone;
	var name = postData.Name;
	var email = postData.Email;								//Take note your postData.Email, the .sth must be the same as what you are sending in, ie if its caps you must be caps too


	con.query('SELECT * FROM master where email=?', [email], function(err, result) {
		if(err != null){
			console.log('[Register error]: ', err);
		}
		
		if(result && result.length){
			res.status(400).send("User already exists");
			console.log("[" + email + "] User already exists");
		} else {
			con.query('INSERT INTO `master`(`id`, `uuid`, `Email`, `Password`, `Salt`, `Name`, `Phone`, `createdAt`, `updatedAt`) VALUES (NULL,?,?,?,?,?,?,NOW(),NOW())', [uuniqueID, email, actualPassword, actualSalt, name, phone], function (errOuter, result, fields){
				if(errOuter != null){
					console.log("[Register Error]: " , errOuter);
					res.end(JSON.stringify("Register error", errOuter));
				}
				
				console.log("[Register successful]: " + result.affectedRows + " entry inserted with Email " + email);
				res.end(JSON.stringify("Register successful"));
			});
		}
		
	});
});

app.post('/login/', (req, res) =>{
	var postData = req.body;

	var email = postData.Email;
	var password = postData.Password;

	//console.log (postData);
	//console.log("email is = " + email + "password is = " + password);

	con.query('SELECT * from master where email =?', [email], function(queryError, result){
		if(queryError != null){
			res.status(400).send("[Login Error]: ", queryError);
			console.log("[Login Error ("+ email +")]: ", queryError);
		}
		
		if(result && result.length){
			var salt = result[0].Salt;
			var encodedPass = result[0].Password;
			var loginPassHashed	= hashLoginPass(password, salt).passwordHash;					//Hashing password from Login request with salt gotten from the database
			
			if(encodedPass === loginPassHashed){
				//res.send("Login successful!");
				console.log("Login successful!");
				res.end(JSON.stringify(result[0]));
			} else {
				res.end(JSON.stringify("Wrong password"));
			}
		} else {
			res.status(400).send("User does not exist!");
			console.log("[Login Error ("+ email +")]: User does not exist");
		}
	});
});

