//Restful services by NodeJS

const monthName = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

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

// app.post('/genUUID/', (req, res) =>{
// 	var postData = req.body;

// 	var numtogen = postData.numtogen;

// 	for(let i = 0; i < parseInt(numtogen); i++) {
// 		console.log(uuid.v4());
// 	}
	
// 	res.end('done gening');
// });

// app.post('/addRestaurant/', (req, res) =>{
// 	var postData = req.body;

// 	console.log(postData);

// 	var name = postData.Name;
// 	var uuniqueID = uuid.v4();
// 	var address = postData.Address;
// 	var closingTime = postData.closingTime;
// 	var openingTime = postData.openingTime;
// 	var openDays = postData.openDays;

// 	con.query('INSERT INTO `restaurantlist` (`name`, `uuid`, `Address`, `closingTime`, `openingTime`, `openDays`) VALUES (?,?,?,?,?,?)', [name, uuniqueID, address, closingTime, openingTime, openDays], function (err, result, fields){
// 		if(err != null){
// 			console.log(`Menu insertion error (${err})`);
// 			res.end(JSON.stringify("Menu insertion error: " + err));
// 		} else {
// 			res.end(JSON.stringify("Menu added with uuid " + uuniqueID));
// 			console.log("Menu added with uuid " + uuniqueID);
// 		}
// 	});
// });

// app.post('/addMenuItem/', (req, res) =>{
// 	var postData = req.body;

// 	var resName = postData.resName;
// 	var resUUID = postData.resUUID;
// 	var serialNum = postData.serialNum;
// 	var itemName = postData.itemName;
// 	var itemPrice = postData.itemPrice;
// 	var itemCategory = postData.itemCategory;
// 	var itemSubCategory = postData.itemSubCategory;

// 	con.query('INSERT INTO `menuitems` (`resName`, `resUUID`, `serialNum`, `itemName`, `itemPrice`, `itemCategory`, `itemSubCategory`) VALUES (?,?,?,?,?,?,?)', [resName, resUUID, serialNum, itemName, itemPrice, itemCategory, itemSubCategory], function (err, result, fields){
// 		if(err != null){
// 			console.log(`Menu item insertion error (${err})`);
// 			res.end(JSON.stringify("Menu item insertion error: " + err));
// 		} else {
// 			res.end(JSON.stringify("Menu item added with name " + resName));
// 			console.log("Menu item added with name " + resName);
// 		}
// 	});
// });

// app.post('/getResData/', (req, res) => {
// 	var postData = req.body;								//Getting the POST parameters
	
// 	var queryUUID = postData.queryUUID;

// 	con.query('SELECT * FROM `restaurantlist` WHERE uuid = ?', [queryUUID], function(err, result) {
// 		if(err != null){
// 			console.log('getResData Error', err);
// 			res.end(JSON.stringify("getResData Error"));
// 		} else {
// 			console.log(`getResData successful`);
// 			res.end(JSON.stringify(result));
// 		}
// 	});
// });

// app.post('/getResItem/', (req, res) => {
// 	var postData = req.body;								//Getting the POST parameters
	
// 	var queryUUID = postData.queryUUID;

// 	con.query('SELECT * FROM `menuitems` WHERE resUUID = ?', [queryUUID], function(err, result) {
// 		if(err != null){
// 			console.log('getResItem Error', err);
// 			res.end(JSON.stringify("getResItem Error"));
// 		} else {
// 			console.log(`getResItem successful`);
// 			res.end(JSON.stringify(result));
// 		}
// 	});
// });

