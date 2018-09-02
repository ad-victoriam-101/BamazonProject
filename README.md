# Bamazon Project
A rip off of Amazon plz no sue Jeff Bezos
# Pseudo Code
1. Create a DB for backend.
    * make sure the db has the correct col and id
2. Make products table in back end.
    * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)
3. useing inquirer prompt user inputs for buying an item off of bamazon.
    * use pretty console outputs.
4. make sure item user requested is in stock.
    * simple if statement
5. if item is instock deduct number they asked for and gir rid of that many items in db. 
    * remember that its -= the item
6. add cost of sold items to profit margin. 