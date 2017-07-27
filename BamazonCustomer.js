var mysql = require("mysql");
var inquirer = require("inquirer");

// Connect to Mysql Workbench
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Cokeboy88",
  database: "Bamazon"
});


//Connect to database return connection ID
connection.connect(function(err) {
  if(err) throw err;
  console.log("Logged in as " + connection.threadId);

// Run inquirer alert Buy and Item
  inquirer.prompt([
  {
    type: 'list',
    name: 'choice',
    message: 'Welcome to Bamazon!',
    choices: ['Buy an Item']
  }
    ]).then(function(response) {
      // var query = connection.query(
      //  console.log("Select * From products ")
      //   });
      
      if (response.choice == 'Buy an Item') {
        inquirer.prompt([

        {
          input: 'input',
          name: 'name',
          message: 'Which [Id] product would you like to buy?'
        },{
          input: 'input',
          name: 'category',
          message: 'How many units would you like to buy?'
        }
        ]).then(function(response) {
          var query = connection.query(
          "UPDATE products SET stock_quantity WHERE item_id  ?",
          {
          name: response.name,
          category: response.category,
          },
          function(err, res) {
            console.log('Thank you for your purchase!');
          });
        });
      }
    });
  });

