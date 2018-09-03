// Bamazon.com
var mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table');
var table = new Table();

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
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    bamazonStart();
});

function bamazonStart() {
    console.log("Welcome to Bamazon!")
    // show user the table data of current inventory.
    connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(res);
            console.log('======================================');
            table.push(res);
            console.log(table.toString());
            inquirerStart();
        });
}
function inquirerStart(){
    inquirer
        .prompt([
            {
                type: "input",
                name: "userChoice",
                message: "What Item do you want to buy today? via ID number."
            },
            {
                type:"input",
                name:"quantItem",
                message:"How many do you want?"
            }
        ]).then(function(userInput){
            console.log(userInput);

        })
}
