// Bamazon.com
var mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table');
var table = new Table({
    head: ['Item_ID', 'Product Name','Price','Quantity'],
    colWidths: [100, 200]
});

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_DB"
});
// controll functions
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole number.';
	}
}
function inquirerStart(){
    inquirer
        .prompt([
            {
                type: "input",
                name: "item_id",
                message: "What Item do you want to buy today? via ID number.",
                validate: validateInput,
                filter: Number
            },
            {
                type:"input",
                name:"quantItem",
                message:"How many do you want?",
                validate: validateInput,
                filter: Number
            }
        ]).then(function(userInput){
            var item = userInput.item_id;
            var quantity = userInput.quantItem;
            var queryStr = 'SELECT * FROM products WHERE ?';
            connection.query(queryStr, {item_id: item}, function(err, data) {
                if (err) throw err;
                if (data.length === 0) {
                    console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                    displayInventory();
    
                } else {
                    var productData = data[0];
				if (quantity <= productData.stock_quantity) {
					console.log('The product you requested is in stock! Placing order!');

					// Construct the updating query string
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;


					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed! Your total is $' + productData.price * quantity);
						console.log("\n---------------------------------------------------------------------\n");


						connection.end();
					})
				} else {
					console.log('Sorry, there is not enough product in stock,');
					console.log("\n---------------------------------------------------------------------\n");

					displayInventory();
				}
			}
        });
    });
}
function displayInventory() {

	// Construct the db query string
	queryStr = 'SELECT * FROM products';


	connection.query(queryStr, function(err, data) {
        if (err) throw err;
        console.log(data)

		console.log('Existing Inventory: ');
        console.log('...................\n');
        data.forEach(element => {
            // console.log(element);
            table.push(element)
        });

        console.log(table.toString());
	  	console.log("---------------------------------------------------------------------\n");


	  	inquirerStart();
	})
}
function bamazonStart() {
    console.log("Welcome to Bamazon!")
    // show user the table data of current inventory.
    displayInventory();
}
bamazonStart();