app.post('/register/', (req, res) => {
	var postData = req.body;								//Getting the POST parameters

	var uuniqueID = postData.uuid;
	var phone = postData.Phone;
	var name = postData.Name;
	var email = postData.Email;								//Take note your postData.Email, the .sth must be the same as what you are sending in, ie if its caps you must be caps too
	var themeDark = 'true';

	con.query('SELECT * FROM users where Email=?', [email], function(err, result) {
		if(err != null){
			console.log('[Register error]: ', err);
			res.end(JSON.stringify("Register error"));
		} else {
			if(result && result.length){
				console.log(`[${email}]: User already exists`);
				res.end(JSON.stringify("User already exists"));
			} else {
				con.query('INSERT INTO `users`(`uuid`, `Email`, `Name`, `Phone`, `themeIsDark`, `createdAt`, `updatedAt`) VALUES (?,?,?,?,?,NOW(),NOW())', [uuniqueID, email, name, phone, themeDark], function (errOuter, result, fields){
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

	var uuid = postData.uuid;

	con.query('SELECT * from users where uuid = ?', [uuid], function(err, result){
		if(err != null){
			console.log(`[${uuid}]: Login error (${err})`);
			res.end(JSON.stringify("Login error: " + err));
		} else {
			res.end(JSON.stringify(result));
			console.log(`[${uuid}]: User data fetched`);
		}
	});
});

app.post('/fetchTransact/', (req, res) =>{
	var postData = req.body;

	var uuid = postData.uuid;
	var numEntry = postData.numEntry;

	con.query('SELECT * from transaction where uuidBy = ? AND createdAt > DATE_SUB(now(), INTERVAL ? MONTH) ORDER BY createdAt DESC', [uuid, numEntry], function(err, result){
		if(err != null){
			console.log(`[${uuid}]: Transaction fetch error (${err})`);
			res.end(JSON.stringify("Transaction fetch error: " + err));
		} else {
			res.end(JSON.stringify(result));
			console.log(`[${uuid}]: Transaction fetched successfully`);
		}
	});
});

app.post('/addTransact/', (req, res) =>{
	var postData = req.body;

	var uuid = postData.uuid;
	var date = postData.date;
	var title = postData.Title;
	var amt = postData.Amount;
	var type = postData.Type;
	var catIdx = postData.catIdx;
	var cato = postData.Category;
	var desc = postData.Desc;
	var unixDate = postData.unixDate;

	con.query('INSERT INTO `transaction` (`uuidBy`, `Date`, `Title`, `Amount`, `Type`, `catIdx`, `Category`, `Description`, `createdAt`, `createdAtUnix`) VALUES (?,?,?,?,?,?,?,?,FROM_UNIXTIME(?),?)', [uuid, date, title, amt, type, catIdx, cato, desc, unixDate, unixDate], function (err, result, fields){
		if(err != null){
			console.log(`[${uuid}]: Transaction insertion error (${err})`);
			res.end(JSON.stringify("Transaction insertion error: " + err));
		} else {
			res.end(JSON.stringify("Transaction added"));
			console.log(`[${uuid}]: Transaction added`);
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

app.post('/getAllTrans/', (req, res) =>{
	var postData = req.body;

	var fromUUID = postData.fromUUID;
	var toUUID = postData.toUUID;

	con.query('SELECT * FROM ledger WHERE (fromUUID = ? AND toUUID = ?) OR (toUUID = ? AND fromUUID = ?) ORDER BY createdAt ASC', [fromUUID, toUUID, fromUUID, toUUID], function (err, result, fields){
		if(err != null){
			console.log(`[${fromUUID}]: Error getting transaction history (${err})`);
			res.end(JSON.stringify("Error getting transaction history " + err));
		} else {
			console.log(`[${fromUUID}]: Transaction history fetched successfully`);
			res.end(JSON.stringify(result));
		}
	});
});

app.post('/searchNum/', (req, res) =>{
	var postData = req.body;

	var phone = postData.Phone;

	con.query('SELECT uuid, Name FROM users WHERE Phone = ?', [phone], function (err, result, fields){
		if(err != null){
			console.log(`Error getting user details for number (${err})`);
			res.end(JSON.stringify("Error getting user details for number" + err));
		} else {
			console.log(`User details successfully fetched for number`);
			res.end(JSON.stringify(result));
		}
	});
});

app.post('/addJio/', (req, res) => {
	var postData = req.body;								//Getting the POST parameters

	var jioUUID = uuid.v4();
	var peepsArr = postData.peepsArr;
	var creatorUUID = postData.creatorUUID;
	var creatorName = postData.creatorName;
	var orderObj = postData.orderObj;
	var resIdx = postData.resIdx;
	var jioTitle = postData.jioTitle;
	var jioComments = postData.jioComments;

	con.query('INSERT INTO `jiodetails` (`jioUUID`, `creatorUUID`, `creatorName`, `jioTitle`, `jioComments`, `jioStatus`, `unixCreatedAt`) VALUES (?,?,?,?,?,?,UNIX_TIMESTAMP())', [jioUUID, creatorUUID, creatorName, jioTitle, jioComments, 'Open'], function (err, result, fields){
		if(err != null){
			console.log(`[${creatorName}]: Jio insertion (Part 1) error (${err})`);
			res.end(JSON.stringify("Jio insertion (Part 1) error: " + err));
		} else {
			con.query('INSERT INTO `jiousers` (`jioUUID`, `peepsUUID`, `peepsName`, `orderObj`, `resIdx`, `orderPlaced`) VALUES (?,?,?,?,?,?)', [jioUUID, creatorUUID, creatorName, JSON.stringify(orderObj), resIdx, "Ordered"], function (errOuter, result, fields){
				if(errOuter != null){
					console.log(`[${creatorName}]: Jio insertion (Part 2) error (${errOuter})`);
					res.end(JSON.stringify("Jio insertion (Part 2) error: " + errOuter));
				} else {
					peepsArr.forEach(function(currUser) {
						con.query('INSERT INTO `jiousers` (`jioUUID`, `peepsUUID`, `peepsName`, `orderObj`, `resIdx`, `orderPlaced`) VALUES (?,?,?,?,?,?)', [jioUUID, currUser.uuid, currUser.Name, JSON.stringify([]), resIdx, "Pending"], function (errInner, result, fields){
							if(errInner != null){
								console.log(`[${creatorName}]: Jio insertion (Part 3) error (${errInner})`);
								res.end(JSON.stringify("Jio insertion (Part 3) error: " + errInner));
							}
						});
					});
		
					console.log(`[${creatorName}]: Jio added successful`);
					res.end(JSON.stringify("Jio added successful"));
				}
			});
		}
	});
});

app.post('/fetchJio/', (req, res) => {
	var postData = req.body;								//Getting the POST parameters

	var queryUUID = postData.queryUUID;

	con.query('SELECT * FROM jiousers INNER JOIN jiodetails ON jiousers.jioUUID = jiodetails.jioUUID WHERE jiousers.peepsUUID = ? AND jiodetails.jioStatus = "Open"', [queryUUID], function (err, result, fields){
		if(err != null){
			console.log(`[${queryUUID}]: Fetch Jio error (${err})`);
			res.end(JSON.stringify("Fetch Jio error: " + err));
		} else {
			console.log(`[${queryUUID}]: Jio fetched successful`);
			res.end(JSON.stringify(result));
		}
	});
});

app.post('/updateOrder/', (req, res) => {
	var postData = req.body;								//Getting the POST parameters

	var currUUID = postData.currUUID;
	var orderObj = postData.orderObj;
	var jioUUID = postData.jioUUID;
	var orderStatus = postData.orderStatus;

	con.query('UPDATE jiousers SET orderObj = ?, orderPlaced = ? WHERE peepsUUID = ? AND jioUUID = ?', [JSON.stringify(orderObj), orderStatus, currUUID, jioUUID], function (err, result, fields){
		if(err != null){
			console.log(`[${currUUID}]: Jio Order update error (${err})`);
			res.end(JSON.stringify("Jio Order update error: " + err));
		} else {
			console.log(`[${currUUID}]: Jio Order Updated Successfully`);
			res.end(JSON.stringify('Jio Order Updated Successfully'));
		}
	});
});

app.post('/fetchFullMyJio/', (req, res) => {
	var postData = req.body;								//Getting the POST parameters

	var jobUUID = postData.jobUUID;

	con.query('SELECT * FROM jiousers WHERE jioUUID = ?', [jobUUID], function (err, result, fields){
		if(err != null){
			console.log(`[jobUUID: ${jobUUID}]: fetchFullMyJio error (${err})`);
			res.end(JSON.stringify("fetchFullMyJio error: " + err));
		} else {
			console.log(`[jobUUID: ${jobUUID}]: fetchFullMyJio Successfully`);
			res.end(JSON.stringify(result));
		}
	});
});

app.post('/closeJio/', (req, res) => {
	var postData = req.body;								//Getting the POST parameters

	var ledgerUUID = uuid.v4();

	var currDate = new Date();
	// var dateStr = `${currDate.getDate()} ${monthName[currDate.getMonth()]} ${currDate.getFullYear()}`
	var dateStrTrans = `${monthName[currDate.getMonth()]} ${currDate.getDate()}, ${currDate.getFullYear()}`
	var unixTime = Math.round(currDate.getTime() / 1000);

	var jobUUID = postData.jobUUID;
	var currName = postData.currName;
	var currUUID = postData.currUUID;
	var detailsArr = postData.detailsArr;
	var jioTitle = postData.jioTitle;

	con.query('UPDATE jiodetails SET jioStatus = "Closed" WHERE jioUUID = ?', [jobUUID], function (err, result, fields){
		if(err != null){
			console.log(`[jobUUID: ${jobUUID}]: Closing MyJio error (${err})`);
			res.end(JSON.stringify("Closing MyJio error: " + err));
		} else {
			detailsArr.forEach(function(currItem) {
				if (currItem.totalAmt !== 0) {
					if (currItem.userUUID !== currUUID) {
						con.query('INSERT INTO `ledger` (`ledgerUUID`, `fromUUID`, `fromName`, `toUUID`, `toName`, `Amount`, `catIdx`, `Category`, `Detail`, `Status`, `Date`, `createdAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW())', [ledgerUUID, currItem.userUUID, currItem.userName, currUUID, currName, currItem.totalAmt, 0, 'Food', `FoodJio (${jioTitle})`, 'Open', dateStrTrans], function (errInner, result, fields){
							if(errInner != null){
								console.log(`[${currName}]: MyJio closing error (Part 2) (${errInner})`);
								res.end(JSON.stringify("MyJio closing error (Part 2)  " + errInner));
							}
						});
					} else {
						con.query('INSERT INTO `transaction` (`uuidBy`, `Date`, `Title`, `Amount`, `Type`, `catIdx`, `Category`, `Description`, `createdAt`, `createdAtUnix`) VALUES (?,?,?,?,?,?,?,?,NOW(),?)', [currUUID, dateStrTrans, `FoodJio (${jioTitle})`, currItem.totalAmt, 'Spending', 0, 'Food', '', unixTime], function (errInInner, result, fields){
							if(errInInner != null){
								console.log(`[${currName}]: MyJio closing error (Part 3) (${errInInner})`);
								res.end(JSON.stringify("MyJio closing error (Part 3)  " + errInInner));
							}
						});
					}
				}
			});

			console.log(`[jobUUID: ${jobUUID}]: MyJio closed Successfully`);
			res.end(JSON.stringify('MyJio closed Successfully'));
		}
	});
});

app.post('/deleteLedger/', (req, res) => {
	var postData = req.body;								//Getting the POST parameters
	
	var ledgerUUID = postData.ledgerUUID;

	con.query('DELETE FROM ledger WHERE ledgerUUID = ?', [ledgerUUID], function(err, result) {
		if(err != null){
			console.log('Ledger Deletion Error', err);
			res.end(JSON.stringify("Ledger Deletion Error"));
		} else {
			console.log(`Ledger Deleted`);
			res.end(JSON.stringify(`Ledger Deleted`));
		}
	});
});

app.post('/paidLedger/', (req, res) => {
	var postData = req.body;								//Getting the POST parameters
	
	var currDate = new Date();
	var dateStrTrans = `${monthName[currDate.getMonth()]} ${currDate.getDate()}, ${currDate.getFullYear()}`
	var unixTime = Math.round(currDate.getTime() / 1000);

	var ledgerUUID = postData.ledgerUUID;

	con.query('UPDATE ledger SET Status = "Closed" WHERE ledgerUUID = ?', [ledgerUUID], function(err, result) {
		if(err != null){
			console.log('Paying Ledger Error', err);
			res.end(JSON.stringify("Paying Ledger Error"));
		} else {
			con.query('SELECT * FROM ledger WHERE ledgerUUID = ?', [ledgerUUID], function(errInner, resArr) {
				if (errInner != null) {
					console.log(`Paying Ledger error (Part 1) (${errInner})`);
					res.end(JSON.stringify("Paying Ledger error (Part 1)"));
				} else {
					let selRes = resArr[0];
					con.query('INSERT INTO `transaction` (`uuidBy`, `Date`, `Title`, `Amount`, `Type`, `catIdx`, `Category`, `Description`, `createdAt`, `createdAtUnix`) VALUES (?,?,?,?,?,?,?,?,NOW(),?)', [selRes.fromUUID, dateStrTrans, `${selRes.Detail} (Paid to ${selRes.toName})`, selRes.Amount, 'Spending', selRes.catIdx, selRes.Category, '', unixTime], function (errInInner, result, fields){
						if(errInInner != null){
							console.log(`Paying Ledger error (Part 2) (${errInInner})`);
							res.end(JSON.stringify("Paying Ledger error (Part 2)"));
						} else {
							con.query('INSERT INTO `transaction` (`uuidBy`, `Date`, `Title`, `Amount`, `Type`, `catIdx`, `Category`, `Description`, `createdAt`, `createdAtUnix`) VALUES (?,?,?,?,?,?,?,?,NOW(),?)', [selRes.toUUID, dateStrTrans, `${selRes.Detail} (Paid by ${selRes.fromName})`, selRes.Amount, 'Earning', selRes.catIdx, selRes.Category, '', unixTime], function (errInInInner, result, fields){
								if(errInInInner != null){
									console.log(`Paying Ledger error (Part 3) (${errInInInner})`);
									res.end(JSON.stringify("Paying Ledger error (Part 3)"));
								} else {
									console.log(`Ledger Paid`);
									res.end(JSON.stringify(`Ledger Paid`));
								}
							});
						}
					});
				}
			});
		}
	});
});

app.post('/newLedger/', (req, res) => {
	var postData = req.body;								//Getting the POST parameters
	
	var fromObj = postData.fromObj;
  var toArr = postData.toArr;
	var Amount = postData.Amount;
	var type = postData.Type;
  var catIdx = postData.catIdx;
  var cato = postData.Category;
  var Detail = postData.Detail;
  var currDate = postData.currDate;

	// console.log(fromObj);
	// console.log(toArr);
	// console.log(type);
	console.log(cato);

	toArr.forEach(function(currItem) {
		if (type === 'To Pay') {
			var ledgerUUID = uuid.v4();
			con.query('INSERT INTO `ledger` (`ledgerUUID`, `fromUUID`, `fromName`, `toUUID`, `toName`, `Amount`, `catIdx`, `Category`, `Detail`, `Status`, `Date`, `createdAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW())', [ledgerUUID, fromObj.uuid, fromObj.Name, currItem.uuid, currItem.Name, Amount, catIdx, cato, Detail, 'Open', currDate], function (errInner, result, fields){
				if(errInner != null){
					console.log(`[${fromObj.uuid}]: Ledger creation error (Part 1) (${errInner})`);
					res.end(JSON.stringify("Ledger creation error (Part 1)"));
				} else {
					console.log(`[${fromObj.uuid}]: Ledger Added`);
					res.end(JSON.stringify("Ledger Added"));
				}
			});
		} else {
			var ledgerUUID = uuid.v4();
			con.query('INSERT INTO `ledger` (`ledgerUUID`, `fromUUID`, `fromName`, `toUUID`, `toName`, `Amount`, `catIdx`, `Category`, `Detail`, `Status`, `Date`, `createdAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW())', [ledgerUUID, currItem.uuid, currItem.Name, fromObj.uuid, fromObj.Name, Amount, catIdx, cato, Detail, 'Open', currDate], function (errInInner, result, fields){
				if(errInInner != null){
					console.log(`[${fromObj.uuid}]: Ledger creation error (Part 2) (${errInInner})`);
					res.end(JSON.stringify("Ledger creation error (Part 2)"));
				} else {
					console.log(`[${fromObj.uuid}]: Ledger Added`);
					res.end(JSON.stringify("Ledger Added"));
				}
			});
		}
	});
});



// app.post('/getThisMonthTransact/', (req, res) =>{
// 	var postData = req.body;

// 	var email = postData.Email;
// 	var uuid = postData.uuid;

// 	con.query('SELECT * FROM transaction WHERE MONTH(createdAt) = MONTH(CURRENT_DATE()) AND YEAR(createdAt) = YEAR(CURRENT_DATE()) AND uuid = ? ORDER BY createdAt DESC', [uuid], function (err, result, fields){
// 		if(err != null){
// 			console.log(`[${email} (${uuid})]: Error getting month transaction history (${err})`);
// 			res.end(JSON.stringify("Error getting month transaction history " + err));
// 		} else {
// 			console.log(`[${email} (${uuid})]: Monthly Transaction history fetched successfully`);
// 			res.end(JSON.stringify(result));
// 		}
// 	});
// });