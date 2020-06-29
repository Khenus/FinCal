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
	return crypto.randomBytes(Math.floor(length))
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
	var themeDark = 'true';

	con.query('SELECT * FROM users where Email=?', [email], function(err, result) {
		if(err != null){
			console.log('[Register error]: ', err);
		} else {
			if(result && result.length){
				console.log(`[${email}]: User already exists`);
				res.end(JSON.stringify("User already exists"));
			} else {
				con.query('INSERT INTO `users`(`id`, `uuid`, `Email`, `Password`, `Salt`, `Name`, `Phone`, `themeIsDark`, `createdAt`, `updatedAt`) VALUES (NULL,?,?,?,?,?,?,?,NOW(),NOW())', [uuniqueID, email, actualPassword, actualSalt, name, phone, themeDark], function (errOuter, result, fields){
					if(errOuter != null){
						console.log(`[${email}]: Register error (${errOuter})`);
						res.end(JSON.stringify("Register error"));
					} else {
						console.log("[Register successful]: " + result.affectedRows + " entry inserted with Email " + email);
						res.end(JSON.stringify("Register successful"));
					}
				});
			}
		}
	});
});

app.post('/login/', (req, res) =>{
	var postData = req.body;

	var email = postData.Email;
	var password = postData.Password;

	con.query('SELECT * from users where Email = ?', [email], function(err, result){
		if(err != null){
			console.log(`[${email}]: Login error (${err})`);
			res.end(JSON.stringify("Login error: " + err));
		} else {
			if(result && result.length){
				let userInput = hashLoginPass(password, result[0].Salt);

				if (userInput.passwordHash === result[0].Password) {
					res.end(JSON.stringify(result));
					console.log(`[${result[0].Email} (${result[0].uuid})]: Login Successful`);
				} else {
					res.end(JSON.stringify('Wrong password'));
					console.log(`[${result[0].Email} (${result[0].uuid})]: Wrong pasword`);
				}
				
			} else {
				res.end(JSON.stringify("User does not exist"));
				console.log(`[${email}]: User does not exist`);
			}
		}
	});
});

app.post('/fetchTransact/', (req, res) =>{
	var postData = req.body;

	var email = postData.Email;
	var uuid = postData.uuid;

	con.query('SELECT * from transaction where Email = ? AND uuid = ? ORDER BY createdAt DESC', [email, uuid], function(err, result){
		if(err != null){
			console.log(`[${email} (${uuid})]: Transaction fetch error (${err})`);
			res.end(JSON.stringify("Transaction fetch error: " + err));
		} else {
			res.end(JSON.stringify(result));
			console.log(`[${email} (${uuid})]: Transaction fetched successfully`);
		}
	});
});

app.post('/addTransact/', (req, res) =>{
	var postData = req.body;

	var email = postData.Email;
	var uuid = postData.uuid;
	var date = postData.date;
	var title = postData.Title;
	var amt = postData.Amount;
	var type = postData.Type;
	var catIdx = postData.catIdx;
	var cato = postData.Category;
	var desc = postData.Desc;

	con.query('INSERT INTO `transaction` (`id`, `Email`, `uuid`, `Date`, `Title`, `Amount`, `Type`, `catIdx`, `Category`, `Description`, `createdAt`) VALUES (NULL,?,?,?,?,?,?,?,?,?,NOW())', [email, uuid, date, title, amt, type, catIdx, cato, desc], function (err, result, fields){
		if(err != null){
			console.log(`[${email} (${uuid})]: Transaction insertion error (${err})`);
			res.end(JSON.stringify("Transaction insertion error: " + err));
		} else {
			res.end(JSON.stringify("Transaction added"));
			console.log(`[${email} (${uuid})]: Transaction added`);
		}
	});
});

app.post('/getLedger/', (req, res) =>{
	var postData = req.body;

	var email = postData.Email;
	var uuid = postData.uuid;
	var action = postData.Action;

	let queryStr;
	if(action === 'getToPay') {
		queryStr = 'SELECT * FROM ledger WHERE fromUUID = ? AND Status = "Open"'
	} else if(action === 'getToRecv') {
		queryStr = 'SELECT * FROM ledger WHERE toUUID = ? AND Status = "Open"'
	}

	con.query(queryStr, [uuid], function (err, result, fields){
		if(err != null){
			console.log(`[${email} (${uuid})]: ${action} error (${err})`);
			res.end(JSON.stringify("Get Ledger error: " + err));
		} else {
			console.log(`[${email} (${uuid})]: ${action} successfully`);
			res.end(JSON.stringify(result));
		}
	});
});

app.post('/getTransHist/', (req, res) =>{
	var postData = req.body;

	var fromUUID = postData.fromUUID;
	var toUUID = postData.toUUID;

	con.query('SELECT * FROM ledger WHERE (fromUUID = ? AND toUUID = ? AND Status = "Close") OR (toUUID = ? AND fromUUID = ? AND Status = "Close") ORDER BY createdAt ASC', [fromUUID, toUUID, fromUUID, toUUID], function (err, result, fields){
		if(err != null){
			console.log(`[${fromUUID}]: Error getting transaction history (${err})`);
			res.end(JSON.stringify("Error getting transaction history " + err));
		} else {
			console.log(`[${fromUUID}]: Transaction history fetched successfully`);
			res.end(JSON.stringify(result));
		}
	});
});

app.post('/getThisMonthTransact/', (req, res) =>{
	var postData = req.body;

	var email = postData.Email;
	var uuid = postData.uuid;

	con.query('SELECT * FROM transaction WHERE MONTH(createdAt) = MONTH(CURRENT_DATE()) AND YEAR(createdAt) = YEAR(CURRENT_DATE()) AND uuid = ? ORDER BY createdAt DESC', [uuid], function (err, result, fields){
		if(err != null){
			console.log(`[${email} (${uuid})]: Error getting month transaction history (${err})`);
			res.end(JSON.stringify("Error getting month transaction history " + err));
		} else {
			console.log(`[${email} (${uuid})]: Monthly Transaction history fetched successfully`);
			res.end(JSON.stringify(result));
		}
	});
});