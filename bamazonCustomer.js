// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.




const mysql = require("mysql");
const inquirer = require("inquirer");



const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});


function requestProduct() {
  inquirer
    .prompt([
      {
        name: "itemId",
        type: "input",
        message: "What is the item ID of the product you would like to purchase?",
         validate: function(value) {
          var valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number
      },
      {
        name: "units",
        type: "input",
        message: "How many units of the item would you like?",
        validate: function(value) {
          var valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number
      }
    ])
    .then(function(answer) {
      connection.query(`SELECT stock_quantity, price FROM products WHERE item_id = ${answer.itemId}`, (err, res) =>{
          if (err) throw err;
          let userSelectionQuantity = parseInt(res[0].stock_quantity);
          let itemPrice = parseInt(res[0].price);
          let userTotalCost = answer.units*itemPrice;
          console.log(userSelectionQuantity);
          console.log(res[0].price)
          if (answer.units > userSelectionQuantity){
            console.log('Not enough stock available, please reduce desired quantity');
            readProducts();
          }
          else {
            let updatedQuantity = userSelectionQuantity - answer.units;
            connection.query(`UPDATE products SET stock_quantity = ${updatedQuantity} WHERE item_id = ${answer.itemId}`, (err, res) =>{
              if (err) throw err;
              console.log(`The total cost of your items is $${userTotalCost}.00.`);
              connection.end();
            })
          }
      });
    })  
}

function readProducts() {
  console.log("Here is a list of all of our products");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    requestProduct();
  });
  
}

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.


