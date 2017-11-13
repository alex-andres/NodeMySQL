const mysql = require("mysql");
const inquirer = require("inquirer");
const Table =require('cli-table');


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
          let valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number
      },
      {
        name: "units",
        type: "input",
        message: "How many units of the item would you like?",
        validate: function(value) {
          let valid = !isNaN(parseFloat(value));
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
  let table = new Table({
      head: ['Item ID', 'Product Name', 'Price', 'Quantity']
    });

    let tableArr = [];
    let query = "SELECT * FROM products";
    connection.query(query, function(err, rows){
      for (let value of rows) {
        tableArr.push([value.item_id, value.product_name, value.price, value.stock_quantity]);
      }

      for (i= 0; i < rows.length; i++) {
        table.push(tableArr[i]);
      }

      console.log(table.toString());
      requestProduct();
    })
}


